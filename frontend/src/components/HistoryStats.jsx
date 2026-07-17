import {
  FaChartLine,
  FaMoneyBillWave,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function HistoryStats({ predictions }) {
  const total = predictions.length;

  const avg =
    total > 0
      ? predictions.reduce((sum, p) => sum + p.predicted_price, 0) / total
      : 0;

  const highest =
    total > 0
      ? Math.max(...predictions.map((p) => p.predicted_price))
      : 0;

  const lowest =
    total > 0
      ? Math.min(...predictions.map((p) => p.predicted_price))
      : 0;

  const cards = [
    {
      title: "Total Predictions",
      value: total,
      icon: <FaChartLine />,
      color: "from-cyan-500 to-blue-600",
      subtitle: "Stored in database",
    },
    {
      title: "Average Price",
      value: `₹ ${avg.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      })}`,
      icon: <FaMoneyBillWave />,
      color: "from-emerald-500 to-green-600",
      subtitle: "Across all houses",
    },
    {
      title: "Highest Price",
      value: `₹ ${highest.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      })}`,
      icon: <FaArrowUp />,
      color: "from-yellow-500 to-orange-500",
      subtitle: "Maximum prediction",
    },
    {
      title: "Lowest Price",
      value: `₹ ${lowest.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      })}`,
      icon: <FaArrowDown />,
      color: "from-red-500 to-pink-600",
      subtitle: "Minimum prediction",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08 }}
          whileHover={{
            y: -6,
            scale: 1.02,
          }}
          className="group rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-6 overflow-hidden relative"
        >
          {/* Glow */}

          <div
            className={`absolute -right-10 -top-10 w-28 h-28 rounded-full bg-gradient-to-br ${card.color} opacity-10 blur-2xl`}
          />

          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm">
                {card.title}
              </p>

              <h2 className="text-4xl font-black mt-3">
                {card.value}
              </h2>

              <p className="text-slate-500 mt-3 text-sm">
                {card.subtitle}
              </p>
            </div>

            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white text-2xl shadow-xl`}
            >
              {card.icon}
            </div>
          </div>

          <div className="mt-6 h-1 rounded-full bg-slate-800 overflow-hidden">
            <div
              className={`h-full w-full bg-gradient-to-r ${card.color}`}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}