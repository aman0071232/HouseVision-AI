import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/profile");
      setProfile(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center text-white text-2xl">
        Loading Dashboard...
      </div>
    );
  }

  const stats = profile.stats;
  const user = profile.user;

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* Welcome */}

        <div className="mb-10">

          <h1 className="text-5xl font-black">

            Welcome Back 👋

          </h1>

          <p className="text-cyan-400 text-xl mt-2">

            {user.name}

          </p>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-slate-900 rounded-3xl p-7 border border-slate-800">

            <p className="text-slate-400">

              Total Predictions

            </p>

            <h2 className="text-5xl font-black mt-4">

              {stats.total}

            </h2>

          </div>

          <div className="bg-slate-900 rounded-3xl p-7 border border-slate-800">

            <p className="text-slate-400">

              Highest Price

            </p>

            <h2 className="text-3xl font-black mt-4 text-green-400">

              ₹ {Math.round(stats.highest).toLocaleString()}

            </h2>

          </div>

          <div className="bg-slate-900 rounded-3xl p-7 border border-slate-800">

            <p className="text-slate-400">

              Lowest Price

            </p>

            <h2 className="text-3xl font-black mt-4 text-red-400">

              ₹ {Math.round(stats.lowest).toLocaleString()}

            </h2>

          </div>

          <div className="bg-slate-900 rounded-3xl p-7 border border-slate-800">

            <p className="text-slate-400">

              Average Price

            </p>

            <h2 className="text-3xl font-black mt-4 text-cyan-400">

              ₹ {Math.round(stats.average).toLocaleString()}

            </h2>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="mt-12">

          <h2 className="text-3xl font-bold mb-6">

            Quick Actions

          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <button
              onClick={() => navigate("/")}
              className="bg-cyan-500 hover:bg-cyan-600 rounded-2xl py-8 text-2xl font-bold"
            >
              🏠 Predict House
            </button>

            <button
              onClick={() => navigate("/history")}
              className="bg-indigo-500 hover:bg-indigo-600 rounded-2xl py-8 text-2xl font-bold"
            >
              📜 History
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="bg-green-500 hover:bg-green-600 rounded-2xl py-8 text-2xl font-bold"
            >
              👤 Profile
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}