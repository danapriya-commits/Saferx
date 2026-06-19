"""
Authentication router: API Login & Logout for the Next.js admin panel.
"""
from fastapi import APIRouter, Depends, HTTPException, status, Response
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from database import get_db
from models import AdminUser
from core.security import verify_password, create_access_token

router = APIRouter(prefix="/api/auth", tags=["auth"])

class LoginRequest(BaseModel):
    email: str
    password: str

import os

@router.post("/login")
async def login_api(
    req: LoginRequest,
    response: Response,
    db: AsyncSession = Depends(get_db)
):
    """JSON API to authenticate and set cookie."""
    admin_email = os.environ.get("ADMIN_EMAIL")
    admin_password = os.environ.get("ADMIN_PASSWORD")

    # Check against environment variables first
    if admin_email and admin_password and req.email == admin_email and req.password == admin_password:
        pass # Valid env credentials
    else:
        # Fallback to database check
        result = await db.execute(select(AdminUser).where(AdminUser.email == req.email))
        admin = result.scalars().first()

        if not admin or not verify_password(req.password, admin.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )

    # Create JWT token
    token = create_access_token(data={
        "sub": req.email,
    })

    # Set HttpOnly cookie for the frontend
    response.set_cookie(
        key="admin_token",
        value=token,
        httponly=True,
        samesite="lax",
        max_age=86400,  # 24 hours
        path="/"
    )
    return {"status": "success", "message": "Logged in successfully", "token": token}

@router.post("/logout")
async def logout_api(response: Response):
    """Clear the JWT cookie."""
    response.delete_cookie("admin_token", path="/")
    return {"status": "success", "message": "Logged out successfully"}
