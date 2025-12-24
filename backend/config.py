from pydantic import BaseSettings


class Settings(BaseSettings):
    """Application configuration loaded from environment variables."""

    openai_api_key: str
    openai_model: str = "gpt-4o"
    backend_port: int = 8000

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()


