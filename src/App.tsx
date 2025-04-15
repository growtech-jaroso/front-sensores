// App.tsx
import Layout from "./layout/Layout";
import SensorCard from "./components/SensorCard";
import { Thermometer, Droplets } from "lucide-react";

export default function App() {
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <SensorCard
          title="Temperatura"
          value="26°C"
          icon={<Thermometer className="w-6 h-6" />}
          color="bg-red-100 text-red-600"
        />
        <SensorCard
          title="Humedad"
          value="52%"
          icon={<Droplets className="w-6 h-6" />}
          color="bg-blue-100 text-blue-600"
        />
        {/* He puesto dos de ejemplo*/}
      </div> 
    </Layout>
  );
}
