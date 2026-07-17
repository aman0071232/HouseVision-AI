import { FaHome, FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-20 flex justify-between items-center">
          {/* Logo */}

          <div className="flex items-center gap-3">
            <div className="bg-cyan-500 p-3 rounded-xl">
              <FaHome className="text-white text-xl" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white">
                HouseVision
                <span className="text-cyan-400">AI</span>
              </h1>

              <p className="text-xs text-slate-400">
                XGBoost House Price Prediction
              </p>
            </div>
          </div>

          {/* Desktop Menu */}

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-slate-300 hover:text-cyan-400 transition"
            >
              Home
            </Link>

            
            <Link
              to="/history"
              className="text-slate-300 hover:text-cyan-400 transition"
            >
              History
            </Link>
            <Link
              to="/about"
              className="text-slate-300 hover:text-cyan-400 transition"
            >
              About
            </Link>

            <Link
              to="/profile"
              className="text-slate-300 hover:text-cyan-400 transition"
            >
              Profile
            </Link>

            {token ? (
              <div className="flex items-center gap-5">
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition font-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-5">
                <Link to="/login">Login</Link>

                <Link to="/register">Register</Link>
              </div>
            )}

            <a
              href="https://github.com/aman0071232"
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-cyan-400"
            >
              <FaGithub size={22} />
            </a>

            <button
              onClick={() =>
                navigate("/", {
                  state: { scrollTo: "predict" },
                })
              }
              className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-xl font-semibold transition"
            >
              Start Predicting
            </button>
          </div>

          {/* Mobile */}

          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
          >
            <HiMenuAlt3 size={30} />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800">
          <div className="flex flex-col p-6 gap-5">
            <Link to="/">Home</Link>

            <Link to="/predict">Predict</Link>

            <Link to="/history">History</Link>

            <Link to="/about">About</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
