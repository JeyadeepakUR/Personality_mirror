from fastapi import FastAPI
from routers import journal
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
import models

app = FastAPI()

# CORS for frontend (React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # restrict in prod!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(journal.router)
Base.metadata.create_all(bind=engine)
