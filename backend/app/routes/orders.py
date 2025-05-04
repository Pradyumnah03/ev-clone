from fastapi import APIRouter, Depends, HTTPException, status
from ..models.order import OrderCreate, Order
from ..utils.auth import get_current_user
from ..utils.db import orders_collection
from ..models.user import User
from datetime import datetime
import uuid

router = APIRouter(prefix="/orders", tags=["orders"])

@router.post("/", response_model=Order)
async def create_order(order: OrderCreate, current_user: User = Depends(get_current_user)):
    order_id = str(uuid.uuid4())
    order_data = order.dict()
    order_data["id"] = order_id
    order_data["created_at"] = datetime.utcnow()
    
    await orders_collection.insert_one(order_data)
    
    return order_data

@router.get("/", response_model=list[Order])
async def get_user_orders(current_user: User = Depends(get_current_user)):
    orders = await orders_collection.find({"user_id": current_user.id}).to_list(length=100)
    return orders
