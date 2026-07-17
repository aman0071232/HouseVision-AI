import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

function PriceDistributionChart({ predictions }) {

  const ranges = [
    { range: "<100K", count: 0 },
    { range: "100-200K", count: 0 },
    { range: "200-300K", count: 0 },
    { range: "300-400K", count: 0 },
    { range: "400K+", count: 0 }
  ];

  predictions.forEach((item) => {

    const price = item.predicted_price;

    if (price < 100000)
      ranges[0].count++;

    else if (price < 200000)
      ranges[1].count++;

    else if (price < 300000)
      ranges[2].count++;

    else if (price < 400000)
      ranges[3].count++;

    else
      ranges[4].count++;

  });

  return (

    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-lg">

      <h2 className="text-2xl font-bold mb-8">

        Price Distribution

      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        
        <BarChart data={ranges}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="range" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="count"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}

export default PriceDistributionChart;