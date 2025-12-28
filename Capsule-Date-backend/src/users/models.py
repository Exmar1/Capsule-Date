from datetime import datetime
from pydantic import Field
from sqlalchemy import Column, Integer, String, Boolean, TIMESTAMP, func
from src.database import Base

class Users(Base):
	__tablename__ = 'users'

	id = Column(Integer, primary_key=True)
	username = Column(String, nullable=False)
	email = Column(String, nullable=False)
	hashed_password = Column(String, nullable=False)
	is_active = Column(Boolean, nullable=True)
	created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())