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

        <div className="min-h-screen bg-slate-950 text-white p-10">
            <Navbar />
           <div className="flex flex-col md:flex-row justify-between items-center mb-10">

    <div>

        <h1 className="text-5xl font-bold">

            Prediction History

        </h1>

        <p className="text-slate-400 mt-2">

            Compare your previous house price predictions.

        </p>

    </div>

    <button

        onClick={() => setShowCompareModal(true)}

        className="mt-6 md:mt-0 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-semibold transition"

    >

        Compare Houses

    </button>

</div>
            <HistoryStats predictions={predictions} />
            <FilterBar
    search={search}
    setSearch={setSearch}
    neighborhood={neighborhood}
    setNeighborhood={setNeighborhood}
    sortBy={sortBy}
    setSortBy={setSortBy}
/>
<div className="flex justify-between items-center mb-6">

    <p className="text-slate-400">

        Showing

        <span className="text-cyan-400 font-bold">
            {" "}{filteredPredictions.length}{" "}
        </span>

        of

        <span className="text-cyan-400 font-bold">
            {" "}{predictions.length}{" "}
        </span>

        Predictions

    </p>

</div>
         {/* Analytics Dashboard */}

<div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10">

    <PriceDistributionChart
        predictions={predictions}
    />

    <NeighborhoodChart
        predictions={predictions}
    />

</div> 
           <div className="space-y-8 mt-10">

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