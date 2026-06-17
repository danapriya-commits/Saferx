from datetime import datetime
import uuid
from sqlalchemy import Column, String, Text, Boolean, Integer, DateTime
from database import Base

class AdminUser(Base):
    __tablename__ = "admin_users"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class MedicalEquipment(Base):
    __tablename__ = "medical_equipment"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    short_description = Column(Text, nullable=True)
    description = Column(Text, nullable=True)
    category = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
    display_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class KnowledgeCentreArticle(Base):
    __tablename__ = "knowledge_centre"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    excerpt = Column(Text, nullable=True)
    content = Column(Text, nullable=True)
    category = Column(String, nullable=True)
    author = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
    is_published = Column(Boolean, default=False)
    published_at = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class WebsiteContent(Base):
    __tablename__ = "website_content"
    
    id = Column(Integer, primary_key=True, index=True)
    page = Column(String, index=True)      # e.g., "home"
    section = Column(String, index=True)   # e.g., "hero"
    field_key = Column(String)             # e.g., "title"
    content_type = Column(String)          # "text", "image"
    content_value = Column(Text)           # The actual text or image URL
    status = Column(String, default="published") # "draft" or "published"
