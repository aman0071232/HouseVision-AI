import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-cyan-500/20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              HouseVision AI
            </h2>

            <p className="text-slate-400 mt-4 leading-7">
              Predict house prices intelligently using Machine Learning,
              modern analytics and an intuitive user experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-5">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-slate-300">

              <Link to="/" className="hover:text-cyan-400 transition">
                Home
              </Link>

              <Link to="/dashboard" className="hover:text-cyan-400 transition">
                Dashboard
              </Link>

              <Link to="/history" className="hover:text-cyan-400 transition">
                History
              </Link>

              <Link to="/about" className="hover:text-cyan-400 transition">
                About
              </Link>

              <Link to="/profile" className="hover:text-cyan-400 transition">
                Profile
              </Link>

            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-5">
              Contact
            </h3>

            <div className="flex items-center gap-3 text-slate-300">
              <FaEnvelope className="text-cyan-400" />

              <a
                href="mailto:amanguptanew0612005@gmail.com"
                className="hover:text-cyan-400 transition"
              >
                amanguptanew0612005@gmail.com
              </a>
            </div>

            <div className="flex gap-5 mt-6 text-2xl">

              <a
                href="https://github.com/aman0071232"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition"
              >
                <FaGithub />
              </a>

              <a
                href="YOUR_LINKEDIN_URL"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition"
              >
                <FaLinkedin />
              </a>

            </div>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-slate-500">
            © 2026 HouseVision AI. All rights reserved.
          </p>

          <p className="text-slate-500 mt-3 md:mt-0">
            Built with ❤️ by <span className="text-cyan-400">Aman Gupta</span>
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;