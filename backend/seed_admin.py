import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from database import SessionLocal
from models import AdminUser
from core.security import get_password_hash

import os
from dotenv import load_dotenv

load_dotenv()

async def seed_admin():
    async with SessionLocal() as db:
        admin_email = os.environ.get("ADMIN_EMAIL")
        admin_password = os.environ.get("ADMIN_PASSWORD")

        if not admin_email or not admin_password:
            raise ValueError("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env")
        
        # Check if admin already exists
        from sqlalchemy.future import select
        result = await db.execute(select(AdminUser).where(AdminUser.email == admin_email))
        user = result.scalars().first()
        
        if not user:
            hashed_pw = get_password_hash(admin_password)
            new_admin = AdminUser(email=admin_email, hashed_password=hashed_pw)
            db.add(new_admin)
            await db.commit()
            print(f"Created default admin: {admin_email} / {admin_password}")
        else:
            print("Admin already exists.")

if __name__ == "__main__":
    asyncio.run(seed_admin())
