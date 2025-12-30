from typing import Annotated
from fastapi import APIRouter
from datetime import timedelta
from fastapi import Depends, HTTPException
from sqlalchemy import select
from src.tokens.schemas import Token
from src.users.auth import authenticate_user, get_db, create_access_token, get_password_hash, get_current_active_user
from sqlalchemy.orm import Session
from src.config import settings
from src.users.schemas import RegisterUser, ReadUsers
from src.users.dao import UsersDAO
from src.users.models import Users

router = APIRouter(
  prefix="/auth",
  tags=["Auth & Register"]
)

@router.post("/register")
async def register_user(
    user: RegisterUser, 
    db: Session = Depends(get_db)
):
    existing_user = await UsersDAO.find_one_or_none(email=user.email)
    if existing_user:
        raise HTTPException(status_code=409, detail="Такой пользователь уже существует!")

    hashed_password = get_password_hash(user.password)
    await UsersDAO.add_user(email=user.email, hashed_password=hashed_password, username=user.username)

    stmt = select(Users).where(Users.email == user.email)
    result = await db.execute(stmt)
    user_list = result.scalars().first()

    user_list.is_active = True
    await db.commit()
    await db.refresh(user_list)

    return {"message": "Пользователь создан"}

@router.post("/login")
async def login_for_access_token(
    login_data: RegisterUser,
    db: Session = Depends(get_db),
):
    stmt = select(Users).where(Users.email == login_data.email)
    result = await db.execute(stmt)
    users_list = result.scalars().first()

    user = await authenticate_user(db, login_data.username, login_data.password)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Некорректные имя или пароль",
            headers={"WWW-Authenticate": "Bearer"},
        ) 
    users_list.is_active = True
    db.add(users_list)
    await db.commit()   
    await db.refresh(users_list)

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username},    
        expires_delta=access_token_expires
    )
    
    return Token(access_token=access_token, token_type="bearer")      


@router.get("/auth/me/", response_model=ReadUsers)
async def read_users_me(
    current_user: Annotated[Users, Depends(get_current_active_user)],
):
    return current_user