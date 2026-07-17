import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HistoryStats from "../components/HistoryStats";
import HistoryCard from "../components/HistoryCard";
import ViewPredictionModal from "../components/ViewPredictionModal";
import { getPredictions, deletePrediction } from "../services/api";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import PriceDistributionChart from "../components/analytics/PriceDistributionChart";
import NeighborhoodChart from "../components/analytics/NeighborhoodChart";
import CompareModal from "../components/CompareModal";
import FilterBar from "../components/analytics/FilterBar";

//import HistoryCard from "../components/HistoryCard";
function History() {

    const [predictions, setPredictions] = useState([]);
   const [selectedPrediction, setSelectedPrediction] = useState(null);
   const [deleteId, setDeleteId] = useState(null);

const [showDeleteModal, setShowDeleteModal] = useState(false);
const [showCompareModal, setShowCompareModal] = useState(false);
const [search, setSearch] = useState("");
const [neighborhood, setNeighborhood] = useState("All");
const [sortBy, setSortBy] = useState("latest");

    useEffect(() => {

        async function fetchData() {

            try {

                const res = await getPredictions();

                setPredictions(res.data.predictions);

            } catch (err) {

                console.log(err);

            }

        }

        fetchData();

    }, []);


    const filteredPredictions = [...predictions]
  .filter((item) => {
    const matchesSearch =
      item.input.Neighborhood.toLowerCase().includes(search.toLowerCase());

    const matchesNeighborhood =
      neighborhood === "All" ||
      item.input.Neighborhood === neighborhood;

    return matchesSearch && matchesNeighborhood;
  })
  .sort((a, b) => {
    switch (sortBy) {
      case "high":
        return b.predicted_price - a.predicted_price;

      case "low":
        return a.predicted_price - b.predicted_price;

      case "oldest":
        return (
          new Date(a.created_at) -
          new Date(b.created_at)
        );

      default:
        return (
          new Date(b.created_at) -
          new Date(a.created_at)
        );
    }
  });

const handleDelete = (id) => {

    setDeleteId(id);

    setShowDeleteModal(true);

};
const confirmDelete = async () => {

    try{

        await deletePrediction(deleteId);

        setPredictions(prev=>

            prev.filter(item=>item._id!==deleteId)

        );

    }

    catch(err){

        console.log(err);

    }

    setShowDeleteModal(false);

    setDeleteId(null);

};
    return (

        <div className="min-h-screen bg-slate-950 text-white p-10 py-2">
            <Navbar />
      {/* ================= HEADER ================= */}

<div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 p-10 mb-10">

    {/* Background Glow */}

    <div className="absolute -top-24 -left-20 w-72 h-72 bg-cyan-500/10 blur-[120px] rounded-full"></div>

    <div className="absolute -bottom-28 right-0 w-80 h-80 bg-blue-600/10 blur-[140px] rounded-full"></div>

    <div className="relative z-10 flex flex-col lg:flex-row justify-between lg:items-center gap-8">

        {/* Left */}

        <div>

            <div className="flex items-center gap-4">

                <div className="w-16 h-16 rounded-2xl bg-cyan-500 flex items-center justify-center text-3xl shadow-lg shadow-cyan-500/30">

                    📊

                </div>

                <div>

                    <h1 className="text-5xl font-extrabold">

                        Prediction History

                    </h1>

                    <p className="text-slate-400 mt-2 text-lg">

                        Manage, analyze and compare your AI house price predictions.

                    </p>

                </div>

            </div>

            <div className="mt-6 flex flex-wrap gap-3">

                <span className="bg-cyan-500/10 text-cyan-300 px-4 py-2 rounded-full text-sm border border-cyan-500/20">

                    🤖 XGBoost Model

                </span>

                <span className="bg-green-500/10 text-green-300 px-4 py-2 rounded-full text-sm border border-green-500/20">

                    📈 Analytics Enabled

                </span>

                <span className="bg-blue-500/10 text-blue-300 px-4 py-2 rounded-full text-sm border border-blue-500/20">

                    ☁ MongoDB Cloud

                </span>

            </div>

        </div>

        {/* Right */}

        <div className="flex flex-col gap-4">

            <button

                onClick={() => setShowCompareModal(true)}

                className="bg-cyan-500 hover:bg-cyan-600 transition px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-cyan-500/30"

            >

                ⚖ Compare Houses

            </button>

            <div className="bg-slate-800/60 rounded-2xl p-5 border border-slate-700">

                <p className="text-slate-400 text-sm">

                    Total Stored Predictions

                </p>

                <h2 className="text-4xl font-black text-cyan-400 mt-2">

                    {predictions.length}

                </h2>

            </div>

        </div>

    </div>

</div>
            <HistoryStats predictions={predictions} />
    <FilterBar
    search={search}
    setSearch={setSearch}
    neighborhood={neighborhood}
    setNeighborhood={setNeighborhood}
    sortBy={sortBy}
    setSortBy={setSortBy}
    total={predictions.length}
    filtered={filteredPredictions.length}
/>
         {/* Analytics Dashboard */}

{/* ================= ANALYTICS ================= */}

<div className="rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-8 mb-12">

    {/* Heading */}

    <div className="flex justify-between items-center flex-wrap gap-5 mb-8">

        <div>

            <h2 className="text-4xl font-bold">

                📊 Analytics Dashboard

            </h2>

            <p className="text-slate-400 mt-2">

                Monitor prediction trends, neighborhood insights and house valuation patterns.

            </p>

        </div>

        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl px-5 py-3">

            <p className="text-cyan-300">

                {predictions.length}

                {" "}Predictions Analysed

            </p>

        </div>

    </div>

    {/* Charts */}

    <div className="grid xl:grid-cols-2 gap-8">

        {/* Price Distribution */}

        <div className="rounded-2xl bg-slate-800/60 border border-slate-700 p-6">

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h3 className="text-2xl font-bold">

                        Price Distribution

                    </h3>

                    <p className="text-slate-400">

                        Predicted house prices

                    </p>

                </div>

            </div>

            <PriceDistributionChart

                predictions={predictions}

            />

        </div>

        {/* Neighborhood */}

        <div className="rounded-2xl bg-slate-800/60 border border-slate-700 p-6">

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h3 className="text-2xl font-bold">

                        Neighborhood Analysis

                    </h3>

                    <p className="text-slate-400">

                        Most predicted locations

                    </p>

                </div>

            </div>

            <NeighborhoodChart

                predictions={predictions}

            />

        </div>

    </div>

</div>


<div className="mb-8">

    <h2 className="text-4xl font-bold">

        📂 Prediction Records

    </h2>

    <p className="text-slate-400 mt-2">

        Browse every house valuation generated by HouseVision AI.

    </p>

</div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 mt-10">

  {filteredPredictions.map((item)=>(

     <HistoryCard
    key={item._id}
    item={item}
    onView={setSelectedPrediction}
    onDelete={handleDelete}
/>

  ))}

</div>
{/* View Prediction Modal */}

{selectedPrediction && (

  <ViewPredictionModal
    prediction={selectedPrediction}
    onClose={() => setSelectedPrediction(null)}
  />

)}
{showCompareModal && (

    <CompareModal

        predictions={predictions}

        onClose={() => setShowCompareModal(false)}

    />

)}
<DeleteConfirmationModal

    open={showDeleteModal}

    onClose={() => {

        setShowDeleteModal(false);

        setDeleteId(null);

    }}

    onConfirm={confirmDelete}

/>
        </div>

    );

}

export default History;