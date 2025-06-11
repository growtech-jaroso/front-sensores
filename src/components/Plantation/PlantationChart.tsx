import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { SensorType } from "../../types/sensorType";

type ChartEntry = {
  id: string;
  name: string;
  time: string;
  value: number;
};

type Props = {
  data: ChartEntry[];
  type: SensorType;
};

const formatTimeToSpanish = (iso: string) => {
  const date = new Date(iso);
  return date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function PlantationChart({ data, type }: Props) {
  const colorMap: Record<SensorType, string> = {
    AMBIENT_TEMPERATURE: "red",
    AMBIENT_HUMIDITY: "#3b82f6",
    ATMOSPHERIC_PRESSURE: "purple",
  };

  const labelMap: Record<SensorType, string> = {
    AMBIENT_TEMPERATURE: "Temperatura (°C)",
    AMBIENT_HUMIDITY: "Humedad (%)",
    ATMOSPHERIC_PRESSURE: "Presión (mbars)",
  };

  const color = colorMap[type] ?? "gray";
  const label = labelMap[type] ?? "Valor";

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold text-green-600 mb-4">📈 {label}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="sensorColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tickFormatter={formatTimeToSpanish} />
          <YAxis />
          <Tooltip
            labelFormatter={(label) => `Hora: ${formatTimeToSpanish(label)}`}
            formatter={(value: number) => [`${value}`, label]}
          />
          <Area type="monotone" dataKey="value" stroke={color} fillOpacity={1} fill="url(#sensorColor)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
