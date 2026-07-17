import pandas as pd

# Load the original training dataset
df = pd.read_csv("../data/train (1).csv")

# Drop columns you removed during training
drop_cols = ["PoolQC", "MiscFeature", "Alley", "Fence", "Id"]
df = df.drop(columns=drop_cols)

# Fill missing values exactly as you did in training
df["LotFrontage"] = df["LotFrontage"].fillna(df["LotFrontage"].median())
df["GarageYrBlt"] = df["GarageYrBlt"].fillna(df["GarageYrBlt"].median())
df["MasVnrArea"] = df["MasVnrArea"].fillna(df["MasVnrArea"].median())
df["Electrical"] = df["Electrical"].fillna(df["Electrical"].mode()[0])

cat_none = [
    "FireplaceQu",
    "GarageType",
    "GarageFinish",
    "GarageQual",
    "GarageCond",
    "BsmtQual",
    "BsmtCond",
    "BsmtExposure",
    "BsmtFinType1",
    "BsmtFinType2",
    "MasVnrType"
]

for col in cat_none:
    df[col] = df[col].fillna("None")

# Remove target column
df = df.drop(columns=["SalePrice"])

from pandas.api.types import is_numeric_dtype

defaults = {}

for col in df.columns:
    if is_numeric_dtype(df[col]):
        defaults[col] = float(df[col].median())
    else:
        defaults[col] = str(df[col].mode()[0])

# Save defaults.py
with open("defaults.py", "w") as f:
    f.write("DEFAULT_INPUT = ")
    f.write(repr(defaults))

print("defaults.py created successfully!")