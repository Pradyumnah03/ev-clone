from pydantic import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    app_name: str = "Tesla Clone API"
    mongodb_url: str
    secret_key: str
    algorithm: str
    access_token_expire_minutes: int = 30

    class Config:
        env_file = ".env"

settings = Settings()
