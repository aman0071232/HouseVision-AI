import { useEffect, useState } from "react";
import api from "../services/api";
import EditProfileModal from "../components/EditProfileModal";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import {
  FaUserCircle,
  FaChartLine,
  FaEdit,
  FaLock,
  FaHistory,
  FaSignOutAlt,
  FaEnvelope,
  FaArrowUp,
  FaArrowDown,
  FaCrown,
} from "react-icons/fa";
import ChangePasswordModal from "../components/ChangePasswordModal";
export default function Profile() {
  const [data, setData] = useState(null),
    [loading, setLoading] = useState(true),
    [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const r = await api.get("/profile");
        setData(r.data);
      } catch (e) {
        setError(e.response?.data?.error || "Failed");
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  if (loading)
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-400">
        {error}
      </div>
    );
  const { user, stats } = data;
  const card =
    "rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-7 transition-all duration-300 hover:scale-[1.02] hover:border-cyan-500/40";
  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Background Glow */}
      <Navbar/>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-56 -left-56 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[180px]" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[180px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-[35px] bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 p-10 overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-8">
              <div className="relative">
                <div className="w-36 h-36 rounded-full bg-white/20 backdrop-blur-xl flex justify-center items-center">
                  <FaUserCircle className="text-8xl text-white" />
                </div>

                <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-green-400 border-4 border-white" />
              </div>

              <div>
                <h1 className="text-5xl font-black">{user.name}</h1>

                <div className="space-y-3 mt-5">
                  <div className="flex items-center gap-3">
                    <FaEnvelope />

                    {user.email}
                  </div>

                  <div className="flex items-center gap-3">
                    <FaCrown className="text-yellow-300" />
                    Premium AI User
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl px-10 py-8">
              <p className="uppercase tracking-widest text-sm">PROFILE</p>

              <h1 className="text-6xl font-black mt-3">100%</h1>

              <p className="mt-2">Completed</p>

              <div className="w-56 h-3 rounded-full bg-white/20 mt-6">
                <div className="w-full h-3 rounded-full bg-white" />
              </div>
            </div>
          </div>
        </motion.div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-7 mt-10">
          {[
            {
              title: "Total Predictions",
              value: stats.total,
              icon: <FaChartLine />,
              color: "from-cyan-500 to-blue-600",
            },

            {
              title: "Highest Price",
              value: `₹ ${Math.round(stats.highest).toLocaleString()}`,
              icon: <FaArrowUp />,
              color: "from-green-500 to-emerald-600",
            },

            {
              title: "Lowest Price",
              value: `₹ ${Math.round(stats.lowest).toLocaleString()}`,
              icon: <FaArrowDown />,
              color: "from-red-500 to-pink-600",
            },

            {
              title: "Average Price",
              value: `₹ ${Math.round(stats.average).toLocaleString()}`,
              icon: <FaChartLine />,
              color: "from-purple-500 to-indigo-600",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              className={`rounded-3xl bg-gradient-to-br ${item.color} p-[1px]`}
            >
              <div className="rounded-3xl bg-slate-900/95 backdrop-blur-xl p-7 h-full">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-slate-400 text-sm uppercase tracking-wider">
                      {item.title}
                    </p>

                    <h2 className="text-3xl font-black mt-3">{item.value}</h2>
                  </div>

                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex justify-center items-center text-2xl">
                    {item.icon}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="grid lg:grid-cols-3 gap-8 mt-10">
          {/* ================= Account Card ================= */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8"
          >
            <h2 className="text-3xl font-black mb-8">Account Information</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800/60 rounded-2xl p-5">
                <p className="text-slate-400 text-sm">Full Name</p>

                <h3 className="text-2xl font-bold mt-2">{user.name}</h3>
              </div>

              <div className="bg-slate-800/60 rounded-2xl p-5">
                <p className="text-slate-400 text-sm">Email</p>

                <h3 className="text-lg font-semibold mt-2 break-all">
                  {user.email}
                </h3>
              </div>

              <div className="bg-slate-800/60 rounded-2xl p-5">
                <p className="text-slate-400 text-sm">Membership</p>

                <h3 className="text-xl font-semibold mt-2">Premium AI User</h3>
              </div>

              <div className="bg-slate-800/60 rounded-2xl p-5">
                <p className="text-slate-400 text-sm">Status</p>

                <span className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full bg-green-500/20 text-green-400">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  Active
                </span>
              </div>
            </div>
          </motion.div>

          {/* ================= Quick Actions ================= */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8"
          >
            <h2 className="text-3xl font-black mb-8">Quick Actions</h2>

            <div className="space-y-5">
              <button
                onClick={() => setOpenModal(true)}
                className="w-full flex items-center gap-4 bg-cyan-500 hover:bg-cyan-600 transition rounded-2xl p-5"
              >
                <FaEdit className="text-xl" />

                <span className="font-semibold">Edit Profile</span>
              </button>

              <button
                onClick={() => setOpenPasswordModal(true)}
                className="w-full flex items-center gap-4 bg-indigo-600 hover:bg-indigo-700 transition rounded-2xl p-5"
              >
                <FaLock className="text-xl" />

                <span className="font-semibold">Change Password</span>
              </button>

              <button
                onClick={() => (window.location.href = "/history")}
                className="w-full flex items-center gap-4 bg-green-600 hover:bg-green-700 transition rounded-2xl p-5"
              >
                <FaHistory className="text-xl" />

                <span className="font-semibold">Prediction History</span>
              </button>

              <button
                onClick={() => {
                  localStorage.clear();

                  window.location = "/login";
                }}
                className="w-full flex items-center gap-4 bg-red-600 hover:bg-red-700 transition rounded-2xl p-5"
              >
                <FaSignOutAlt className="text-xl" />

                <span className="font-semibold">Logout</span>
              </button>
            </div>
          </motion.div>
        </div>
    {/* ================= Recent Activity ================= */}

<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
  className="mt-10 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8"
>
  <h2 className="text-3xl font-black mb-6">Activity Overview</h2>

  <div className="grid md:grid-cols-3 gap-6">

    <div className="rounded-2xl bg-slate-800/60 p-6">
      <p className="text-slate-400 text-sm">Total Predictions</p>
      <h2 className="text-5xl font-black mt-3 text-cyan-400">
        {stats.total}
      </h2>
    </div>

    <div className="rounded-2xl bg-slate-800/60 p-6">
      <p className="text-slate-400 text-sm">Average Prediction</p>
      <h2 className="text-3xl font-bold mt-3">
        ₹ {Math.round(stats.average).toLocaleString()}
      </h2>
    </div>

    <div className="rounded-2xl bg-slate-800/60 p-6">
      <p className="text-slate-400 text-sm">Account Status</p>
      <p className="mt-3 text-green-400 font-semibold">🟢 Active</p>
    </div>

  </div>

</motion.div>

</div>

      
      


      <EditProfileModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        user={user}
        onSave={async (updatedUser) => {
          try {
            await api.put("/profile", updatedUser);

            const res = await api.get("/profile");

            setData(res.data);

            localStorage.setItem(
              "user",

              JSON.stringify({
                ...JSON.parse(localStorage.getItem("user")),

                name: res.data.user.name,

                email: res.data.user.email,
              }),
            );

            setOpenModal(false);

            toast.success("Profile Updated Successfully");
          } catch (err) {
            toast.error(err.response?.data?.error || "Update Failed");
          }
        }}
      />
      <ChangePasswordModal
        isOpen={openPasswordModal}
        onClose={() => setOpenPasswordModal(false)}
        onSave={async (passwordData) => {
          try {
            await api.put("/change-password", passwordData);

            toast.success("Password Changed Successfully");

            setOpenPasswordModal(false);
          } catch (err) {
            toast.error(err.response?.data?.error || "Password Update Failed");
          }
        }}
      />
    </div>
  );
}
