import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineAnalytics } from "react-icons/md";
import { useState } from "react";
import ModelInfoModal from "./ModelInfoModal";
import { useNavigate } from "react-router-dom";

function Hero() {
  const [openModel, setOpenModel] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <section id="home" className="relative overflow-hidden bg-slate-950">
        {/* Background Glow */}

        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-[140px]" />

          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[140px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}

            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-cyan-400 font-semibold uppercase tracking-widest mb-4">
                Machine Learning Powered
              </p>

              <h1 className="text-6xl font-black leading-tight">
                Predict
                <span className="text-cyan-400"> House Prices</span>
                <br />
                Instantly
              </h1>

              <p className="text-slate-400 text-lg mt-8 leading-8">
                Estimate residential property prices using an XGBoost Machine
                Learning model trained on real housing market data.
              </p>

              <div className="flex gap-5 mt-10">
                <button
                  onClick={() =>
                    navigate("/", {
                      state: {
                        scrollTo: "predict",
                      },
                    })
                  }
                  className="bg-cyan-500 hover:bg-cyan-600 transition px-7 py-4 rounded-xl font-semibold flex items-center gap-3"
                >
                  Predict Now
                  <FaArrowRight />
                </button>

                <button
                  onClick={() => setOpenModel(true)}
                  className="border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all duration-300 px-8 py-4 rounded-xl font-semibold"
                >
                  View AI Model
                </button>
              </div>
            </motion.div>

            {/* Right */}

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 w-full max-w-md">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Model Summary</h2>

                  <MdOutlineAnalytics size={34} className="text-cyan-400" />
                </div>

                <div className="space-y-6 mt-10">
                  <div className="flex justify-between">
                    <span>Model</span>
                    <span className="font-bold text-cyan-400">XGBoost</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Accuracy</span>
                    <span className="font-bold text-green-400">90.96%</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Training Data</span>
                    <span>1460 Houses</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Prediction Time</span>
                    <span>0.02 sec</span>
                  </div>

                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div className="bg-cyan-400 h-3 rounded-full w-[91%]" />
                  </div>

                  <p className="text-center text-slate-400">Confidence Score</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Model Modal */}

      <ModelInfoModal isOpen={openModel} onClose={() => setOpenModel(false)} />
    </>
  );
}

export default Hero;
