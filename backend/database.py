import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base

from dotenv import load_dotenv

load_dotenv()

# We default to sqlite for local dev, but support postgres
SQLALCHEMY_DATABASE_URL = os.environ.get("DATABASE_URL", "")

if not SQLALCHEMY_DATABASE_URL:
    raise ValueError("No DATABASE_URL set for FastAPI application. Check .env file.")

# For sqlite we need connect_args to allow multithreading, but asyncpg doesn't use it
connect_args = {}
if SQLALCHEMY_DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

engine = create_async_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args=connect_args,
    echo=False
)

SessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

Base = declarative_base()

# Dependency to get DB session
async def get_db():
    async with SessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
