from sqlalchemy.orm import Session
from .models import User, Vehicle, Session as SessionModel, DTCCode
from datetime import datetime
from typing import Optional, Dict, Any

async def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
    return db.query(User).filter(User.id == user_id).first()

async def get_user_by_email(db: Session, email: str) -> Optional[User]:
    return db.query(User).filter(User.email == email).first()

async def get_user_by_phone(db: Session, phone: str) -> Optional[User]:
    return db.query(User).filter(User.phone_number == phone).first()

async def create_user(db: Session, user_data: Dict[str, Any]) -> User:
    db_user = User(**user_data)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

async def update_user(db: Session, user_id: int, user_data: Dict[str, Any]) -> Optional[User]:
    db_user = await get_user_by_id(db, user_id)
    if db_user:
        for key, value in user_data.items():
            setattr(db_user, key, value)
        db.commit()
        db.refresh(db_user)
    return db_user

async def create_session(db: Session, session_data: Dict[str, Any]) -> SessionModel:
    db_session = SessionModel(**session_data)
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    return db_session

async def get_session_by_refresh_token(db: Session, refresh_token: str) -> Optional[SessionModel]:
    return db.query(SessionModel).filter(SessionModel.refresh_token == refresh_token).first()

async def invalidate_session(db: Session, session_id: int) -> bool:
    session = db.query(SessionModel).filter(SessionModel.id == session_id).first()
    if session:
        db.delete(session)
        db.commit()
        return True
    return False

async def create_vehicle(db: Session, vehicle_data: Dict[str, Any]) -> Vehicle:
    db_vehicle = Vehicle(**vehicle_data)
    db.add(db_vehicle)
    db.commit()
    db.refresh(db_vehicle)
    return db_vehicle

async def get_vehicle_by_id(db: Session, vehicle_id: int) -> Optional[Vehicle]:
    return db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()

async def get_vehicles_by_owner(db: Session, owner_id: int) -> list[Vehicle]:
    return db.query(Vehicle).filter(Vehicle.owner_id == owner_id).all()

async def create_dtc_code(db: Session, dtc_data: Dict[str, Any]) -> DTCCode:
    db_dtc = DTCCode(**dtc_data)
    db.add(db_dtc)
    db.commit()
    db.refresh(db_dtc)
    return db_dtc

async def get_dtc_codes_by_vehicle(db: Session, vehicle_id: int) -> list[DTCCode]:
    return db.query(DTCCode).filter(DTCCode.vehicle_id == vehicle_id).all()
