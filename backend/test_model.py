import joblib

saved = joblib.load("../models/house_price_pipeline.pkl")
pipeline = saved["model"]

print("Total Features:", len(pipeline.feature_names_in_))

for feature in pipeline.feature_names_in_:
    print(feature)