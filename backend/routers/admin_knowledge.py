import os
import uuid
from typing import Optional
from pathlib import Path
from datetime import datetime

from fastapi import APIRouter, Depends, Request, Form, UploadFile, File, HTTPException
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import delete

from database import get_db
from models import AdminUser, KnowledgeCentreArticle
from core.deps import get_current_admin

BASE_DIR = Path(__file__).resolve().parent.parent
templates = Jinja2Templates(directory=str(BASE_DIR / "templates"))
router = APIRouter(prefix="/admin/knowledge-centre", tags=["admin_knowledge"])

UPLOAD_DIR = BASE_DIR / "static" / "uploads"
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

@router.get("", response_class=HTMLResponse)
async def list_articles(request: Request, admin: AdminUser = Depends(get_current_admin), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(KnowledgeCentreArticle).order_by(KnowledgeCentreArticle.published_at.desc()))
    articles = result.scalars().all()
    return templates.TemplateResponse("knowledge/list.html", {"request": request, "admin": admin, "articles": articles})

@router.get("/new", response_class=HTMLResponse)
async def new_article(request: Request, admin: AdminUser = Depends(get_current_admin)):
    return templates.TemplateResponse("knowledge/form.html", {"request": request, "admin": admin, "article": None})

@router.post("/new")
async def create_article(
    request: Request,
    title: str = Form(...),
    slug: str = Form(...),
    excerpt: str = Form(""),
    content: str = Form(""),
    category: str = Form(""),
    author: str = Form(""),
    is_published: bool = Form(False),
    image: UploadFile = File(None),
    admin: AdminUser = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db)
):
    image_url = None
    if image and image.filename:
        ext = Path(image.filename).suffix.lower()
        if ext in ALLOWED_EXTENSIONS:
            file_content = await image.read()
            if len(file_content) <= MAX_FILE_SIZE:
                filename = f"{uuid.uuid4()}{ext}"
                file_path = UPLOAD_DIR / filename
                with open(file_path, "wb") as f:
                    f.write(file_content)
                image_url = f"/static/uploads/{filename}"
                
    article = KnowledgeCentreArticle(
        title=title,
        slug=slug,
        excerpt=excerpt,
        content=content,
        category=category,
        author=author,
        is_published=is_published,
        image_url=image_url
    )
    
    db.add(article)
    await db.commit()
    return RedirectResponse(url="/admin/knowledge-centre", status_code=302)

@router.get("/{article_id}/edit", response_class=HTMLResponse)
async def edit_article(article_id: str, request: Request, admin: AdminUser = Depends(get_current_admin), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(KnowledgeCentreArticle).where(KnowledgeCentreArticle.id == article_id))
    article = result.scalars().first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
        
    return templates.TemplateResponse("knowledge/form.html", {"request": request, "admin": admin, "article": article})

@router.post("/{article_id}/edit")
async def update_article(
    article_id: str,
    request: Request,
    title: str = Form(...),
    slug: str = Form(...),
    excerpt: str = Form(""),
    content: str = Form(""),
    category: str = Form(""),
    author: str = Form(""),
    is_published: bool = Form(False),
    image: UploadFile = File(None),
    admin: AdminUser = Depends(get_current_admin),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(KnowledgeCentreArticle).where(KnowledgeCentreArticle.id == article_id))
    article = result.scalars().first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
        
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
                if article.image_url and article.image_url.startswith("/static/uploads/"):
                    old_filename = article.image_url.split("/")[-1]
                    old_filepath = UPLOAD_DIR / old_filename
                    if old_filepath.exists():
                        try:
                            old_filepath.unlink()
                        except Exception as e:
                            print(f"Failed to delete old image {old_filepath}: {e}")
                
                article.image_url = f"/static/uploads/{filename}"

    article.title = title
    article.slug = slug
    article.excerpt = excerpt
    article.content = content
    article.category = category
    article.author = author
    article.is_published = is_published
    article.updated_at = datetime.utcnow()
    
    await db.commit()
    return RedirectResponse(url="/admin/knowledge-centre", status_code=302)

@router.post("/{article_id}/delete")
async def delete_article(article_id: str, admin: AdminUser = Depends(get_current_admin), db: AsyncSession = Depends(get_db)):
    await db.execute(delete(KnowledgeCentreArticle).where(KnowledgeCentreArticle.id == article_id))
    await db.commit()
    return RedirectResponse(url="/admin/knowledge-centre", status_code=302)
