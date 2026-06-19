import jwt
from fastapi import Depends, HTTPException, status, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from database import get_db
from models import AdminUser
from core.security import SECRET_KEY, ALGORITHM

import os

async def get_current_admin(request: Request, db: AsyncSession = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    # We will look for token in HttpOnly cookie 'admin_token'
    token = request.cookies.get("admin_token")
    if not token:
        # Check authorization header as fallback
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split(" ")[1]
            
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
        )
        
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except jwt.PyJWTError:
        raise credentials_exception
        
    admin_email = os.environ.get("ADMIN_EMAIL")
    if admin_email and email == admin_email:
        # Return a mock AdminUser so it satisfies dependencies
        return AdminUser(email=email, is_active=True)

    result = await db.execute(select(AdminUser).where(AdminUser.email == email))
    user = result.scalars().first()
    if user is None or not user.is_active:
        raise credentials_exception
        
    return user

async def get_optional_admin(request: Request, db: AsyncSession = Depends(get_db)):
    try:
        return await get_current_admin(request, db)
    except HTTPException:
        return None
