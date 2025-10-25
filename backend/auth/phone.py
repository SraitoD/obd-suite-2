from fastapi import APIRouter, HTTPException, status, Depends
from twilio.rest import Client
from ..config import settings
from ..database import get_db
from ..models import User, PhoneVerification
from ..crud import get_user_by_phone, create_user
from .utils import create_access_token, create_refresh_token
from sqlalchemy.orm import Session
from datetime import timedelta
import random

router = APIRouter(prefix="/auth/phone", tags=["auth"])

def get_twilio_client():
    if not all([settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN, settings.TWILIO_VERIFY_SERVICE_SID]):
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Twilio configuration missing"
        )
    return Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

@router.post("/start")
async def start_phone_verification(phone_data: PhoneVerification, db: Session = Depends(get_db)):
    # Check if user exists
    user = await get_user_by_phone(db, phone_data.phone_number)
    if not user:
        # Create temporary user for verification
        user = await create_user(db, {
            "phone_number": phone_data.phone_number,
            "is_verified": False
        })

    # Generate verification code
    verification_code = str(random.randint(100000, 999999))

    try:
        client = get_twilio_client()
        verification = client.verify.v2.services(settings.TWILIO_VERIFY_SERVICE_SID) \
            .verifications \
            .create(to=phone_data.phone_number, channel="sms")

        if verification.status == "pending":
            # In production, store the code securely and associate with user
            # For demo purposes, we return it (don't do this in production!)
            return {
                "status": "verification_started",
                "verification_code": verification_code,  # Remove in production
                "phone_number": phone_data.phone_number
            }
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Failed to start verification"
            )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Verification error: {str(e)}"
        )

@router.post("/verify")
async def verify_phone_code(verification_data: PhoneVerification, db: Session = Depends(get_db)):
    try:
        client = get_twilio_client()
        verification_check = client.verify.v2.services(settings.TWILIO_VERIFY_SERVICE_SID) \
            .verification_checks \
            .create(to=verification_data.phone_number, code=verification_data.verification_code)

        if verification_check.status == "approved":
            # Find user and mark as verified
            user = await get_user_by_phone(db, verification_data.phone_number)
            if not user:
                raise HTTPException(status_code=404, detail="User not found")

            user.is_verified = True
            db.commit()
            db.refresh(user)

            # Create tokens
            access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
            refresh_token_expires = timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)

            access_token = create_access_token(
                data={"user_id": user.id, "phone": user.phone_number, "role": user.role},
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
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid verification code"
            )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Verification error: {str(e)}"
        )
