from fastapi import APIRouter, HTTPException, status
from ..models.product import Product
from ..utils.db import products_collection
from bson import ObjectId
from typing import List

router = APIRouter(prefix="/products", tags=["products"])

@router.get("/", response_model=List[Product])
async def get_products():
    products = await products_collection.find().to_list(length=100)
    for product in products:
        product["id"] = str(product["_id"])
    return products

@router.get("/{product_id}", response_model=Product)
async def get_product(product_id: str):
    # Try to find by string ID first
    product = await products_collection.find_one({"name": product_id.replace("-", " ")})
    
    if not product:
        try:
            # Try to find by ObjectId
            product = await products_collection.find_one({"_id": ObjectId(product_id)})
        except:
            pass
    
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Product '{product_id}' not found"
        )
    
    product["id"] = str(product["_id"])
    return product
