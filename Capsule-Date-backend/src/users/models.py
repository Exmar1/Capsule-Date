from datetime import datetime
from pydantic import Field
from sqlalchemy import Column, text, Integer, String, Boolean, TIMESTAMP, func
from src.database import Base
from sqlalchemy.orm import  Mapped, mapped_column

class Users(Base):
	__tablename__ = 'users'

	id = Column(Integer, primary_key=True)
	username = Column(String, nullable=False)
	email = Column(String, nullable=False)
	hashed_password = Column(String, nullable=False)
	is_active: Mapped[bool] = mapped_column(default=False, server_default=text("false"))
	created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())