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

// Interfaz para los datos
type PlantationReading = {
  id: string;
  name: string;
  time: string;
  temperature: number;
  humidity: number;
};

// Props del componente
type PlantationChartProps = {
  data: PlantationReading[];
};

// Formatear la hora al estilo español (HH:mm)
const formatTimeToSpanish = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const PlantationChart = ({ data }: PlantationChartProps) => {
  return (
    <div className="mt-10 bg-white rounded-2xl shadow p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-green-600 mb-4">📊 Temperatura y Humedad por Hora</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="tempColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="red" stopOpacity={0.8} />
              <stop offset="95%" stopColor="red" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="humColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tickFormatter={formatTimeToSpanish} />
          <YAxis />
          <Tooltip
            labelFormatter={(label) => `Hora: ${formatTimeToSpanish(label)}`}
            formatter={(value: number, name: string) => {
              const labelMap: Record<string, string> = {
                temperature: "Temperatura (°C)",
                humidity: "Humedad (%)",
              };
              return [`${value}`, labelMap[name] || name];
            }}
          />
          <Legend
            formatter={(value) => {
              const labelMap: Record<string, string> = {
                temperature: "Temperatura (°C)",
                humidity: "Humedad (%)",
              };
              return labelMap[value] || value;
            }}
          />
          <Area
            type="monotone"
            dataKey="temperature"
            stroke="red"
            fillOpacity={1}
            fill="url(#tempColor)"
          />
          <Area
            type="monotone"
            dataKey="humidity"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#humColor)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlantationChart;
