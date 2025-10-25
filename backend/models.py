from datetime import datetime
from enum import Enum
from typing import Optional, List
from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship, declarative_base
from pydantic import BaseModel, EmailStr, Field
from passlib.context import CryptContext

Base = declarative_base()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserRole(str, Enum):
    ADMIN = "admin"
    USER = "user"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=True)  # Nullable pour OAuth
    full_name = Column(String, nullable=True)
    phone_number = Column(String, unique=True, nullable=True)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    role = Column(SQLEnum(UserRole), default=UserRole.USER)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    sessions = relationship("Session", back_populates="user")
    vehicles = relationship("Vehicle", back_populates="owner")

    def verify_password(self, password: str) -> bool:
        return pwd_context.verify(password, self.hashed_password)

class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True, index=True)
    make = Column(String, nullable=False)
    model = Column(String, nullable=False)
    year = Column(Integer, nullable=False)
    vin = Column(String, unique=True, nullable=False)
    license_plate = Column(String, unique=True, nullable=True)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    owner = relationship("User", back_populates="vehicles")
    dtc_codes = relationship("DTCCode", back_populates="vehicle")

class DTCCode(Base):
    __tablename__ = "dtc_codes"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, nullable=False)
    description = Column(String, nullable=True)
    severity = Column(String, nullable=True)
    status = Column(String, default="active")  # active/pending/cleared
    first_detected = Column(DateTime, default=datetime.utcnow)
    last_detected = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    vehicle_id = Column(Integer, ForeignKey("vehicles.id"), nullable=False)

    vehicle = relationship("Vehicle", back_populates="dtc_codes")

class Session(Base):
    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    token = Column(String, unique=True, index=True, nullable=False)
    refresh_token = Column(String, unique=True, index=True, nullable=False)
    expires_at = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    ip_address = Column(String, nullable=True)
    user_agent = Column(String, nullable=True)

    user = relationship("User", back_populates="sessions")

# Pydantic models
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)
    full_name: Optional[str] = None
    phone_number: Optional[str] = None

class UserOut(BaseModel):
    id: int
    email: EmailStr
    full_name: Optional[str]
    phone_number: Optional[str]
    is_active: bool
    is_verified: bool
    role: UserRole
    created_at: datetime

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    refresh_token: str

class TokenData(BaseModel):
    user_id: Optional[int] = None
    email: Optional[EmailStr] = None
    role: Optional[UserRole] = None

class VehicleCreate(BaseModel):
    make: str
    model: str
    year: int
    vin: str
    license_plate: Optional[str] = None

class VehicleOut(BaseModel):
    id: int
    make: str
    model: str
    year: int
    vin: str
    license_plate: Optional[str]
    owner_id: int

    class Config:
        orm_mode = True

class PhoneVerification(BaseModel):
    phone_number: str
    verification_code: str
