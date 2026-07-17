import { motion } from "framer-motion";
import jsPDF from "jspdf";
import { FaChartLine, FaDownload } from "react-icons/fa";

function PredictionCard({ prediction, loading, formData }) {
  const downloadReport = () => {

  if (!prediction) {
    alert("Please predict a house price first.");
    return;
  }

  const doc = new jsPDF();

  // ==========================
  // Header
  // ==========================

  doc.setFillColor(6, 182, 212);
  doc.rect(0, 0, 210, 28, "F");

  doc.setTextColor(255,255,255);
  doc.setFontSize(22);
  doc.setFont("helvetica","bold");
  doc.text("HouseVision AI",20,18);

  doc.setFontSize(11);
  doc.text("Professional House Price Prediction Report",20,25);

  doc.setTextColor(0,0,0);

  // ==========================
  // Prediction Summary
  // ==========================

  doc.setFontSize(18);
  doc.setFont("helvetica","bold");
  doc.text("Prediction Summary",20,42);

  doc.setFontSize(14);
  doc.setFont("helvetica","normal");

  doc.text(
    `Estimated Price : ₹ ${Number(prediction).toLocaleString()}`,
    20,
    55
  );

  doc.text("Model : XGBoost",20,65);

  doc.text("Accuracy : 90.96%",20,73);

  doc.text(
    `Generated : ${new Date().toLocaleString()}`,
    20,
    81
  );

  // ==========================
  // Property Details
  // ==========================

  doc.setDrawColor(6,182,212);
  doc.line(20,88,190,88);

  doc.setFont("helvetica","bold");
  doc.setFontSize(18);

  doc.text("Property Details",20,100);

  doc.setFont("helvetica","normal");
  doc.setFontSize(12);

  let y = 112;

  const rows = [

    ["Overall Quality",formData.OverallQual],

    ["Lot Area",`${formData.LotArea} sqft`],

    ["Living Area",`${formData.GrLivArea} sqft`],

    ["Garage Cars",formData.GarageCars],

    ["Garage Area",`${formData.GarageArea} sqft`],

    ["Bedrooms",formData.BedroomAbvGr],

    ["Bathrooms",formData.FullBath],

    ["Kitchen Quality",formData.KitchenQual],

    ["Neighborhood",formData.Neighborhood],

    ["Year Built",formData.YearBuilt]

  ];

  rows.forEach(([key,value])=>{

      doc.text(`${key}`,20,y);

      doc.text(`${value}`,100,y);

      y+=8;

  });

  // ==========================
  // AI Insights
  // ==========================

  y += 8;

  doc.setDrawColor(6,182,212);

  doc.line(20,y-3,190,y-3);

  doc.setFontSize(18);

  doc.setFont("helvetica","bold");

  doc.text("AI Insights",20,y+8);

  doc.setFont("helvetica","normal");

  doc.setFontSize(12);

  let insights=[];

  if(formData.OverallQual>=8)
      insights.push("Excellent overall construction quality.");

  if(formData.GrLivArea>=2000)
      insights.push("Large living area positively impacts value.");

  if(formData.YearBuilt>=2000)
      insights.push("Modern construction improves valuation.");

  if(formData.GarageCars>=2)
      insights.push("Good garage capacity adds value.");

  insights.push("Prediction generated using trained XGBoost model.");

  let yy=y+20;

  insights.forEach(item=>{

      doc.text("• "+item,20,yy);

      yy+=8;

  });

  // ==========================
  // Footer
  // ==========================
// Footer line
doc.setDrawColor(0, 180, 255);
doc.line(20, 272, 190, 272);

// Project name
doc.setFont("helvetica", "bold");
doc.setFontSize(12);
doc.setTextColor(0, 120, 220);

doc.text("HouseVision AI", 20, 280);

// Subtitle
doc.setFont("helvetica", "normal");
doc.setFontSize(10);
doc.setTextColor(100);

doc.text(
  "Professional Property Valuation Report",
  20,
  286
);

// Built with
doc.setFont("helvetica", "bold");
doc.setTextColor(40);

doc.text("Made with", 20, 294);

// Draw red heart separately
doc.setTextColor(220, 38, 38);

// Draw a red heart
doc.setFillColor(220, 38, 38);

// Left circle
doc.circle(44, 292, 1.6, "F");

// Right circle
doc.circle(47, 292, 1.6, "F");

// Bottom triangle
doc.triangle(42.5, 292.5, 48.5, 292.5, 45.5, 296, "F");

// Continue text
doc.setTextColor(40);

doc.text("by Aman Gupta", 52, 294);

  doc.save("HouseVision_Report.pdf");

};
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
className="rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-700 p-10 shadow-2xl flex flex-col justify-between text-center" >
      <div className="flex justify-between items-center">

        <h2 className="text-3xl font-bold">

          AI Prediction

        </h2>

        <FaChartLine size={30} />

      </div>

      <div className="mt-10">

        <p className="text-white/80">

          Estimated Price

        </p>

        <h1 className="text-5xl font-black mt-3">

          {

            prediction

            ?

            `$ ${Number(prediction).toLocaleString()}`

            :

            "--"

          }

        </h1>

      </div>

      <div className="mt-10 space-y-4">

        <div className="flex justify-between">

          <span>Model</span>

          <span>XGBoost</span>

        </div>

        <div className="flex justify-between">

          <span>Accuracy</span>

          <span>90.96%</span>

        </div>

        <div className="flex justify-between">

          <span>Status</span>

          <span>

            {

              loading

              ?

              "Predicting..."

              :

              "Ready"

            }

          </span>

        </div>

      </div>


      
      {/* Top Influential Features */}
      <button
  onClick={downloadReport}
  disabled={!prediction}
  className="mt-8 w-full flex items-center justify-center gap-3 bg-white text-cyan-700 hover:bg-cyan-100 transition-all duration-300 py-4 rounded-xl font-bold text-lg disabled:opacity-50"
>
  <FaDownload />
  Download Report
</button>

<div className="mt-10">

    <h3 className="text-xl font-semibold mb-5">

        Top Influential Features

    </h3>

    <div className="space-y-5">

        <div>
            <div className="flex justify-between text-sm mb-1">
                <span>Overall Quality</span>
                <span>100%</span>
            </div>

            <div className="w-full h-2 rounded-full bg-white/20">
                <div className="w-full h-2 rounded-full bg-green-400"></div>
            </div>
        </div>

        <div>
            <div className="flex justify-between text-sm mb-1">
                <span>Living Area</span>
                <span>82%</span>
            </div>

            <div className="w-full h-2 rounded-full bg-white/20">
                <div className="w-[82%] h-2 rounded-full bg-cyan-300"></div>
            </div>
        </div>

        <div>
            <div className="flex justify-between text-sm mb-1">
                <span>Garage Area</span>
                <span>63%</span>
            </div>

            <div className="w-full h-2 rounded-full bg-white/20">
                <div className="w-[63%] h-2 rounded-full bg-blue-300"></div>
            </div>
        </div>

        <div>
            <div className="flex justify-between text-sm mb-1">
                <span>Year Built</span>
                <span>42%</span>
            </div>

            <div className="w-full h-2 rounded-full bg-white/20">
                <div className="w-[42%] h-2 rounded-full bg-yellow-300"></div>
            </div>
        </div>

        <div>
            <div className="flex justify-between text-sm mb-1">
                <span>Neighborhood</span>
                <span>25%</span>
            </div>

            <div className="w-full h-2 rounded-full bg-white/20">
                <div className="w-[25%] h-2 rounded-full bg-pink-300"></div>
            </div>
        </div>

    </div>

</div>

    </motion.div>
  );
}

export default PredictionCard;