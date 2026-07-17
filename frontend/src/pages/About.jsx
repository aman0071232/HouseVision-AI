import Navbar from "../components/Navbar";
import img4 from "../assets/img4.jpg";
import {
  FaBrain,
  FaChartLine,
  FaDatabase,
  FaReact,
  FaPython,
  FaGithub,
} from "react-icons/fa";
import { SiFlask, SiMongodb, SiTailwindcss } from "react-icons/si";

function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      {/* Hero */}

      <section className="max-w-7xl mx-auto px-8 pt-24 pb-20 py-6">
        <div className="text-center">
          <span className="px-5 py-2 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 py-2">
            AI Powered House Price Prediction Platform
          </span>

          <h1 className="text-6xl font-black mt-8">
            About
            <span className="text-cyan-400"> HouseVision AI</span>
          </h1>

          <p className="text-slate-400 text-xl mt-8 max-w-4xl mx-auto leading-9">
            HouseVision AI is a full-stack Machine Learning web application that
            predicts house prices using an XGBoost Regression model. The
            platform combines Artificial Intelligence, Data Analytics,
            interactive dashboards and cloud storage to deliver real-time
            property valuation with a modern user experience.
          </p>
        </div>
      </section>

      {/* Features */}

      <section className="max-w-7xl mx-auto px-8 pb-20">
        <h2 className="text-4xl font-bold mb-12 text-center">Core Features</h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-cyan-400 transition">
            <FaBrain className="text-cyan-400 text-5xl mb-6" />

            <h3 className="text-2xl font-bold">AI Prediction</h3>

            <p className="text-slate-400 mt-4">
              Predict house prices instantly using a trained XGBoost Machine
              Learning model.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-cyan-400 transition">
            <FaChartLine className="text-cyan-400 text-5xl mb-6" />

            <h3 className="text-2xl font-bold">Analytics</h3>

            <p className="text-slate-400 mt-4">
              Interactive charts, dashboards, comparison tools and prediction
              history.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-cyan-400 transition">
            <FaDatabase className="text-cyan-400 text-5xl mb-6" />

            <h3 className="text-2xl font-bold">Cloud Storage</h3>

            <p className="text-slate-400 mt-4">
              Every prediction is securely stored in MongoDB Atlas.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-cyan-400 transition">
            <FaGithub className="text-cyan-400 text-5xl mb-6" />

            <h3 className="text-2xl font-bold">Open Source</h3>

            <p className="text-slate-400 mt-4">
              Built using modern open-source technologies and best practices.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack */}

      <section className="max-w-7xl mx-auto px-8 pb-24">
        <h2 className="text-4xl font-bold text-center mb-14 ">
          Technology Stack
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 ">
          <div className="bg-slate-900 rounded-2xl p-8 flex flex-col items-center border border-slate-800">
            <FaReact className="text-cyan-400 text-5xl" />

            <p className="mt-4 font-semibold">React</p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-8 flex flex-col items-center border border-slate-800">
            <SiTailwindcss className="text-cyan-400 text-5xl" />

            <p className="mt-4 font-semibold">Tailwind</p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-8 flex flex-col items-center border border-slate-800">
            <SiFlask className="text-cyan-400 text-5xl" />

            <p className="mt-4 font-semibold">Flask</p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-8 flex flex-col items-center border border-slate-800">
            <FaPython className="text-cyan-400 text-5xl" />

            <p className="mt-4 font-semibold">Python</p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-8 flex flex-col items-center border border-slate-800">
            <SiMongodb className="text-cyan-400 text-5xl" />

            <p className="mt-4 font-semibold">MongoDB</p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-8 flex flex-col items-center border border-slate-800">
            <FaBrain className="text-cyan-400 text-5xl" />

            <p className="mt-4 font-semibold">XGBoost</p>
          </div>
        </div>
      </section>

      {/* ================= Project Architecture ================= */}

      <section className="max-w-7xl mx-auto px-8 pb-24">
        <h2 className="text-4xl font-bold text-center mb-6">
          Project Architecture
        </h2>

        <p className="text-slate-400 text-center max-w-3xl mx-auto mb-16">
          Every prediction follows a complete Machine Learning pipeline, from
          user input to AI prediction, database storage and analytics.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
          {/* React */}

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center hover:border-cyan-400 transition">
            <FaReact className="text-cyan-400 text-6xl mx-auto mb-5" />

            <h3 className="text-2xl font-bold">React</h3>

            <p className="text-slate-400 mt-3">User Interface</p>
          </div>

          <div className="text-center text-5xl text-cyan-400">→</div>

          {/* Flask */}

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center hover:border-cyan-400 transition">
            <SiFlask className="text-cyan-400 text-6xl mx-auto mb-5" />

            <h3 className="text-2xl font-bold">Flask API</h3>

            <p className="text-slate-400 mt-3">Backend Server</p>
          </div>

          <div className="text-center text-5xl text-cyan-400">→</div>

          {/* XGBoost */}

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center hover:border-cyan-400 transition">
            <FaBrain className="text-cyan-400 text-6xl mx-auto mb-5" />

            <h3 className="text-2xl font-bold">XGBoost</h3>

            <p className="text-slate-400 mt-3">Machine Learning Model</p>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <div className="text-5xl text-cyan-400">↓</div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center hover:border-cyan-400 transition">
            <SiMongodb className="text-green-400 text-6xl mx-auto mb-5" />

            <h3 className="text-2xl font-bold">MongoDB Atlas</h3>

            <p className="text-slate-400 mt-3">
              Stores every prediction securely.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center hover:border-cyan-400 transition">
            <FaChartLine className="text-cyan-400 text-6xl mx-auto mb-5" />

            <h3 className="text-2xl font-bold">Dashboard</h3>

            <p className="text-slate-400 mt-3">
              Analytics, History, Comparison & PDF Reports.
            </p>
          </div>
        </div>
      </section>
      {/* ================= Developer ================= */}

      <section className="max-w-6xl mx-auto px-8 pb-24">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-[40px] overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-12 items-center p-12">
            {/* Left */}

            <div className="flex justify-center">
              <img
                src={img4}
                alt="Aman Gupta"
                className="w-72 h-72 rounded-full object-cover border-4 border-cyan-400 shadow-2xl"
              />
            </div>

            {/* Right */}

            <div>
              <span className="bg-cyan-500/10 text-cyan-300 px-4 py-2 rounded-full">
                Meet the Developer
              </span>

              <h2 className="text-5xl font-black mt-6">Aman Gupta</h2>

              <p className="text-cyan-400 text-xl mt-2">
                Data Science Undergraduate
              </p>

              <p className="text-slate-400 leading-8 mt-8">
                Passionate about Artificial Intelligence, Data Analytics, Full
                Stack Development and Machine Learning. I enjoy transforming
                real-world problems into modern, scalable and user-friendly
                applications using Python, React, Flask and cloud technologies.
              </p>

              {/* Skills */}

              <div className="flex flex-wrap gap-3 mt-8">
                <span className="bg-slate-800 px-4 py-2 rounded-full">
                  React
                </span>

                <span className="bg-slate-800 px-4 py-2 rounded-full">
                  Flask
                </span>

                <span className="bg-slate-800 px-4 py-2 rounded-full">
                  Python
                </span>

                <span className="bg-slate-800 px-4 py-2 rounded-full">
                  MongoDB
                </span>

                <span className="bg-slate-800 px-4 py-2 rounded-full">
                  XGBoost
                </span>

                <span className="bg-slate-800 px-4 py-2 rounded-full">
                  Power BI
                </span>
              </div>

              {/* Social */}

              <div className="flex gap-5 mt-10">
                <a
                  href="https://github.com/aman0071232"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-800 hover:bg-cyan-500 transition px-6 py-3 rounded-xl"
                >
                  GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/aman-gupta-2b9625327"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-800 hover:bg-cyan-500 transition px-6 py-3 rounded-xl"
                >
                  LinkedIn
                </a>

                <a
                  href="mailto:amanguptanew0612005@gmail.com"
                  className="bg-slate-800 hover:bg-cyan-500 transition px-6 py-3 rounded-xl"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
