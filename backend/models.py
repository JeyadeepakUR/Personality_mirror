from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from database import Base

class JournalEntry(Base):
    __tablename__ = "journal_entries"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String)
    emotion = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)