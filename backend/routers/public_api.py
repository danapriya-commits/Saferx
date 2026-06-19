from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from pydantic import BaseModel
import os
import smtplib
from email.message import EmailMessage

from database import get_db
from models import MedicalEquipment, KnowledgeCentreArticle

router = APIRouter(prefix="/api/public", tags=["public_api"])

@router.get("/equipment")
async def get_equipment(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(MedicalEquipment)
        .where(MedicalEquipment.is_active == True)
        .order_by(MedicalEquipment.display_order.asc())
    )
    equipment = result.scalars().all()
    
    eq_list = []
    for eq in equipment:
        eq_list.append({
            "id": eq.id,
            "title": eq.title,
            "short_description": eq.short_description,
            "description": eq.description,
            "category": eq.category,
            "image_url": eq.image_url,
            "display_order": eq.display_order,
            "is_active": eq.is_active
        })
        
    return {"equipment": eq_list}

@router.get("/equipment/{equipment_id}")
async def get_single_equipment(equipment_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(MedicalEquipment).where(MedicalEquipment.id == equipment_id)
    )
    equipment = result.scalars().first()
    if not equipment or not equipment.is_active:
        raise HTTPException(status_code=404, detail="Equipment not found")
        
    return {
        "id": equipment.id,
        "title": equipment.title,
        "short_description": equipment.short_description,
        "description": equipment.description,
        "category": equipment.category,
        "image_url": equipment.image_url,
        "display_order": equipment.display_order,
        "is_active": equipment.is_active
    }

@router.get("/knowledge")
async def get_knowledge(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(KnowledgeCentreArticle)
        .where(KnowledgeCentreArticle.is_published == True)
        .order_by(KnowledgeCentreArticle.published_at.desc())
    )
    articles = result.scalars().all()
    
    art_list = []
    for art in articles:
        art_list.append({
            "id": art.id,
            "title": art.title,
            "slug": art.slug,
            "excerpt": art.excerpt,
            "content": art.content,
            "category": art.category,
            "author": art.author,
            "image_url": art.image_url,
            "is_published": art.is_published
        })
        
    return {"articles": art_list}

@router.get("/knowledge/{slug}")
async def get_single_knowledge(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(KnowledgeCentreArticle).where(KnowledgeCentreArticle.slug == slug)
    )
    article = result.scalars().first()
    if not article or not article.is_published:
        raise HTTPException(status_code=404, detail="Article not found")
        
    return {
        "id": article.id,
        "title": article.title,
        "slug": article.slug,
        "excerpt": article.excerpt,
        "content": article.content,
        "category": article.category,
        "author": article.author,
        "image_url": article.image_url,
        "is_published": article.is_published
    }

class ContactMessage(BaseModel):
    name: str
    email: str
    subject: str
    number: str
    message: str = ""

@router.post("/contact")
async def submit_contact(data: ContactMessage):
    recipient = os.environ.get("FEEDBACK_EMAIL", "danapriya@saferxmedical.com")
    
    msg = EmailMessage()
    msg.set_content(f"Name: {data.name}\nEmail: {data.email}\nPhone: {data.number}\n\nMessage:\n{data.message}")
    msg['Subject'] = f"New Feedback: {data.subject}"
    msg['From'] = data.email
    msg['To'] = recipient

    smtp_server = os.environ.get("SMTP_SERVER", "smtp.gmail.com")
    smtp_port = int(os.environ.get("SMTP_PORT", 587))
    smtp_user = os.environ.get("SMTP_USERNAME")
    smtp_pass = os.environ.get("SMTP_PASSWORD")

    try:
        if smtp_user and smtp_pass:
            with smtplib.SMTP(smtp_server, smtp_port) as server:
                server.starttls()
                server.login(smtp_user, smtp_pass)
                server.send_message(msg)
        else:
            print(f"---      TO {recipient} ---")
            print(msg.as_string())
            print("---------------------------------------")
            
        return {"status": "success", "message": "Feedback submitted successfully."}
    except Exception as e:
        print(f"Error sending email: {e}")
        raise HTTPException(status_code=500, detail="Failed to send feedback.")

