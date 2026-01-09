from datetime import datetime

from pydantic import BaseModel


class CapsuleBase(BaseModel):
	title: str
	content: str
	unlock_at: datetime
	notify_email: bool = False

class CapsuleOut(CapsuleBase):
    id: int
    created_at: datetime
    owner_id: int
    is_email_sent: bool

    class Config:
        from_attributes = True