from pydantic import BaseSettings, PostgresDsn
from typing import Optional

class Settings(BaseSettings):
    ENVIRONMENT: str = "development"
    DATABASE_URL: PostgresDsn
    JWT_SECRET: str = "supersecretkeyfordevonly"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    GOOGLE_CLIENT_ID: Optional[str] = None
    GOOGLE_CLIENT_SECRET: Optional[str] = None
    TWILIO_ACCOUNT_SID: Optional[str] = None
    TWILIO_AUTH_TOKEN: Optional[str] = None
    TWILIO_VERIFY_SERVICE_SID: Optional[str] = None

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
