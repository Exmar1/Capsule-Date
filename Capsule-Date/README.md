# Capsule-Date

Capsule-Date — это веб-приложение для создания и хранения писем в будущее. Пользователь может написать послание, указать дату открытия и получить доступ к нему только после наступления выбранного времени.

Проект реализован как full-stack приложение с авторизацией, архивом капсул и адаптивным пользовательским интерфейсом.

---

## Возможности

- Регистрация и авторизация пользователей
- Создание капсул с датой открытия
- Отправка Email на почту с уведомлением, что капсула открыта
- Проверка даты (доступны только будущие даты)
- Архив капсул:
  - закрытые капсулы (до даты открытия)
  - открытые капсулы (после даты открытия)
- Удаление открытых капсул
- JWT-аутентификация
- Адаптивная верстка для мобильных устройств

---

## Превью проекта
![Страница архивов](Capsule-Date-frontend/Digital-Time-Capsule/src/assets/demo.png)

## Технологический стек

### Frontend
- React
- React Router
- Axios
- Tailwind CSS

### Backend
- FastAPI
- SQLAlchemy
- Alembic
- PostgreSQL
- JWT (OAuth2)

---

## Установка и запуск

### Backend
1.Создать виртуальное окружение:
```
python -m venv venv
source venv/bin/activate
```
2.Установить зависимости:
```
pip install -r requirements.txt
```
3.Создать базу данных PostgreSQL:
```
CREATE DATABASE timecapsule;
```
4.Создать файл .env:
```
DATABASE_URL=postgresql+psycopg2://user:password@localhost:5432/timecapsule
SECRET_KEY=your_secret_key
```
5.Применить миграции:
```
alembic upgrade head
```
6.Запустить сервер:
```
uvicorn src.main:app --reload
```
---

### Frontend
1.Установить зависимости:
```
npm install
```
2.Запустить проект:
```
npm run dev
```
---

## Статус проекта

Проект завершён и может использоваться как портфолио-работа.

# Автор

Exmar — Fullstack Developer

Telegram: @Exmar1
