import { useState } from "react";
import LoadingPlantations from "../components/Plantation/LoadingPlantations";
import PlantationTable from "../components/Plantation/PlantationTable";
import SummaryCard from "../components/DashboardWidgets/SummaryCard";
import ProgressBar from "../components/DashboardWidgets/ProgressBar";
import PlantationChart from "../components/Plantation/PlantationChart";
import type { Plantation } from "../interfaces/Plantation";
import { IndicatorType } from "../types/indicatorTypes";
import { IndicatorStatus } from "../types/indicatorStatus";

type DashboardProps = {
  isSidebarOpen: boolean;
};

const Dashboard = ({ isSidebarOpen }: DashboardProps) => {
  const [plantations, setPlantations] = useState<Plantation[]>([]);

  // Función para contar plantaciones por estado con tipado correcto
  const contarPorEstado = (estado: IndicatorStatus): number => {
    return plantations.filter((p) => p.status === estado).length;
  };

  // Datos para las tarjetas resumen
  const resumenes = [
    { titulo: "Plantaciones Totales", valor: plantations.length, tipo: IndicatorStatus.TOTAL },
    { titulo: "Activas", valor: contarPorEstado(IndicatorStatus.ACTIVE), tipo: IndicatorStatus.ACTIVE },
    { titulo: "Inactivas", valor: contarPorEstado(IndicatorStatus.INACTIVE), tipo: IndicatorStatus.INACTIVE },
    { titulo: "En Alerta", valor: contarPorEstado(IndicatorStatus.ALERT), tipo: IndicatorStatus.ALERT },
  ];

  // Acción de ver sensor
  const handleVerSensor = (plantacion: Plantation) => {
    console.log("Ver sensor de:", plantacion.name);
  };

  return (
    <>
      {!plantations.length ? (
        <LoadingPlantations onDataReady={setPlantations} />
      ) : (
        <main
          className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? "ml-64" : "ml-20"} p-6 space-y-6`} // Ajuste dinámico según estado del sidebar
        >
          {/* Tarjetas resumen */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {resumenes.map((item) => (
              <SummaryCard
                key={item.titulo}
                title={item.titulo}
                value={item.valor.toString()}
                type={item.tipo}
              />
            ))}
          </div>

          {/* Tabla + Gráfico */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <PlantationTable plantations={plantations} onVerSensor={handleVerSensor} />
              <PlantationChart
                data={plantations.map((plantation) => ({
                  ...plantation,
                  time: new Date().toISOString(),
                }))}
              />
            </div>

            {/* Indicadores de progreso */}
            <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:gap-4 lg:flex-col">
              <ProgressBar label="Humedad Promedia" value={68} type={IndicatorType.HUMIDITY} />
              <ProgressBar label="Temperatura Promedia" value={75} type={IndicatorType.TEMPERATURE} />
              <ProgressBar label="Luz Solar Promedia" value={90} type={IndicatorType.LIGHT} />
              <ProgressBar label="Presión Promedia" value={80} type={IndicatorType.PRESSURE} />
              <ProgressBar label="Velocidad Viento Promedia" value={85} type={IndicatorType.WINDSPEED} />
              <ProgressBar label="CO2 Promedio" value={70} type={IndicatorType.CO2} />
              <ProgressBar label="Luminosidad Promedio" value={80} type={IndicatorType.LUMINOSITY} />
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Dashboard;
