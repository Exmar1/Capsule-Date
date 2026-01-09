from datetime import datetime
from pydantic import BaseModel

class CapsulePreview(BaseModel):
	id: int
	owner_id: int
	title: str
	content: str
	unlock_at: datetime
	created_at: datetime
	notify_email: bool
	is_email_set: bool

	class Config:
		 from_attributes = True

class CapsuleDetail(CapsulePreview):
	content: str