import asyncio
from datetime import datetime
from sqlalchemy import select
from src.database import async_session_maker 
from src.capsule.models import Capsules
from src.users.models import Users
from src.emails.email_utils import send_notification_email

async def check_and_send_emails():
    print(f"[{datetime.now()}] Проверка капсул...")

    async with async_session_maker() as db:
        try:
            now = datetime.utcnow()
            

            stmt = select(Capsules, Users.email).join(Users).where(
                Capsules.unlock_at <= now,
                Capsules.notify_email == True,
                Capsules.is_email_set == False
            )
            
            
            result = await db.execute(stmt)
            rows = result.all() 
            
            if not rows:
                return

            print(f"  ->  Найдено {len(rows)} капсул для отправки!")

            for row in rows:
                capsule = row.Capsules
                user_email = row.email
                
                capsule_link = f"http://localhost:5173/capsules/{capsule.id}"
                
                try:

                    await send_notification_email(
                        email_to=user_email,
                        title=capsule.title,
                        link=capsule_link
                    )
                    
                    
                    capsule.is_email_set = True
                    db.add(capsule)
                    
                    
                    await db.commit()
                    
                    print(f"[OK] Отправлено для: {user_email}")
                    
                except Exception as e:
                    print(f"  [ERROR] Не удалось отправить на {user_email}: {e}")
                    
        except Exception as e:
            print(f" Глобальная ошибка планировщика: {e}")
            