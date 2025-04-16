import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type PlantationReading = {
  id: string;
  nombre: string;
  hora: string;
  temperatura: number;
  humedad: number;
};

type PlantationChartProps = {
  data: PlantationReading[];
};

const PlantationChart: React.FC<PlantationChartProps> = ({ data }) => {
  return (
    <div className="mt-10 bg-white rounded-2xl shadow p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-green-600 mb-4">📊 Temperatura y Humedad por Hora</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="tempColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="red" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#red" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="humColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hora" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="temperatura"
            stroke="red"
            fillOpacity={1}
            fill="url(#tempColor)"
            name="Temperatura (°C)"
          />
          <Area
            type="monotone"
            dataKey="humedad"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#humColor)"
            name="Humedad (%)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlantationChart;
