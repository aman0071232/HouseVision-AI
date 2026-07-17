import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

export default function NeighborhoodChart({ predictions }) {
  const counts = {};

  predictions.forEach((item) => {
    const area = item.input.Neighborhood;

    counts[area] = (counts[area] || 0) + 1;
  });

  const data = Object.entries(counts)
    .map(([name, value]) => ({
      neighborhood: name,
      count: value,
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-800 h-[420px]">

      <h2 className="text-2xl font-bold mb-8">
        Neighborhood Analysis
      </h2>

      <ResponsiveContainer width="100%" height="90%">

        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: -20,
            bottom: 20,
          }}
        >

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#334155"
          />

          <XAxis
            dataKey="neighborhood"
            stroke="#94a3b8"
          />

          <YAxis
            stroke="#94a3b8"
          />

          <Tooltip />

          <Bar
            dataKey="count"
            fill="#06b6d9"
            radius={[6, 6, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}