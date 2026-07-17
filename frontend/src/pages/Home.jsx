import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HouseForm from "../components/HouseForm";
import Stats from "../components/Stats";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../components/Footer";

function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo === "predict") {
      const section = document.getElementById("predict");

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <Hero />

      <Stats />
      <div id="predict" className="max-w-7xl mx-auto px-8 pb-20">
        <HouseForm />
      </div>
     <Footer />
    </div>
  );
}

export default Home;
