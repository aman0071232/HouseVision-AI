from dotenv import load_dotenv
import os
load_dotenv()
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
from datetime import datetime

from defaults import DEFAULT_INPUT
from database import predictions
from bson.objectid import ObjectId

from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    get_jwt_identity
)
from database import users


app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})

app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

bcrypt = Bcrypt(app)
jwt = JWTManager(app)
# ==========================================
# Load Saved Model
# ==========================================

try:
    saved = joblib.load("../models/house_price_pipeline.pkl")
    model = saved["model"]
    print("✅ XGBoost Model Loaded Successfully!")
except Exception as e:
    print("❌ Model Loading Error:", e)
    model = None


# ==========================================
# Home Route
# ==========================================

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "success": True,
        "message": "🏠 House Price Prediction API Running Successfully",
        "model": "XGBoost",
        "database": "MongoDB"
    })



@app.route("/register", methods=["POST"])
def register():

    try:

        data = request.get_json()

        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        # Validation

        if not name or not email or not password:

            return jsonify({
                "success": False,
                "error": "All fields are required."
            }), 400

        # Check existing user

        existing_user = users.find_one({"email": email})

        if existing_user:

            return jsonify({
                "success": False,
                "error": "Email already registered."
            }), 400

        # Hash password

        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

        # Save user

        user = {

            "name": name,

            "email": email,

            "password": hashed_password,

            "created_at": datetime.utcnow()

        }

        users.insert_one(user)

        return jsonify({

            "success": True,

            "message": "User registered successfully."

        })

    except Exception as e:

        return jsonify({

            "success": False,

            "error": str(e)

        }), 500


# ==========================================
# Login Route
# ==========================================

@app.route("/login", methods=["POST"])
def login():

    try:

        data = request.get_json()

        email = data.get("email")
        password = data.get("password")

        if not email or not password:

            return jsonify({

                "success": False,
                "error": "Email and password are required."

            }), 400

        # Find User

        user = users.find_one({

            "email": email

        })

        if not user:

            return jsonify({

                "success": False,
                "error": "Invalid email or password."

            }), 401

        # Check Password

        if not bcrypt.check_password_hash(user["password"], password):

            return jsonify({

                "success": False,
                "error": "Invalid email or password."

            }), 401

        # Create JWT Token

        token = create_access_token(

            identity=str(user["_id"])

        )

        return jsonify({

            "success": True,

            "message": "Login successful.",

            "token": token,

            "user": {

                "id": str(user["_id"]),

                "name": user["name"],

                "email": user["email"]

            }

        })

    except Exception as e:

        return jsonify({

            "success": False,

            "error": str(e)

        }), 500
    


# ==========================================
# Prediction Route
# ==========================================
@app.route("/predict", methods=["POST"])
@jwt_required()
def predict():

    if model is None:
        return jsonify({
            "success": False,
            "error": "Model not loaded."
        }), 500

    try:
        user_id = get_jwt_identity()
        # -----------------------------
        # Receive user data
        # -----------------------------
        user_data = request.get_json()

        if not user_data:
            return jsonify({
                "success": False,
                "error": "No JSON data received."
            }), 400

        # -----------------------------
        # Merge with default values
        # -----------------------------
        input_data = DEFAULT_INPUT.copy()
        input_data.update(user_data)

        # -----------------------------
        # Create DataFrame
        # -----------------------------
        input_df = pd.DataFrame([input_data])

        # Arrange columns exactly like training
        input_df = input_df[model.feature_names_in_]

        # -----------------------------
        # Predict
        # -----------------------------
        log_price = model.predict(input_df)[0]

        predicted_price = np.expm1(log_price)

        # -----------------------------
        # Save to MongoDB
        # -----------------------------
        prediction_document = {

            "userId": user_id,

            "input": user_data,

            "predicted_price": float(predicted_price),

            "predicted_log_price": float(log_price),

            "model": "XGBoost",

            "accuracy": 90.96,

            "created_at": datetime.utcnow()

        }

        predictions.insert_one(prediction_document)

        # -----------------------------
        # Return Response
        # -----------------------------
        return jsonify({

            "success": True,

            "predicted_price": round(float(predicted_price), 2),

            "predicted_log_price": round(float(log_price), 4),

            "model": "XGBoost",

            "saved": True

        })

    except Exception as e:

        return jsonify({

            "success": False,

            "error": str(e)

        }), 500


# ==========================================
# Get Prediction History
# ==========================================

@app.route("/predictions", methods=["GET"])
@jwt_required()
def get_predictions():

    try:

        user_id = get_jwt_identity()
        data = []

        for doc in predictions.find(
            {"userId": user_id}
        ).sort("created_at", -1):
            
            doc["_id"] = str(doc["_id"])

            data.append(doc)

        return jsonify({

            "success": True,

            "count": len(data),

            "predictions": data

        })

    except Exception as e:

        return jsonify({

            "success": False,

            "error": str(e)

        }), 500


# ==========================================
# Delete Prediction
# (We'll use this later)
# ==========================================

@app.route("/predictions/<id>", methods=["DELETE"])
@jwt_required()
def delete_prediction(id):

    try:

        user_id = get_jwt_identity()

        result = predictions.delete_one({

            "_id": ObjectId(id),

            "userId": user_id

        })

        if result.deleted_count == 0:

            return jsonify({

                "success": False,

                "error": "Prediction not found"

            }), 404

        return jsonify({

            "success": True,

            "message": "Prediction deleted successfully"

        })

    except Exception as e:

        return jsonify({

            "success": False,

            "error": str(e)

        }), 500


# ==========================================
# Run Flask
# ==========================================
# ==========================================
# Profile Route
# ==========================================

@app.route("/profile", methods=["GET"])
@jwt_required()
def profile():

    try:

        user_id = get_jwt_identity()

        user = users.find_one({

            "_id": ObjectId(user_id)

        })

        if not user:

            return jsonify({

                "success": False,

                "error": "User not found"

            }),404

        total_predictions = predictions.count_documents({

            "userId": user_id

        })

        highest_prediction = predictions.find_one(

            {"userId": user_id},

            sort=[("predicted_price",-1)]

        )

        lowest_prediction = predictions.find_one(

            {"userId": user_id},

            sort=[("predicted_price",1)]

        )

        pipeline = [

            {

                "$match":{

                    "userId":user_id

                }

            },

            {

                "$group":{

                    "_id":None,

                    "avg":{

                        "$avg":"$predicted_price"

                    }

                }

            }

        ]

        avg = list(

            predictions.aggregate(pipeline)

        )

        average_price = (

            avg[0]["avg"]

            if avg

            else 0

        )

        return jsonify({

            "success":True,

            "user":{

                "name":user["name"],

                "email":user["email"]

            },

            "stats":{

                "total":total_predictions,

                "highest":

                highest_prediction["predicted_price"]

                if highest_prediction else 0,

                "lowest":

                lowest_prediction["predicted_price"]

                if lowest_prediction else 0,

                "average":round(average_price,2)

            }

        })

    except Exception as e:

        return jsonify({

            "success":False,

            "error":str(e)

        }),500


# ==========================================
# Update Profile
# ==========================================

@app.route("/profile", methods=["PUT"])
@jwt_required()
def update_profile():

    try:

        user_id = get_jwt_identity()

        data = request.get_json()

        name = data.get("name")
        email = data.get("email")

        if not name or not email:

            return jsonify({

                "success": False,

                "error": "Name and Email are required"

            }),400

        users.update_one(

            {"_id": ObjectId(user_id)},

            {

                "$set":{

                    "name":name,

                    "email":email

                }

            }

        )

        return jsonify({

            "success":True,

            "message":"Profile Updated"

        })

    except Exception as e:

        return jsonify({

            "success":False,

            "error":str(e)

        }),500
    

    # ==========================================
# Change Password
# ==========================================

@app.route("/change-password", methods=["PUT"])
@jwt_required()
def change_password():

    try:

        user_id = get_jwt_identity()

        data = request.get_json()

        old_password = data.get("oldPassword")

        new_password = data.get("newPassword")

        if not old_password or not new_password:

            return jsonify({

                "success": False,

                "error": "All fields are required."

            }),400

        user = users.find_one({

            "_id": ObjectId(user_id)

        })

        if not bcrypt.check_password_hash(

            user["password"],

            old_password

        ):

            return jsonify({

                "success": False,

                "error": "Old password is incorrect."

            }),400

        hashed = bcrypt.generate_password_hash(

            new_password

        ).decode("utf-8")

        users.update_one(

            {

                "_id": ObjectId(user_id)

            },

            {

                "$set":{

                    "password":hashed

                }

            }

        )

        return jsonify({

            "success": True,

            "message": "Password Changed Successfully"

        })

    except Exception as e:

        return jsonify({

            "success": False,

            "error": str(e)

        }),500
    
if __name__ == "__main__":
    app.run(debug=True)