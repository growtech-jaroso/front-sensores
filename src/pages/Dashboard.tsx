import PlantationTable from "../components/Plantation/PlantationTable";
import SummaryCard from "../components/DashboardWidgets/SummaryCard";
//import PlantationDonut from "../components/PlantationDonut";
import ProgressBar from "../components/DashboardWidgets/ProgressBar";
import PlantationChart from "../components/Plantation/PlantationChart";

const plantations = [
  {
    id: "1",
    nombre: "Tomates",
    ubicacion: "Invernadero 1",
    estado: "Activa",
    temperatura: 25,
    humedad: 70,
    hora: "08:00",
  },
  {
    id: "2",
    nombre: "Lechugas",
    ubicacion: "Invernadero 2",
    estado: "Alerta",
    temperatura: 30,
    humedad: 50,
    hora: "09:00",
  },

  {
    id: "3",
    nombre: "Fresas",
    ubicacion: "Invernadero 3",
    estado: "Inactiva",
    temperatura: 20,
    humedad: 60,
    hora: "10:00",
  },
  {
    id: "4",
    nombre: "Pepinos",
    ubicacion: "Invernadero 4",
    estado: "Inactiva",
    temperatura: 22,
    humedad: 65,
    hora: "11:00",
  },

  {
    id: "5",
    nombre: "Tomates",
    ubicacion: "Invernadero 5",
    estado: "Activa",
    temperatura: 25,
    humedad: 70,
    hora: "12:00",
  },

  {
    id: "6",
    nombre: "Lechugas",
    ubicacion: "Invernadero 6",
    estado: "Activa",
    temperatura: 30,
    humedad: 50,
    hora: "13:00",
  },

  {
    id: "7",
    nombre: "Fresas",
    ubicacion: "Invernadero 7",
    estado: "Activa",
    temperatura: 20,
    humedad: 60,
    hora: "14:00",
  },
  {
    id: "8",
    nombre: "Pepinos",
    ubicacion: "Invernadero 8",
    estado: "Activa",
    temperatura: 22,
    humedad: 65,
    hora: "15:00",
  },
];

export default function Dashboard() {
  return (
    <main className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <SummaryCard title="Total Plantaciones" value="12" />
        <SummaryCard title="Activas" value="8" />
        <SummaryCard title="Inactivas" value="3" />
        <SummaryCard title="Alertas" value="1" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PlantationTable plantations={plantations} />
          <PlantationChart data={plantations} />
        </div>
        <div className="flex flex-col gap-6">
          <ProgressBar label="Humedad Promedia" value={68} />
          <ProgressBar label="Temperatura Promedia" value={75} />
          <ProgressBar label="Luz Solar Promedia" value={82} />
        </div>
      </div>
    </main>
  );
}