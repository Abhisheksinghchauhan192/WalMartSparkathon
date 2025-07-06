import json
import random
from faker import Faker

fake = Faker()

# Predefined categories and subcategories
categories = {
    "Beverage": ["Bottle", "Can", "Carton"],
    "Food": ["Snack", "Fruit", "Vegetable", "Packaged"],
    "Home": ["Cleaner", "Lamp", "Towel"],
    "Electronics": ["Phone", "Charger", "Battery"],
    "Fashion": ["T-Shirt", "Shoes", "Bag"],
    "Stationery": ["Notebook", "Pen", "Eraser"]
}

# Sample image URLs for dummy usage
sample_images = [
    "https://via.placeholder.com/150?text=Eco+Product+1",
    "https://via.placeholder.com/150?text=Eco+Product+2",
    "https://via.placeholder.com/150?text=Eco+Product+3",
    "https://via.placeholder.com/150?text=Eco+Product+4",
    "https://via.placeholder.com/150?text=Eco+Product+5"
]

# Generate 50 products
products = []

for _ in range(50):
    category = random.choice(list(categories.keys()))
    sub_category = random.choice(categories[category])
    carbon_footprint = round(random.uniform(50, 500), 2)  # grams CO2e
    price = round(random.uniform(10, 500), 2)

    product = {
        "name": fake.catch_phrase(),
        "imgUrl": random.choice(sample_images),
        "product_category": category,
        "product_sub_category": sub_category,
        "product_carbon_footprint": carbon_footprint,
        "price": price,
        "description": fake.text(max_nb_chars=150)
    }

    products.append(product)

with open("./randomProductData.txt","w") as f:
        json.dump(products,f,indent=2)