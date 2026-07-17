import {
  FaTimes,
  FaHome,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCar,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaUtensils,
  FaStar,
} from "react-icons/fa";

function ViewPredictionModal({ prediction, onClose }) {
  if (!prediction) return null;

  const input = prediction.input;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-[95%] max-w-3xl p-8 relative shadow-2xl">

        {/* Close Button */}

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white transition"
        >
          <FaTimes size={24} />
        </button>

        {/* Header */}

        <div className="flex items-center gap-4 mb-8">

          <div className="bg-cyan-500 p-4 rounded-2xl">

            <FaHome className="text-white text-2xl" />

          </div>

          <div>

            <h2 className="text-4xl font-bold">

              House Prediction

            </h2>

            <p className="text-gray-400">

              {new Date(prediction.created_at).toLocaleString()}

            </p>

          </div>

        </div>

        {/* Price */}

        <div className="text-center mb-10">

          <p className="text-gray-400 text-lg">

            Estimated Price

          </p>

          <h1 className="text-6xl font-black text-cyan-400 mt-3">

            ₹ {Number(prediction.predicted_price).toLocaleString(undefined,{
              maximumFractionDigits:0
            })}

          </h1>

        </div>

        {/* Property Details */}

        <div className="grid md:grid-cols-2 gap-6">

          <div className="flex items-center gap-3">
            <FaStar className="text-yellow-400"/>
            Overall Quality : {input.OverallQual}
          </div>

          <div className="flex items-center gap-3">
            <FaRulerCombined className="text-cyan-400"/>
            Living Area : {input.GrLivArea} sqft
          </div>

          <div className="flex items-center gap-3">
            <FaCar className="text-cyan-400"/>
            Garage : {input.GarageCars} Cars
          </div>

          <div className="flex items-center gap-3">
            <FaBed className="text-cyan-400"/>
            Bedrooms : {input.BedroomAbvGr}
          </div>

          <div className="flex items-center gap-3">
            <FaBath className="text-cyan-400"/>
            Bathrooms : {input.FullBath}
          </div>

          <div className="flex items-center gap-3">
            <FaUtensils className="text-cyan-400"/>
            Kitchen : {input.KitchenQual}
          </div>

          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-cyan-400"/>
            {input.Neighborhood}
          </div>

          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-cyan-400"/>
            Built in {input.YearBuilt}
          </div>

        </div>

        {/* Model */}

        <div className="mt-10 border-t border-slate-700 pt-8">

          <h3 className="text-2xl font-bold mb-4">

            AI Model

          </h3>

          <div className="flex justify-between">

            <span>XGBoost</span>

            <span className="text-green-400">

              Accuracy : 90.96%

            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ViewPredictionModal;