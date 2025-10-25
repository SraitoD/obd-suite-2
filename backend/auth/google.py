from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from httpx_oauth.clients.google import GoogleOAuth2
from ..config import settings
from ..database import get_db
from ..models import User, UserRole
from ..crud import get_user_by_email, create_user
from .utils import create_access_token, create_refresh_token
from sqlalchemy.orm import Session
from datetime import timedelta

router = APIRouter(prefix="/auth/google", tags=["auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/google/token")

async def get_google_oauth_client():
    return GoogleOAuth2(
        settings.GOOGLE_CLIENT_ID,
        settings.GOOGLE_CLIENT_SECRET,
        redirect_uri="http://localhost:8000/auth/google/callback"
    )

@router.get("/login")
async def login_google():
    client = await get_google_oauth_client()
    authorization_url = await client.get_authorization_url(
        "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
        state="some_random_state"
    )
    return {"authorization_url": authorization_url}

@router.get("/callback")
async def google_callback(code: str, db: Session = Depends(get_db)):
    client = await get_google_oauth_client()
    try:
        token = await client.get_access_token(code)
        user_data = await client.get_id_email(token["access_token"])

        # Find or create user
        user = await get_user_by_email(db, user_data["email"])
        if not user:
            user = await create_user(db, {
                "email": user_data["email"],
                "full_name": user_data.get("name"),
                "is_verified": True,
                "role": UserRole.USER
            })

        # Create tokens
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        refresh_token_expires = timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)

        access_token = create_access_token(
            data={"user_id": user.id, "email": user.email, "role": user.role},
            expires_delta=access_token_expires
        )

        refresh_token = create_refresh_token(
            data={"user_id": user.id},
            expires_delta=refresh_token_expires
        )

        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer"
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Google OAuth error: {str(e)}"
        )
