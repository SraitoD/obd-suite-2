from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session
from datetime import timedelta
from typing import Optional

from ..database import get_db
from ..models import UserCreate, UserLogin, Token, UserOut
from ..crud import (
    get_user_by_email,
    create_user as crud_create_user,
    create_session,
    invalidate_session,
    get_session_by_refresh_token
)
from .utils import (
    verify_password,
    get_password_hash,
    create_access_token,
    create_refresh_token,
    decode_token,
    get_current_user
)

router = APIRouter(prefix="/auth", tags=["auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")

@router.post("/register", response_model=UserOut)
async def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = await get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = get_password_hash(user.password)
    new_user = await crud_create_user(db, {
        **user.dict(),
        "hashed_password": hashed_password,
        "is_verified": True  # Email verification would be better in production
    })
    return new_user

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = await get_user_by_email(db, email=form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")

    access_token_expires = timedelta(minutes=30)
    refresh_token_expires = timedelta(days=7)

    access_token = create_access_token(
        data={"user_id": user.id, "email": user.email, "role": user.role},
        expires_delta=access_token_expires
    )

    refresh_token = create_refresh_token(
        data={"user_id": user.id},
        expires_delta=refresh_token_expires
    )

    # Store refresh token in database
    await create_session(db, {
        "user_id": user.id,
        "token": access_token,
        "refresh_token": refresh_token,
        "expires_at": datetime.utcnow() + access_token_expires
    })

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

@router.post("/refresh", response_model=Token)
async def refresh_token(refresh_token: str, db: Session = Depends(get_db)):
    # Verify refresh token
    token_data = decode_token(refresh_token)
    if not token_data or token_data.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token"
        )

    # Check if session exists
    session = await get_session_by_refresh_token(db, refresh_token)
    if not session:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Session not found"
        )

    # Invalidate old session
    await invalidate_session(db, session.id)

    # Get user
    user = await get_current_user(refresh_token, db)

    # Create new tokens
    access_token_expires = timedelta(minutes=30)
    new_refresh_token_expires = timedelta(days=7)

    new_access_token = create_access_token(
        data={"user_id": user.id, "email": user.email, "role": user.role},
        expires_delta=access_token_expires
    )

    new_refresh_token = create_refresh_token(
        data={"user_id": user.id},
        expires_delta=new_refresh_token_expires
    )

    # Store new refresh token
    await create_session(db, {
        "user_id": user.id,
        "token": new_access_token,
        "refresh_token": new_refresh_token,
        "expires_at": datetime.utcnow() + access_token_expires
    })

    return {
        "access_token": new_access_token,
        "refresh_token": new_refresh_token,
        "token_type": "bearer"
    }

@router.post("/logout")
async def logout(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    # Invalidate session
    token_data = decode_token(token)
    if not token_data:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    session = await get_session_by_refresh_token(db, token)
    if session:
        await invalidate_session(db, session.id)

    return {"message": "Successfully logged out"}

@router.get("/me", response_model=UserOut)
async def read_users_me(current_user: UserOut = Depends(get_current_user)):
    return current_user
