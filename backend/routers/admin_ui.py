from fastapi import APIRouter, Depends, Request, Form, Response
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from database import get_db
from models import AdminUser, MedicalEquipment, KnowledgeCentreArticle
from core.security import verify_password, create_access_token
from core.deps import get_optional_admin, get_current_admin
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
router = APIRouter(prefix="/admin", tags=["admin_ui"])
templates = Jinja2Templates(directory=str(BASE_DIR / "templates"))

@router.get("", response_class=RedirectResponse)
async def admin_root():
    return RedirectResponse(url="/admin/visual-editor", status_code=302)

@router.get("/", response_class=RedirectResponse)
async def admin_root_slash():
    return RedirectResponse(url="/admin/visual-editor", status_code=302)

@router.get("/login", response_class=HTMLResponse)
async def login_page(request: Request, admin: AdminUser = Depends(get_optional_admin)):
    if admin:
        return RedirectResponse(url="/admin/visual-editor", status_code=302)
    return templates.TemplateResponse("login.html", {"request": request})

@router.post("/login")
async def login_post(
    response: Response,
    email: str = Form(...),
    password: str = Form(...),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(AdminUser).where(AdminUser.email == email))
    user = result.scalars().first()
    
    if not user or not verify_password(password, user.hashed_password):
        # In a real app we'd pass an error message to the template
        # For simplicity we redirect back to login
        return RedirectResponse(url="/admin/login?error=invalid_credentials", status_code=302)
        
    access_token = create_access_token(data={"sub": user.email})
    
    # Create a redirect response and set cookie on it
    redirect_res = RedirectResponse(url="/admin/visual-editor", status_code=302)
    redirect_res.set_cookie(
        key="admin_token", 
        value=access_token, 
        httponly=True, 
        samesite="lax",
        max_age=86400
    )
    return redirect_res

@router.get("/logout")
async def logout(response: Response):
    redirect_res = RedirectResponse(url="/admin/login", status_code=302)
    redirect_res.delete_cookie("admin_token")
    return redirect_res

@router.get("/dashboard", response_class=HTMLResponse)
async def dashboard(request: Request, admin: AdminUser = Depends(get_current_admin), db: AsyncSession = Depends(get_db)):
    # Get stats
    eq_count = (await db.execute(select(MedicalEquipment))).scalars().all()
    article_count = (await db.execute(select(KnowledgeCentreArticle))).scalars().all()
    
    return templates.TemplateResponse("dashboard.html", {
        "request": request, 
        "admin": admin,
        "total_equipment": len(eq_count),
        "total_articles": len(article_count)
    })

@router.get("/visual-editor", response_class=HTMLResponse)
async def visual_editor(request: Request, admin: AdminUser = Depends(get_current_admin)):
    """Render the Visual Content Editor."""
    return templates.TemplateResponse("visual_editor.html", {
        "request": request,
        "admin": admin
    })
