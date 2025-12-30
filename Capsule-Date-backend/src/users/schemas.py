from pydantic import BaseModel, EmailStr

class SUser(BaseModel):
	username: str
	email: EmailStr

class UserInDB(SUser):
	hashed_password: str

class RegisterUser(BaseModel):
	username: str
	email: EmailStr
	password: str

class ReadUsers(BaseModel):
	username: str
	email: EmailStr
	password: str
	is_active: bool