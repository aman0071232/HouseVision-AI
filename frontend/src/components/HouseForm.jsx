import { useState } from "react";
import api from "../services/api";
import PredictionCard from "./PredictionCard";

const neighborhoods = [
  "Blmngtn",
  "Blueste",
  "BrDale",
  "BrkSide",
  "ClearCr",
  "CollgCr",
  "Crawfor",
  "Edwards",
  "Gilbert",
  "IDOTRR",
  "MeadowV",
  "Mitchel",
  "NAmes",
  "NoRidge",
  "NPkVill",
  "NridgHt",
  "NWAmes",
  "OldTown",
  "SWISU",
  "Sawyer",
  "SawyerW",
  "Somerst",
  "StoneBr",
  "Timber",
  "Veenker",
];

const kitchenQualities = [
  { value: "Ex", label: "Excellent" },
  { value: "Gd", label: "Good" },
  { value: "TA", label: "Typical" },
  { value: "Fa", label: "Fair" },
  { value: "Po", label: "Poor" },
];

export default function HouseForm() {
  const [formData, setFormData] = useState({
    OverallQual: 5,
    LotArea: 10000,
    GrLivArea: 2000,
    GarageCars: 2,
    GarageArea: 500,
    BedroomAbvGr: 3,
    FullBath: 2,
    YearBuilt: 2005,
    KitchenQual: "TA",
    Neighborhood: "NAmes",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" || type === "range" ? Number(value) : value,
    }));
  };

  const validate = () => {
    const rules = {
      LotArea: [1300, 215245],
      GrLivArea: [334, 5642],
      GarageArea: [0, 1418],
      GarageCars: [0, 4],
      BedroomAbvGr: [0, 8],
      FullBath: [0, 3],
      YearBuilt: [1872, 2010],
      OverallQual: [1, 10],
    };
    for (const [k, [min, max]] of Object.entries(rules)) {
      if (formData[k] < min || formData[k] > max) {
        alert(`${k} must be between ${min} and ${max}`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await api.post("/predict", formData);
      setPrediction(res.data.predicted_price);
    } catch (err) {
      console.error(err);
      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 outline-none";

  return (
    <div className="grid lg:grid-cols-2 gap-8 mt-12">
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
        <h2 className="text-3xl font-bold mb-6">Property Details</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label>Overall Quality ({formData.OverallQual}/10)</label>
            <input
              type="range"
              name="OverallQual"
              min="1"
              max="10"
              value={formData.OverallQual}
              onChange={handleChange}
              className="w-full accent-cyan-400"
            />
          </div>

          <div>
            <label>Lot Area (1300-215245)</label>
            <input
              className={inputClass}
              type="number"
              name="LotArea"
              min="1300"
              max="215245"
              value={formData.LotArea}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Living Area (334-5642)</label>
            <input
              className={inputClass}
              type="number"
              name="GrLivArea"
              min="334"
              max="5642"
              value={formData.GrLivArea}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Garage Cars</label>
              <input
                className={inputClass}
                type="number"
                name="GarageCars"
                min="0"
                max="4"
                value={formData.GarageCars}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Garage Area</label>
              <input
                className={inputClass}
                type="number"
                name="GarageArea"
                min="0"
                max="1418"
                value={formData.GarageArea}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Bedrooms</label>
              <input
                className={inputClass}
                type="number"
                name="BedroomAbvGr"
                min="0"
                max="8"
                value={formData.BedroomAbvGr}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Bathrooms</label>
              <input
                className={inputClass}
                type="number"
                name="FullBath"
                min="0"
                max="3"
                value={formData.FullBath}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label>Kitchen Quality</label>
            <select
              className={inputClass}
              name="KitchenQual"
              value={formData.KitchenQual}
              onChange={handleChange}
            >
              {kitchenQualities.map((k) => (
                <option key={k.value} value={k.value}>
                  {k.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Neighborhood</label>
            <select
              className={inputClass}
              name="Neighborhood"
              value={formData.Neighborhood}
              onChange={handleChange}
            >
              {neighborhoods.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Year Built</label>
            <input
              className={inputClass}
              type="number"
              name="YearBuilt"
              min="1872"
              max="2010"
              value={formData.YearBuilt}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-60 rounded-xl py-4 font-bold"
          >
            {loading ? "Predicting..." : "Predict Price"}
          </button>
        </form>
      </div>

    <PredictionCard
    prediction={prediction}
    loading={loading}
    formData={formData}
/>
    </div>
  );
}
