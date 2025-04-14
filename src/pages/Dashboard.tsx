import SensorCard from "../components/SensorCard";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const sensorData = [
  { time: "08:00", temp: 22, humidity: 75 },
  { time: "10:00", temp: 24, humidity: 70 },
  { time: "12:00", temp: 27, humidity: 65 },
  { time: "14:00", temp: 29, humidity: 60 },
];

export default function Dashboard() {
  return (
    <main className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Panel de Sensores</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <SensorCard title="Temperatura" value="27°C" icon="🌡️" />
        <SensorCard title="Humedad" value="60%" icon="💧" />
        <SensorCard title="Luz Solar" value="780 lux" icon="☀️" />
      </div>

      <div className="bg-white rounded-2xl shadow p-4">
        <h3 className="text-lg font-semibold mb-2">Gráfico de Temperatura</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={sensorData}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="temp" stroke="#10B981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}
