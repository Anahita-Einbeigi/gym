from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schema.classes import GymClassResponse
from app.crud import classes as crud_classes
from app.database import get_db

router = APIRouter(
    prefix="/classes",
    tags=["classes"]
)


# Get all classes
@router.get("/", response_model=list[GymClassResponse])
def get_classes(db: Session = Depends(get_db)):
    return crud_classes.get_classes(db)


# Get single class by ID
@router.get("/{class_id}", response_model=GymClassResponse)
def get_class(class_id: int, db: Session = Depends(get_db)):
    return crud_classes.get_class(class_id, db)
