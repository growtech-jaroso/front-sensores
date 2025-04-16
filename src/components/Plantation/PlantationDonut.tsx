import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Activas", value: 8 },
  { name: "Inactivas", value: 3 },
  { name: "Alertas", value: 1 },
];

const COLORS = ["#16a34a", "#9ca3af", "#dc2626"];

export default function PlantationDonut() {
  return (
    <div className="bg-white shadow rounded-2xl p-4 border border-gray-100">
      <h4 className="text-sm font-semibold text-gray-600 mb-2">Distribución</h4>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={60}
            fill="#10B981"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
