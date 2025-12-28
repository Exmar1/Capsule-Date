from fastapi import APIRouter, FastAPI
from datetime import timedelta
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from src.tokens.schemas import Token
from typing import Annotated
from src.users.auth import authenticate_user, get_db, create_access_token, get_password_hash, verify_password
from sqlalchemy.orm import Session
from src.config import settings
from src.users.schemas import RegisterUser, UserInDB
from src.users.dao import UsersDAO

router = APIRouter(
	prefix="/auth",
  tags=["Auth & Register"]
)

@router.post("/register")
async def register_user(user: RegisterUser):
        existing_user = await UsersDAO.find_one_or_none(email=user.email)
        if existing_user:
            raise HTTPException(status_code=409, detail="Такой пользователь уже существует!")
        hashed_password = get_password_hash(user.password)
        await UsersDAO.add_user(email=user.email, hashed_password=hashed_password, username=user.username)
        return {"message": "Пользователь создан"}

@router.post("/login")
async def login_for_access_token(
    login_data: RegisterUser,
    db: Session = Depends(get_db)
):
    user = await authenticate_user(db, login_data.username, login_data.password)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Некорректные имя или пароль",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username},    
        expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")