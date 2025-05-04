from motor.motor_asyncio import AsyncIOMotorClient
from ..config import settings

client = AsyncIOMotorClient(settings.mongodb_url)
database = client.tesla_clone

users_collection = database.users
products_collection = database.products
orders_collection = database.orders

def get_db():
    return database
