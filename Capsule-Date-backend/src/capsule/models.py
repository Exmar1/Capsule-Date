from sqlalchemy import Column, Integer, String, Boolean, TIMESTAMP, ForeignKey, Text, func
from sqlalchemy.orm import relationship, Mapped, mapped_column
from src.database import Base
from src.users.models import Users

class Capsules(Base):
	__tablename__ = 'capsules'

	id = Column(Integer, primary_key=True, index=True)
	owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
	title = Column(String, nullable=False)
	content = Column(Text, nullable=False)
	unlock_at = Column(TIMESTAMP(timezone=True), nullable=False)
	created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
	notify_email = Column(Boolean, default=False)
	is_email_set = Column(Boolean, default=False)

	owner = relationship("Users", back_populates="capsules")
	