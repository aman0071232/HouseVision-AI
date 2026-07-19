import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaHome,
} from "react-icons/fa";
import toast from "react-hot-toast";


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill all fields.");
      return;
    }
    try {
      setLoading(true);
      setError("");
const res = await api.post("/login", {
          email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Login Successful");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || toast.error("Invalid Email or Password"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-6 py-10 relative overflow-hidden">
      <div className="absolute w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full -top-20 -left-20" />
      <div className="absolute w-72 h-72 bg-blue-600/20 blur-[120px] rounded-full bottom-0 right-0" />
      <div className="relative z-10 text-center mb-6"></div>
      <div className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-white">
          Welcome Back
        </h2>
        <p className="text-center text-slate-400 mt-2">Sign in to continue</p>
        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div>
            <label className="text-slate-300 text-sm">Email</label>
            <div className="mt-2 flex items-center bg-slate-800 border border-slate-700 rounded-xl px-4 focus-within:border-cyan-400">
              <FaEnvelope className="text-cyan-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full bg-transparent outline-none px-3 py-3 text-white"
              />
            </div>
          </div>
          <div>
            <label className="text-slate-300 text-sm">Password</label>
            <div className="mt-2 flex items-center bg-slate-800 border border-slate-700 rounded-xl px-4 focus-within:border-cyan-400">
              <FaLock className="text-cyan-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-transparent outline-none px-3 py-3 text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-slate-400" />
                ) : (
                  <FaEye className="text-slate-400" />
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <label className="text-slate-400 flex gap-2">
              <input type="checkbox" className="accent-cyan-500" />
              Remember me
            </label>
            <button type="button" className="text-cyan-400">
              Forgot?
            </button>
          </div>
          {error && <p className="text-red-400 text-center text-sm">{error}</p>}
          <button
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold disabled:opacity-60"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-700" />
            <span className="text-slate-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-slate-700" />
          </div>
          <button
            type="button"
            className="w-full py-3 rounded-xl border border-slate-700 hover:border-cyan-400 flex items-center justify-center gap-3"
          >
            <FaGoogle className="text-red-500" />
            Continue with Google
          </button>
        </form>
        <p className="text-center text-slate-400 mt-6">
          Don't have an account?
          <Link to="/register" className="text-cyan-400 ml-2">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
