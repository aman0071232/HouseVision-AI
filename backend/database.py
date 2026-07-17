from pymongo import MongoClient

MONGO_URI = "mongodb+srv://amanguptanew06112005_db_user:tewyhZpkx2xmBZcz@housepredictioncluster.t1img97.mongodb.net/?appName=HousePredictionCluster"

client = MongoClient(MONGO_URI)

db = client["house_prediction_db"]

users = db["users"]
predictions = db["predictions"]

print("✅ MongoDB Connected Successfully")