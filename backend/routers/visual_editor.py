import os
import uuid
import aiofiles
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import update, delete
from typing import List, Dict, Any, Optional

from database import get_db
from models import WebsiteContent, AdminUser
from core.deps import get_current_admin

router = APIRouter(prefix="/api/editor", tags=["visual_editor"])

class ContentItem(BaseModel):
    page: str
    section: str
    field_key: str
    content_type: str = "text"
    content_value: str

class SaveRequest(BaseModel):
    items: List[ContentItem]

class EquipmentCreate(BaseModel):
    title: str
    short_description: str = ""
    description: str = ""
    category: str = ""
    image_url: str = ""

@router.get("/content")
async def get_content(page: str = "home", status: str = "published", db: AsyncSession = Depends(get_db)):
    """Fetch content for a page. If status=draft, it merges drafts over published."""
    # First get published
    query = select(WebsiteContent).where(
        WebsiteContent.page == page,
        WebsiteContent.status == "published"
    )
    result = await db.execute(query)
    published_items = result.scalars().all()
    
    content_map = {}
    
    # Map published items
    for item in published_items:
        if item.section not in content_map:
            content_map[item.section] = {}
        content_map[item.section][item.field_key] = item.content_value

    if status == "draft":
        # Get drafts and override published
        draft_query = select(WebsiteContent).where(
            WebsiteContent.page == page,
            WebsiteContent.status == "draft"
        )
        draft_result = await db.execute(draft_query)
        draft_items = draft_result.scalars().all()
        for item in draft_items:
            if item.section not in content_map:
                content_map[item.section] = {}
            content_map[item.section][item.field_key] = item.content_value
            
    return content_map

@router.post("/save")
async def save_content(request: SaveRequest, db: AsyncSession = Depends(get_db), admin: AdminUser = Depends(get_current_admin)):
    """Save content as draft."""
    for item in request.items:
        query = select(WebsiteContent).where(
            WebsiteContent.page == item.page,
            WebsiteContent.section == item.section,
            WebsiteContent.field_key == item.field_key,
            WebsiteContent.status == "draft"
        )
        result = await db.execute(query)
        existing_draft = result.scalars().first()
        
        if existing_draft:
            existing_draft.content_value = item.content_value
        else:
            new_draft = WebsiteContent(
                page=item.page,
                section=item.section,
                field_key=item.field_key,
                content_type=item.content_type,
                content_value=item.content_value,
                status="draft"
            )
            db.add(new_draft)
            
    await db.commit()
    return {"status": "success", "message": "Drafts saved."}

@router.post("/publish")
async def publish_content(request: SaveRequest, db: AsyncSession = Depends(get_db), admin: AdminUser = Depends(get_current_admin)):
    """Promote specific items directly to published."""
    for item in request.items:
        # Check if published row exists
        pub_query = select(WebsiteContent).where(
            WebsiteContent.page == item.page,
            WebsiteContent.section == item.section,
            WebsiteContent.field_key == item.field_key,
            WebsiteContent.status == "published"
        )
        pub_result = await db.execute(pub_query)
        published = pub_result.scalars().first()
        
        if published:
            published.content_value = item.content_value
        else:
            new_pub = WebsiteContent(
                page=item.page,
                section=item.section,
                field_key=item.field_key,
                content_type=item.content_type,
                content_value=item.content_value,
                status="published"
            )
            db.add(new_pub)
            
        # Delete draft if it exists
        draft_query = select(WebsiteContent).where(
            WebsiteContent.page == item.page,
            WebsiteContent.section == item.section,
            WebsiteContent.field_key == item.field_key,
            WebsiteContent.status == "draft"
        )
        draft_result = await db.execute(draft_query)
        draft = draft_result.scalars().first()
        if draft:
            await db.delete(draft)
            
    await db.commit()
    return {"status": "success", "message": f"{len(request.items)} items published."}

@router.post("/upload")
async def upload_image(file: UploadFile = File(...), admin: AdminUser = Depends(get_current_admin)):
    """Upload an image and return its URL."""
    upload_dir = os.path.join("static", "uploads")
    os.makedirs(upload_dir, exist_ok=True)
    
    ext = file.filename.split(".")[-1] if "." in file.filename else "jpg"
    filename = f"{uuid.uuid4().hex}.{ext}"
    filepath = os.path.join(upload_dir, filename)
    
    async with aiofiles.open(filepath, 'wb') as out_file:
        content = await file.read()
        await out_file.write(content)
        
    return {"url": f"/static/uploads/{filename}"}

@router.post("/equipment/new")
async def create_equipment_api(
    data: EquipmentCreate,
    db: AsyncSession = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin)
):
    """Create new medical equipment from the visual editor."""
    from models import MedicalEquipment
    
    # Get max display order
    query = select(MedicalEquipment.display_order).order_by(MedicalEquipment.display_order.desc())
    result = await db.execute(query)
    max_order = result.scalars().first()
    new_order = (max_order or 0) + 1

    equipment = MedicalEquipment(
        title=data.title,
        short_description=data.short_description,
        description=data.description,
        category=data.category,
        image_url=data.image_url,
        is_active=True,
        display_order=new_order
    )
    
    db.add(equipment)
    await db.commit()
    
    return {
        "status": "success",
        "equipment": {
            "id": equipment.id,
            "title": equipment.title,
            "short_description": equipment.short_description,
            "description": equipment.description,
            "category": equipment.category,
            "image_url": equipment.image_url,
            "display_order": equipment.display_order,
            "is_active": equipment.is_active
        }
    }

@router.delete("/equipment/{equipment_id}")
async def delete_equipment_api(
    equipment_id: int,
    db: AsyncSession = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin)
):
    """Delete medical equipment."""
    from models import MedicalEquipment
    
    query = select(MedicalEquipment).where(MedicalEquipment.id == equipment_id)
    result = await db.execute(query)
    equipment = result.scalars().first()
    
    if not equipment:
        raise HTTPException(status_code=404, detail="Equipment not found")
        
    await db.delete(equipment)
    await db.commit()
    
    return {"status": "success", "message": "Equipment deleted successfully"}

@router.put("/equipment/{equipment_id}")
async def update_equipment_api(
    equipment_id: int,
    data: EquipmentCreate,
    db: AsyncSession = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin)
):
    """Update medical equipment."""
    from models import MedicalEquipment
    
    query = select(MedicalEquipment).where(MedicalEquipment.id == equipment_id)
    result = await db.execute(query)
    equipment = result.scalars().first()
    
    if not equipment:
        raise HTTPException(status_code=404, detail="Equipment not found")
        
    equipment.title = data.title
    equipment.category = data.category
    equipment.short_description = data.short_description
    equipment.description = data.description
    if data.image_url:
        equipment.image_url = data.image_url
        
    await db.commit()
    
    return {"status": "success", "message": "Equipment updated successfully"}

class KnowledgeCreate(BaseModel):
    title: str
    slug: str
    excerpt: str = ""
    content: str = ""
    category: str = ""
    author: str = ""
    image_url: str = ""
    read_time: str = "5 min read"

@router.post("/knowledge/new")
async def create_knowledge_api(
    data: KnowledgeCreate,
    db: AsyncSession = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin)
):
    """Create a new knowledge article."""
    from models import KnowledgeCentreArticle
    from datetime import datetime
    
    article = KnowledgeCentreArticle(
        title=data.title,
        slug=data.slug,
        excerpt=data.excerpt,
        content=data.content,
        category=data.category,
        author=data.author,
        image_url=data.image_url,
        is_published=True,
        published_at=datetime.utcnow()
    )
    
    db.add(article)
    await db.commit()
    return {"status": "success", "message": "Article created."}

@router.delete("/knowledge/{article_id}")
async def delete_knowledge_api(
    article_id: int,
    db: AsyncSession = Depends(get_db),
    admin: AdminUser = Depends(get_current_admin)
):
    """Delete a knowledge article."""
    from models import KnowledgeCentreArticle
    query = select(KnowledgeCentreArticle).where(KnowledgeCentreArticle.id == article_id)
    result = await db.execute(query)
    article = result.scalars().first()
    
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
        
    await db.delete(article)
    await db.commit()
    return {"status": "success", "message": "Article deleted successfully"}
