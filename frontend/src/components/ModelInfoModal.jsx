import { FaTimes, FaBrain, FaDatabase, FaChartLine } from "react-icons/fa";

function ModelInfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-[700px] max-w-[95%] p-8 relative">

        {/* Close */}

        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white"
        >
          <FaTimes size={22} />
        </button>

        <h1 className="text-4xl font-black text-white mb-8">
          AI Model Details
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-slate-800 rounded-2xl p-5">

            <div className="flex items-center gap-3 mb-4">
              <FaBrain className="text-cyan-400 text-2xl"/>
              <h2 className="text-xl font-bold">Model</h2>
            </div>

            <p><b>Name:</b> XGBoost Regressor</p>
            <p><b>Task:</b> House Price Prediction</p>
            <p><b>Accuracy:</b> 90.96%</p>
            <p><b>Prediction Time:</b> 0.02 sec</p>

          </div>

          <div className="bg-slate-800 rounded-2xl p-5">

            <div className="flex items-center gap-3 mb-4">
              <FaDatabase className="text-cyan-400 text-2xl"/>
              <h2 className="text-xl font-bold">Dataset</h2>
            </div>

            <p><b>Name:</b> Ames Housing Dataset</p>
            <p><b>Samples:</b> 1460 Houses</p>
            <p><b>Features:</b> 10 Important Features</p>

          </div>

          <div className="bg-slate-800 rounded-2xl p-5 md:col-span-2">

            <div className="flex items-center gap-3 mb-4">
              <FaChartLine className="text-cyan-400 text-2xl"/>
              <h2 className="text-xl font-bold">
                Top Features Used
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3">

              <div>✔ Overall Quality</div>

              <div>✔ Living Area</div>

              <div>✔ Lot Area</div>

              <div>✔ Garage Area</div>

              <div>✔ Garage Cars</div>

              <div>✔ Bedrooms</div>

              <div>✔ Bathrooms</div>

              <div>✔ Year Built</div>

              <div>✔ Kitchen Quality</div>

              <div>✔ Neighborhood</div>

            </div>

          </div>

        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 font-semibold"
        >
          Close
        </button>

      </div>

    </div>
  );
}

export default ModelInfoModal;