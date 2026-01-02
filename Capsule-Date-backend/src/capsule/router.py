from typing import Annotated
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.capsule.schemas import CapsuleBase
from src.users.auth import get_db, get_current_user
from src.users.models import Users
from src.capsule.models import Capsules

router = APIRouter(
	prefix='/capsule',
	tags=["Capsule Logic"]
)

@router.post("/create", response_model=CapsuleBase)
async def create_capsule(
	current_user: Annotated[Users, Depends(get_current_user)],
	capsule_base: CapsuleBase,
	db: Session = Depends(get_db),
):
	new_capsule_data = capsule_base.model_dump()
	new_capsule_data["owner_id"] = current_user.id

	db_capsule = Capsules(**new_capsule_data)

	db.add(db_capsule)
	await db.commit()
	return db_capsule
