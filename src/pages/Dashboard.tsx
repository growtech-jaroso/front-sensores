import React, { useState } from "react";
import LoadingPlantations from "../components/Plantation/LoadingPlantations";
import PlantationTable from "../components/Plantation/PlantationTable";
import SummaryCard from "../components/DashboardWidgets/SummaryCard";
import ProgressBar from "../components/DashboardWidgets/ProgressBar";
import PlantationChart from "../components/Plantation/PlantationChart";
import type { Plantation } from "../interfaces/Plantation";

const Dashboard = () => {
  const [plantations, setPlantations] = useState<Plantation[]>([]);

  // Función para contar plantaciones por estado
  const contarPorEstado = (estado: string): number => {
    return plantations.filter((p) => p.status === estado).length;
  };

  // Función para manejar acción de ver sensores
  const handleVerSensor = (plantacion: Plantation) => {
    console.log("Ver sensor de:", plantacion.name);
  };

  // Datos para las tarjetas resumen
  const resumenes = [
    { titulo: "Total de Plantaciones", valor: plantations.length, tipo: "total" },
    { titulo: "Activas", valor: contarPorEstado("Activa"), tipo: "activas" },
    { titulo: "Inactivas", valor: contarPorEstado("Inactiva"), tipo: "inactivas" },
    { titulo: "En Alerta", valor: contarPorEstado("Alerta"), tipo: "alertas" },
  ];

  return (
    <>
      {!plantations.length ? (
        <LoadingPlantations onDataReady={setPlantations} />
      ) : (
        <main className="p-6 space-y-6">
          {/* Tarjetas resumen */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {resumenes.map((item) => (
              <SummaryCard
                key={item.titulo}
                title={item.titulo}
                value={item.valor.toString()}
                type={item.tipo as "total" | "activas" | "inactivas" | "alertas"}
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
            <div className="flex flex-col gap-6">
              <ProgressBar label="Humedad Promedia" value={68} type={"humidity"} />
              <ProgressBar label="Temperatura Promedia" value={75} type={"temperature"} />
              <ProgressBar label="Luz Solar Promedia" value={90} type={"light"} />
              <ProgressBar label="Presión Promedia" value={80} type={"pressure"} />
              <ProgressBar label="Velocidad Viento Promedia" value={85} type={"windSpeed"} />
              <ProgressBar label="CO2 Promedio" value={70} type={"co2"} />
              <ProgressBar label="Luminosidad Promedio" value={80} type={"luminosity"} />
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Dashboard;
