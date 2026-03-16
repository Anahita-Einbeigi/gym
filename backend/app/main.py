from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine, get_db
from app.routers import classes, bookings, user
from app.model.classes import GymClass
from datetime import datetime


app = FastAPI(title="Gymie Booking API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200", "http://localhost:4300", "localhost", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables in SQLite
Base.metadata.create_all(bind=engine)

# Seed database with demo classes
@app.on_event("startup")
def seed_database():
    db = next(get_db())
    # Check if classes already exist
    if db.query(GymClass).count() == 0:
        demo_classes = [
            GymClass(name="Yoga Flow", trainer="Sarah Chen", training="Yoga", 
                    datetime=datetime(2024, 12, 20, 18, 0), capacity=20),
            GymClass(name="CrossFit", trainer="Mike Johnson", training="Functional", 
                    datetime=datetime(2024, 12, 21, 19, 0), capacity=20),
            GymClass(name="Pilates", trainer="Emma Davis", training="Core", 
                    datetime=datetime(2024, 12, 20, 17, 0), capacity=20),
            GymClass(name="Spinning", trainer="Alex Martinez", training="Cardio", 
                    datetime=datetime(2024, 12, 22, 8, 0), capacity=20),
        ]
        for cls in demo_classes:
            db.add(cls)
        db.commit()
    db.close()

# Include routers with /api prefix
app.include_router(user.router, prefix="/api")
app.include_router(classes.router, prefix="/api")
app.include_router(bookings.router, prefix="/api")
