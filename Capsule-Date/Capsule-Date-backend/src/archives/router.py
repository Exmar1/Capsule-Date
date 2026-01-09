from datetime import datetime
from fastapi import HTTPException 
from typing import Annotated, List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.users.auth import get_db, get_current_user
from src.users.models import Users
from src.capsule.models import Capsules
from src.archives.shemas import CapsulePreview, CapsuleDetail
from sqlalchemy import select
import pytz 

router = APIRouter(
	prefix='/archives',
	tags=["Archives Logic"]
)

@router.get('/capsules/', response_model=List[CapsulePreview])
async def get_capsules(

    current_user: Annotated[Users, Depends(get_current_user)],
	db: Session = Depends(get_db)
):
	
	stmt = select(Capsules).where(Capsules.owner_id == current_user.id)
	result = await db.execute(stmt)
	capsules = result.scalars().all()
	
	return capsules 
	
@router.get("/capsules/{id}", response_model=CapsuleDetail)
async def get_current_capsules(
	id: int, 
	current_user: Annotated[Users, Depends(get_current_user)],
	db: Session = Depends(get_db),
):
	stmt = select(Capsules).where(Capsules.id == id)
	result = await db.execute(stmt)
	current_capsules = result.scalar_one_or_none()

	now_utc = datetime.utcnow().replace(tzinfo=pytz.utc)

	if not current_capsules:
			raise HTTPException(status_code=404, detail="Капсула не найдена")

	if current_capsules.owner_id != current_user.id:
		raise HTTPException(status_code=403, detail="У вас нет доступа к этой капсуле")

	if now_utc < current_capsules.unlock_at:
		raise HTTPException(status_code=403, detail="Время открытия ещё не пришло")
	
	return current_capsules