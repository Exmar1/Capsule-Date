from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from apscheduler.schedulers.asyncio import AsyncIOScheduler


from src.users.router import router as auth_router
from src.capsule.router import router as capsule_router
from src.archives.router import router as archives_router

from src.emails.scheduler import check_and_send_emails

scheduler = AsyncIOScheduler()

@asynccontextmanager
async def lifespan(app: FastAPI):
    print(" Запуск планировщика задач...")
    scheduler.add_job(check_and_send_emails, 'interval', minutes=1)
    scheduler.start()
    
    yield 
    
    print(" Остановка планировщика...")
    scheduler.shutdown()

app = FastAPI(lifespan=lifespan)


origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173", 
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(capsule_router)
app.include_router(archives_router)