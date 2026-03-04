from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class Booking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    service: str
    date: str
    time: str
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = Field(default="pending")

class BookingCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    service: str
    date: str
    time: str
    notes: Optional[str] = None

class Service(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str
    name: str
    description: str
    price: str
    duration: str
    icon: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Urban Cuts API"}

@api_router.get("/services", response_model=List[Service])
async def get_services():
    services = [
        {
            "id": "1",
            "name": "FADE STREET",
            "description": "Corte degradê moderno com finalização detalhada. Estilo urbano e clean.",
            "price": "R$ 60",
            "duration": "45 min",
            "icon": "scissors"
        },
        {
            "id": "2",
            "name": "BARBA KING",
            "description": "Barba alinhada com navalha quente e hidratação profunda.",
            "price": "R$ 40",
            "duration": "30 min",
            "icon": "razor"
        },
        {
            "id": "3",
            "name": "COMBO VIP",
            "description": "Corte + Barba + Sobrancelha. Transformação completa.",
            "price": "R$ 85",
            "duration": "90 min",
            "icon": "crown"
        },
        {
            "id": "4",
            "name": "PLATINADO",
            "description": "Descoloração profissional + tonalização. Estilo único.",
            "price": "R$ 120",
            "duration": "120 min",
            "icon": "star"
        },
        {
            "id": "5",
            "name": "RISCOS & ART",
            "description": "Desenhos personalizados e riscos criativos no cabelo.",
            "price": "R$ 30",
            "duration": "20 min",
            "icon": "pen"
        },
        {
            "id": "6",
            "name": "KIDS STYLE",
            "description": "Corte especial para a garotada com muita paciência e estilo.",
            "price": "R$ 45",
            "duration": "30 min",
            "icon": "child"
        }
    ]
    return services

@api_router.post("/bookings", response_model=Booking)
async def create_booking(booking_data: BookingCreate):
    booking_dict = booking_data.model_dump()
    booking_obj = Booking(**booking_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = booking_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    _ = await db.bookings.insert_one(doc)
    return booking_obj

@api_router.get("/bookings", response_model=List[Booking])
async def get_bookings():
    bookings = await db.bookings.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for booking in bookings:
        if isinstance(booking['created_at'], str):
            booking['created_at'] = datetime.fromisoformat(booking['created_at'])
    
    return bookings

@api_router.get("/bookings/{booking_id}", response_model=Booking)
async def get_booking(booking_id: str):
    booking = await db.bookings.find_one({"id": booking_id}, {"_id": 0})
    
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    if isinstance(booking['created_at'], str):
        booking['created_at'] = datetime.fromisoformat(booking['created_at'])
    
    return booking

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()