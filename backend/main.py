"""
SAFERX Admin Panel — FastAPI Application Entry Point.
Serves the admin panel with Jinja2 templates, JWT auth, and PostgreSQL.
"""
import os
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, Request, Depends
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, RedirectResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from dotenv import load_dotenv

load_dotenv()

from database import get_db, engine, Base
from models import MedicalEquipment, KnowledgeCentreArticle, AdminUser, WebsiteContent
from core.deps import get_current_admin
from routers import auth, admin_ui, admin_equipment, admin_knowledge, content, public_api, visual_editor


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Create tables on startup if they don't exist."""
    # Ensure static/uploads directory exists
    uploads_dir = Path(__file__).parent / "static" / "uploads"
    uploads_dir.mkdir(parents=True, exist_ok=True)
    
    # Create tables on startup if they don't exist
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield


app = FastAPI(
    title="SafeRx Admin Panel",
    description="Backend Admin Panel for SafeRx Medical Supplies",
    version="1.0.0",
    lifespan=lifespan,
)

# Mount static files
app.mount("/static", StaticFiles(directory=Path(__file__).parent / "static"), name="static")

# Register routers
app.include_router(auth.router)
app.include_router(admin_ui.router)
app.include_router(admin_equipment.router)
app.include_router(admin_knowledge.router)
app.include_router(content.router)
app.include_router(public_api.router)
app.include_router(visual_editor.router)

# Jinja2 templates
templates = Jinja2Templates(directory="templates")

# ── Root redirect ──
@app.get("/")
async def root():
    return RedirectResponse(url="/admin/login", status_code=302)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
