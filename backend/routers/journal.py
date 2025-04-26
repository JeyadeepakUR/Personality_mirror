from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import JournalEntry
from schemas import JournalEntryCreate, JournalEntryOut
from utils.emotions import detect_emotion

# 🛑 THIS is what was missing
router = APIRouter(
    prefix="/journal",
    tags=["Journal"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=JournalEntryOut)
def create_entry(entry: JournalEntryCreate, db: Session = Depends(get_db)):
    detected_emotion = detect_emotion(entry.content)
    db_entry = JournalEntry(content=entry.content, emotion=detected_emotion)
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry

@router.get("/", response_model=list[JournalEntryOut])
def get_entries(db: Session = Depends(get_db)):
    return db.query(JournalEntry).order_by(JournalEntry.timestamp.desc()).all()
