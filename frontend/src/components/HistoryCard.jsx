import {
  FaHome,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCar,
  FaBed,
  FaEye,
  FaTrash
} from "react-icons/fa";

function HistoryCard({ item, onView, onDelete }) {

  const quality = item.input.OverallQual || 0;

  return (

    <div className="bg-slate-900 rounded-3xl border border-slate-800 hover:border-cyan-400 transition-all duration-300 p-8 shadow-lg hover:shadow-cyan-500/10">

      {/* Header */}

      {/* ================= HEADER ================= */}

<div className="flex justify-between items-start">

    {/* Left */}

    <div>

        <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-xl bg-cyan-500 flex justify-center items-center">

                <FaHome className="text-white text-lg"/>

            </div>

            <div>

                <h2 className="text-2xl font-bold">

                    HouseVision AI

                </h2>

                <p className="text-slate-400 text-sm">

                    AI Property Prediction

                </p>

            </div>

        </div>

        {/* Location */}

        <div className="mt-5 flex items-center gap-3">

            <span className="bg-cyan-500/10 text-cyan-300 px-3 py-1 rounded-full text-sm">

                📍 {item.input.Neighborhood}

            </span>

            <span className="bg-green-500/10 text-green-300 px-3 py-1 rounded-full text-sm">

                🟢 Completed

            </span>

        </div>

    </div>

    {/* Price */}

    <div className="text-right">

        <p className="text-slate-400 text-sm">

            Estimated Price

        </p>

        <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent mt-2">

            ₹ {Number(item.predicted_price).toLocaleString(undefined,{
                maximumFractionDigits:0
            })}

        </h1>

    </div>

</div>

      {/* Divider */}

<div className="border-b border-slate-800 my-6"></div>
      {/* Details */}

<div className="grid grid-cols-2 gap-8 items-start">
        <div>

          <p className="mb-4">

            ⭐ Overall Quality

          </p>
          

          <div className="flex gap-1 text-yellow-400 text-xl">

            {[...Array(10)].map((_,i)=>(

              <span key={i}>

                {i < quality ? "★" : "☆"}

              </span>

            ))}

          </div>

        </div>

        <div className="space-y-3">

          <div className="flex items-center gap-3">

            <FaMapMarkerAlt className="text-cyan-400"/>

            {item.input.Neighborhood}

          </div>

          <div className="flex items-center gap-3">

            <FaCalendarAlt className="text-cyan-400"/>

            {item.input.YearBuilt}

          </div>

          <div className="flex items-center gap-3">

            <FaCar className="text-cyan-400"/>

            {item.input.GarageCars} Cars

          </div>

          <div className="flex items-center gap-3">

            <FaBed className="text-cyan-400"/>

            {item.input.BedroomAbvGr} Bedrooms

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="flex justify-end gap-4 mt-8">

        <button
    onClick={() => onView(item)}
    className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition flex items-center gap-2"
>
    <FaEye />
    View
</button>

        <button
    onClick={() => onDelete(item._id)}
    className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition flex items-center gap-2"
>
          <FaTrash />

          Delete

        </button>

      </div>

    </div>

  );

}

export default HistoryCard;