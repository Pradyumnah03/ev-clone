from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import auth, products, orders

app = FastAPI(title="Tesla Clone API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(products.router)
app.include_router(orders.router)

@app.get("/")
async def root():
    return {"message": "Welcome to Tesla Clone API"}

# Add sample data to database
@app.on_event("startup")
async def startup_db_client():
    from .utils.db import products_collection
    
    # Check if products exist
    count = await products_collection.count_documents({})
    
    if count == 0:
        # Add sample product data
        sample_product = {
            "name": "Model S",  # This matches the URL path "model-s"
            "description": "The ultimate electric sedan with unmatched performance and range",
            "base_price": 74990,
            "hero_image": "https://tesla-cdn.thron.com/delivery/public/image/tesla/538ac149-f243-4b33-b55f-69e3a0f60ca5/bvlatuR/std/1200x628/Homepage-Model-S-Desktop-LHD",
            "images": [
                "https://tesla-cdn.thron.com/delivery/public/image/tesla/32e5e0f3-5c04-42ef-8f8f-c6b1c26f8a9e/bvlatuR/std/2880x1800/ms-main-hero-desktop",
                "https://tesla-cdn.thron.com/delivery/public/image/tesla/177c0faf-b5a7-47f7-bc43-8b927048d170/bvlatuR/std/2880x1800/MS-Interior-Hero-Desktop"
            ],
            "variants": [
                {
                    "name": "Model S",
                    "price": 74990,
                    "range": 405,
                    "acceleration": 3.1,
                    "top_speed": 149
                },
                {
                    "name": "Model S Plaid",
                    "price": 89990,
                    "range": 396,
                    "acceleration": 1.99,
                    "top_speed": 200
                }
            ],
            "colors": [
                {
                    "name": "Pearl White Multi-Coat",
                    "code": "#f2f5f5",
                    "price": 0,
                    "image": "https://static-assets.tesla.com/configurator/compositor?&options=$MTS13,$PPSW,$WS90,$IBE00&view=FRONT34&model=ms&size=1920&bkba_opt=1&crop=0,0,0,0&version=v0028d202204140458"
                },
                {
                    "name": "Solid Black",
                    "code": "#000000",
                    "price": 1500,
                    "image": "https://static-assets.tesla.com/configurator/compositor?&options=$MTS13,$PBSB,$WS90,$IBE00&view=FRONT34&model=ms&size=1920&bkba_opt=1&crop=0,0,0,0&version=v0028d202204140458"
                },
                {
                    "name": "Deep Blue Metallic",
                    "code": "#0c3d6a",
                    "price": 1500,
                    "image": "https://static-assets.tesla.com/configurator/compositor?&options=$MTS13,$PPSB,$WS90,$IBE00&view=FRONT34&model=ms&size=1920&bkba_opt=1&crop=0,0,0,0&version=v0028d202204140458"
                },
                {
                    "name": "Ultra Red",
                    "code": "#8c0013",
                    "price": 3000,
                    "image": "https://static-assets.tesla.com/configurator/compositor?&options=$MTS13,$PR01,$WS90,$IBE00&view=FRONT34&model=ms&size=1920&bkba_opt=1&crop=0,0,0,0&version=v0028d202204140458"
                }
            ],
            "wheels": [
                {
                    "name": "19\" Tempest Wheels",
                    "price": 0,
                    "image": "https://static-assets.tesla.com/configurator/compositor?&options=$MTS13,$PPSW,$WS90,$IBE00&view=FRONT34&model=ms&size=1920&bkba_opt=1&crop=0,0,0,0&version=v0028d202204140458"
                },
                {
                    "name": "21\" Arachnid Wheels",
                    "price": 4500,
                    "image": "https://static-assets.tesla.com/configurator/compositor?&options=$MTS13,$PPSW,$WS10,$IBE00&view=FRONT34&model=ms&size=1920&bkba_opt=1&crop=0,0,0,0&version=v0028d202204140458"
                }
            ],
            "interiors": [
                {
                    "name": "All Black",
                    "price": 0,
                    "image": "https://static-assets.tesla.com/configurator/compositor?&options=$MTS13,$PPSW,$WS90,$IBE00&view=STUD_SEAT&model=ms&size=1920&bkba_opt=1&crop=0,0,0,0&version=v0028d202204140458"
                },
                {
                    "name": "Black and White",
                    "price": 2000,
                    "image": "https://static-assets.tesla.com/configurator/compositor?&options=$MTS13,$PPSW,$WS90,$IBW00&view=STUD_SEAT&model=ms&size=1920&bkba_opt=1&crop=0,0,0,0&version=v0028d202204140458"
                },
                {
                    "name": "Cream",
                    "price": 2000,
                    "image": "https://static-assets.tesla.com/configurator/compositor?&options=$MTS13,$PPSW,$WS90,$ICW00&view=STUD_SEAT&model=ms&size=1920&bkba_opt=1&crop=0,0,0,0&version=v0028d202204140458"
                }
            ]
        }
        
        await products_collection.insert_one(sample_product)
