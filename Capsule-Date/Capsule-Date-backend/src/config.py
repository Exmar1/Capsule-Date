from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import computed_field

class Settings(BaseSettings):
	DB_HOST: str
	DB_PORT: int
	DB_USER: str
	DB_PASS: str
	DB_NAME: str
	SECRET_KEY: str
	ALGORITHM: str
	ACCESS_TOKEN_EXPIRE_MINUTES: int
	MAIL_USERNAME: str
	MAIL_PASSWORD: str
	MAIL_FROM: str
	MAIL_PORT: int
	MAIL_SERVER: str
	MAIL_STARTTLS: bool
	MAIL_SSL_TLS: bool
	USE_CREDENTIALS: bool
	VALIDATE_CERTS: bool

	model_config = SettingsConfigDict(env_file=".env")

	@computed_field
	@property
	def DATABASE_URL(self) -> str:
		return (
			f"postgresql+asyncpg://{self.DB_USER}:"
			f"{self.DB_PASS}@{self.DB_HOST}:"
			f"{self.DB_PORT}/{self.DB_NAME}"
			
		)
	
	@computed_field
	@property
	def DATABASE_URL_SYNC(self) -> str:
		"""Sync URL для Alembic (psycopg2)"""
		return (
			f"postgresql+psycopg2://{self.DB_USER}:"
			f"{self.DB_PASS}@{self.DB_HOST}:"
			f"{self.DB_PORT}/{self.DB_NAME}"
		)

settings = Settings()