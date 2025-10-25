from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .config import settings
from .auth.main import router as auth_router
from .auth.google import router as google_router
from .auth.phone import router as phone_router
from .models import User

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="OBD Suite 2 API",
    description="Backend API for OBD Suite 2 with multi-factor authentication",
    version="0.2.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

# CORS configuration
if settings.ENVIRONMENT == "development":
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
else:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "https://your-production-domain.com",
            "http://localhost:3000",
            "http://localhost:3001"
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Include routers
app.include_router(auth_router)
app.include_router(google_router)
app.include_router(phone_router)

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT,
        "version": "0.2.0"
    }

@app.get("/api/admin/users", response_model=list[User])
async def get_all_users(db: Session = Depends(get_db),
                       current_user: User = Depends(get_current_user)):
    """Admin endpoint to list all users (requires admin role)"""
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")

    return db.query(User).all()
