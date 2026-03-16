from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from app.schema.bookings import BookingResponse, BookingCreate
from app.database import get_db
from app.crud import bookings as crud_bookings

router = APIRouter(
    prefix="/bookings",
    tags=["bookings"]
)


# Create a new booking
@router.post("/", response_model=BookingResponse)
def create_booking(booking: BookingCreate, db: Session = Depends(get_db)):
    return crud_bookings.create_booking(booking, db)

# Delete a booking
@router.delete("/{booking_id}")
def cancel_booking(booking_id: int, db: Session = Depends(get_db)):
    return crud_bookings.cancel_booking(booking_id, db)


# Get all bookings for a user
@router.get("/user/{user_id}", response_model=List[BookingResponse])
def get_user_bookings(user_id: int, db: Session = Depends(get_db)):
    return crud_bookings.get_user_bookings(user_id, db)
