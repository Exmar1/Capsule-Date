import os
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from dotenv import load_dotenv
from pydantic import EmailStr
from src.config import settings

load_dotenv()

conf = ConnectionConfig(
    MAIL_USERNAME = settings.MAIL_USERNAME,
    MAIL_PASSWORD = settings.MAIL_PASSWORD, 
    MAIL_FROM = settings.MAIL_FROM,
    MAIL_PORT = settings.MAIL_PORT,
    MAIL_SERVER = settings.MAIL_SERVER,
    MAIL_STARTTLS = settings.MAIL_STARTTLS,
    MAIL_SSL_TLS = settings.MAIL_SSL_TLS,
    USE_CREDENTIALS = settings.USE_CREDENTIALS,
    VALIDATE_CERTS = settings.VALIDATE_CERTS
)

async def send_notification_email(email_to: EmailStr, title: str, link: str):
  
    html = f"""
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f9;">
        <div style="max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h1 style="color: #4f46e5;">Время пришло!</h1>
            <p style="font-size: 16px; color: #333;">
                Привет! Твоя капсула времени <b>"{title}"</b> только что открылась.
            </p>
            <p style="font-size: 16px; color: #555;">
                Ты написал это послание в прошлом, и теперь оно доступно для чтения.
            </p>
            <div style="text-align: center; margin-top: 30px;">
                <a href="{link}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                    Прочитать капсулу
                </a>
            </div>
        </div>
    </div>
    """

    message = MessageSchema(
        subject="Ваша цифровая капсула открылась!",
        recipients=[email_to],
        body=html,
        subtype=MessageType.html
    )

    fm = FastMail(conf)
    await fm.send_message(message)