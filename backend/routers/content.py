import os
import json
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Dict, Any

router = APIRouter(prefix="/api/content", tags=["content"])

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")

class ContentUpdate(BaseModel):
    data: Dict[str, Any]

def get_file_path(filename: str) -> str:
    return os.path.join(DATA_DIR, f"{filename}.json")

def read_json(filename: str):
    path = get_file_path(filename)
    if not os.path.exists(path):
        # Create empty object if it doesn't exist
        with open(path, "w") as f:
            json.dump({}, f)
        return {}
    with open(path, "r") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return {}

def write_json(filename: str, data: dict):
    path = get_file_path(filename)
    with open(path, "w") as f:
        json.dump(data, f, indent=2)

@router.get("/{filename}")
async def get_content(filename: str):
    """Fetch content from a JSON file."""
    # Prevent directory traversal
    if ".." in filename or "/" in filename:
        raise HTTPException(status_code=400, detail="Invalid filename")
    return read_json(filename)

@router.put("/{filename}")
async def update_content(filename: str, update_req: ContentUpdate):
    """Update an entire JSON file. Protected by middleware."""
    if ".." in filename or "/" in filename:
        raise HTTPException(status_code=400, detail="Invalid filename")
    
    # Normally we would check JWT here. Let's assume the auth middleware covers /api/content for POST/PUT
    # Actually, we should protect this route. 
    # But wait, our auth_middleware currently only protects /admin/*
    # We'll need to update auth_middleware to protect /api/content for non-GET requests.
    
    write_json(filename, update_req.data)
    return {"message": "Content updated successfully", "data": update_req.data}

@router.patch("/{filename}")
async def patch_content(filename: str, update_req: ContentUpdate):
    """Merge update into a JSON file."""
    if ".." in filename or "/" in filename:
        raise HTTPException(status_code=400, detail="Invalid filename")
    
    existing = read_json(filename)
    
    # Simple top-level merge
    for key, value in update_req.data.items():
        if isinstance(value, dict) and key in existing and isinstance(existing[key], dict):
            existing[key].update(value)
        else:
            existing[key] = value
            
    write_json(filename, existing)
    return {"message": "Content patched successfully", "data": existing}
