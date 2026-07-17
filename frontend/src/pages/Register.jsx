import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    console.log("Register button clicked");
    e.preventDefault();

    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields.");
      toast.error("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // Register User
      await axios.post("http://127.0.0.1:5000/register", {
        name,
        email,
        password,
      });

      // Automatically Login
      const loginRes = await axios.post("http://127.0.0.1:5000/login", {
        email,
        password,
      });

      // Save Token
      localStorage.setItem("token", loginRes.data.token);

      // Save User
      localStorage.setItem("user", JSON.stringify(loginRes.data.user));

      // Redirect to Dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Registration Failed");
      toast.error(err.response?.data?.error || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-6 py-10">
      {/* Logo */}

      {/* Card */}

      <div className="w-full max-w-md bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-white text-center">
          Create Account
        </h2>

        <p className="text-center text-slate-400 mt-2">
          Register to start predicting
        </p>

        <form onSubmit={handleRegister} className="mt-8 space-y-5">
          {/* Name */}

          <div>
            <label className="text-slate-300 text-sm">Full Name</label>

            <div className="mt-2 flex items-center bg-slate-800 border border-slate-700 rounded-xl px-4">
              <FaUser className="text-cyan-400" />

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent outline-none px-3 py-3 text-white"
              />
            </div>
          </div>

          {/* Email */}

          <div>
            <label className="text-slate-300 text-sm">Email</label>

            <div className="mt-2 flex items-center bg-slate-800 border border-slate-700 rounded-xl px-4">
              <FaEnvelope className="text-cyan-400" />

              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none px-3 py-3 text-white"
              />
            </div>
          </div>

          {/* Password */}

          <div>
            <label className="text-slate-300 text-sm">Password</label>

            <div className="mt-2 flex items-center bg-slate-800 border border-slate-700 rounded-xl px-4">
              <FaLock className="text-cyan-400" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Confirm Password */}

          <div>
            <label className="text-slate-300 text-sm">Confirm Password</label>

            <div className="mt-2 flex items-center bg-slate-800 border border-slate-700 rounded-xl px-4">
              <FaLock className="text-cyan-400" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-transparent outline-none px-3 py-3 text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="mt-10">
          {error && <p className="text-red-400 text-center">{error}</p>}
        </div>

        <p className="text-center text-slate-400 mt-6">
          Already have an account?
          <Link to="/login" className="text-cyan-400 ml-2">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
