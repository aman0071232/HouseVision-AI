from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    raise ValueError("❌ MONGO_URI not found in environment variables")

client = MongoClient(MONGO_URI)

db = client["house_prediction_db"]

users = db["users"]
predictions = db["predictions"]

print("✅ MongoDB Connected Successfully")