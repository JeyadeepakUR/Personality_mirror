from pydantic import BaseModel
from datetime import datetime

# Input schema
class JournalEntryCreate(BaseModel):
    content: str

# Output schema remains the same
class JournalEntryOut(BaseModel):
    id: int
    content: str
    emotion: str
    timestamp: datetime
    class Config:
        orm_mode = True

