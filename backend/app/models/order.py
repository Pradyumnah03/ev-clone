from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class OrderCreate(BaseModel):
    user_id: str
    product_id: str
    variant: str
    color: str
    wheel: str
    interior: str
    total_price: float

class Order(OrderCreate):
    id: str
    created_at: datetime

    class Config:
        orm_mode = True
