import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from database import SessionLocal
from models import AdminUser
from core.security import get_password_hash

async def seed_admin():
    async with SessionLocal() as db:
        admin_email = "admin@saferx.com"
        # Check if admin already exists
        from sqlalchemy.future import select
        result = await db.execute(select(AdminUser).where(AdminUser.email == admin_email))
        user = result.scalars().first()
        
        if not user:
            hashed_pw = get_password_hash("admin123")
            new_admin = AdminUser(email=admin_email, hashed_password=hashed_pw)
            db.add(new_admin)
            await db.commit()
            print(f"Created default admin: {admin_email} / admin123")
        else:
            print("Admin already exists.")

if __name__ == "__main__":
    asyncio.run(seed_admin())
