import os
import uuid
from typing import Optional
from pathlib import Path

from fastapi import APIRouter, Depends, Request, Form, UploadFile, File, HTTPException
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import delete

from database import get_db
from models import AdminUser, MedicalEquipment
from core.deps import get_current_admin

BASE_DIR = Path(__file__).resolve().parent.parent
templates = Jinja2Templates(directory=str(BASE_DIR / "templates"))
router = APIRouter(prefix="/admin/equipment", tags=["admin_equipment"])

UPLOAD_DIR = BASE_DIR / "static" / "uploads"
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

@router.get("", response_class=HTMLResponse)
async def list_equipment(request: Request, admin: AdminUser = Depends(get_current_admin), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MedicalEquipment).order_by(MedicalEquipment.display_order))
    equipment_list = result.scalars().all()
    return templates.TemplateResponse("equipment/list.html", {"request": request, "admin": admin, "equipment_list": equipment_list})

@router.get("/new", response_class=HTMLResponse)
async def new_equipment(request: Request, admin: AdminUser = Depends(get_current_admin)):
    return templates.TemplateResponse("equipment/form.html", {"request": request, "admin": admin, "equipment": None})

@router.post("/new")
async def create_equipment(
    request: Request,
    title: str = Form(...),
    short_description: str = Form(""),
    description: str = Form(""),
    category: str = Form(""),
    display_order: int = Form(0),
    is_active: bool = Form(False),
    image: UploadFile = File(None),
    admin: AdminUser = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db)
):
    image_url = None
    if image and image.filename:
        ext = Path(image.filename).suffix.lower()
        if ext not in ALLOWED_EXTENSIONS:
            raise HTTPException(status_code=400, detail="Invalid file type")
            
        file_content = await image.read()
        if len(file_content) > MAX_FILE_SIZE:
            raise HTTPException(status_code=400, detail="File too large")
            
        filename = f"{uuid.uuid4()}{ext}"
        file_path = UPLOAD_DIR / filename
        
        with open(file_path, "wb") as f:
            f.write(file_content)
            
        image_url = f"/static/uploads/{filename}"
        
    equipment = MedicalEquipment(
        title=title,
        short_description=short_description,
        description=description,
        category=category,
        display_order=display_order,
        is_active=is_active,
        image_url=image_url
    )
    
    db.add(equipment)
    await db.commit()
    return RedirectResponse(url="/admin/equipment", status_code=302)

@router.get("/{eq_id}/edit", response_class=HTMLResponse)
async def edit_equipment(eq_id: str, request: Request, admin: AdminUser = Depends(get_current_admin), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MedicalEquipment).where(MedicalEquipment.id == eq_id))
    equipment = result.scalars().first()
    if not equipment:
        raise HTTPException(status_code=404, detail="Equipment not found")
        
    return templates.TemplateResponse("equipment/form.html", {"request": request, "admin": admin, "equipment": equipment})

@router.post("/{eq_id}/edit")
async def update_equipment(
    eq_id: str,
    request: Request,
    title: str = Form(...),
    short_description: str = Form(""),
    description: str = Form(""),
    category: str = Form(""),
    display_order: int = Form(0),
    is_active: bool = Form(False),
    image: UploadFile = File(None),
    admin: AdminUser = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(MedicalEquipment).where(MedicalEquipment.id == eq_id))
    equipment = result.scalars().first()
    if not equipment:
        raise HTTPException(status_code=404, detail="Equipment not found")
        
    if image and image.filename:
        ext = Path(image.filename).suffix.lower()
        if ext in ALLOWED_EXTENSIONS:
            file_content = await image.read()
            if len(file_content) <= MAX_FILE_SIZE:
                filename = f"{uuid.uuid4()}{ext}"
                file_path = UPLOAD_DIR / filename
                with open(file_path, "wb") as f:
                    f.write(file_content)
                
                # Delete old image if it exists
                if equipment.image_url and equipment.image_url.startswith("/static/uploads/"):
                    old_filename = equipment.image_url.split("/")[-1]
                    old_filepath = UPLOAD_DIR / old_filename
                    if old_filepath.exists():
                        try:
                            old_filepath.unlink()
                        except Exception as e:
                            print(f"Failed to delete old image {old_filepath}: {e}")
                
                equipment.image_url = f"/static/uploads/{filename}"

    equipment.title = title
    equipment.short_description = short_description
    equipment.description = description
    equipment.category = category
    equipment.display_order = display_order
    equipment.is_active = is_active
    
    await db.commit()
    return RedirectResponse(url="/admin/equipment", status_code=302)

@router.post("/{eq_id}/delete")
async def delete_equipment(eq_id: str, admin: AdminUser = Depends(get_current_admin), db: AsyncSession = Depends(get_db)):
    await db.execute(delete(MedicalEquipment).where(MedicalEquipment.id == eq_id))
    await db.commit()
    return RedirectResponse(url="/admin/equipment", status_code=302)
