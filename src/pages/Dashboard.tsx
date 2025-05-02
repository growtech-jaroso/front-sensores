import { useState } from "react";
import LoadingPlantations from "../components/Plantation/LoadingPlantations";
import PlantationTable from "../components/Plantation/PlantationTable";
import SummaryCard from "../components/DashboardWidgets/SummaryCard";
import type { Plantation } from "../interfaces/Plantation";
import { IndicatorStatus } from "../types/indicatorStatus";

type DashboardProps = {
  isSidebarOpen: boolean;
};

const Dashboard = ({ isSidebarOpen }: DashboardProps) => {
  const [plantations, setPlantations] = useState<Plantation[]>([]);

  const contarPorEstado = (estado: IndicatorStatus): number => plantations.filter((p) => p.status === estado).length;

  const resumenes = [
    { titulo: "Plantaciones Totales", valor: plantations.length, tipo: IndicatorStatus.TOTAL },
    { titulo: "Activas", valor: contarPorEstado(IndicatorStatus.ACTIVE), tipo: IndicatorStatus.ACTIVE },
    { titulo: "Inactivas", valor: contarPorEstado(IndicatorStatus.INACTIVE), tipo: IndicatorStatus.INACTIVE },
    { titulo: "En Alerta", valor: contarPorEstado(IndicatorStatus.ALERT), tipo: IndicatorStatus.ALERT },
  ];

  const handleVerSensor = (plantacion: Plantation) => {
    console.log("Ver sensor de:", plantacion.name);
  };

  if (!plantations.length) {
    return <LoadingPlantations onDataReady={setPlantations} />;
  }

  return (
    <main
      className={`transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "ml-64" : "ml-20"
      } flex flex-col h-full max-h-[calc(100vh-100px)]`} // Ajusta según altura del header
    >
      <div className="px-4 sm:px-6 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
          {resumenes.map((item) => (
            <SummaryCard key={item.titulo} title={item.titulo} value={item.valor.toString()} type={item.tipo} />
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-6">
        <PlantationTable plantations={plantations} onVerSensor={handleVerSensor} />
      </div>
    </main>
  );
};

export default Dashboard;

/* Indicadores en columna o fila según el ancho
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <ProgressBar label="Humedad Promedia" value={68} type={IndicatorType.HUMIDITY} />
              <ProgressBar label="Temperatura Promedia" value={75} type={IndicatorType.TEMPERATURE} />
              <ProgressBar label="Luz Solar Promedia" value={90} type={IndicatorType.LIGHT} />
              <ProgressBar label="Presión Promedia" value={80} type={IndicatorType.PRESSURE} />
              <ProgressBar label="Velocidad Viento Promedia" value={85} type={IndicatorType.WINDSPEED} />
              <ProgressBar label="CO2 Promedio" value={70} type={IndicatorType.CO2} />
              <ProgressBar label="Luminosidad Promedio" value={80} type={IndicatorType.LUMINOSITY} />
            </div> */
