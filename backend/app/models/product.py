from pydantic import BaseModel
from typing import List, Optional, Dict

class ProductVariant(BaseModel):
    name: str
    price: float
    range: Optional[int] = None
    acceleration: Optional[float] = None
    top_speed: Optional[int] = None

class ProductColor(BaseModel):
    name: str
    code: str
    price: float
    image: str

class ProductWheel(BaseModel):
    name: str
    price: float
    image: str

class ProductInterior(BaseModel):
    name: str
    price: float
    image: str

class Product(BaseModel):
    id: str
    name: str
    description: str
    base_price: float
    hero_image: str
    images: List[str]
    variants: List[ProductVariant]
    colors: List[ProductColor]
    wheels: List[ProductWheel]
    interiors: List[ProductInterior]

    class Config:
        orm_mode = True
