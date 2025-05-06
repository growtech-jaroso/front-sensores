
import { useEffect, useState } from "react";
import plantationService from "../services/plantationService";
import PlantationTable from "../components/Plantation/PlantationTable";
import SummaryCard from "../components/DashboardWidgets/SummaryCard";
import LoadingPlantations from "../components/Plantation/LoadingPlantations";
import { IndicatorStatus } from "../types/indicatorStatus";
import type { Plantation } from "../interfaces/Plantation";

type DashboardProps = {
  isSidebarOpen: boolean;
};

const Dashboard = ({ isSidebarOpen }: DashboardProps) => {
  const [plantations, setPlantations] = useState<Plantation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [firstLoadDone, setFirstLoadDone] = useState(false);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState<{ total_items: number }>({ total_items: 0 });
  const [hasFetched, setHasFetched] = useState(false);

  const normalizePlantations = (data: Plantation[]): Plantation[] =>
    data.map((p) => ({
      ...p,
      status: p.status ?? IndicatorStatus.ACTIVE,
    }));

  useEffect(() => {
    const fetchPlantations = async () => {
      setLoading(true);

      const delay = firstLoadDone ? Promise.resolve() : new Promise((res) => setTimeout(res, 1200));

      try {
        const [response] = await Promise.all([
          plantationService.getPlantations({ page: currentPage, limit: 10 }),
          delay,
        ]);

        const normalized = normalizePlantations(response.data);
        setPlantations(normalized);
        setTotalPages(response.meta.total_pages);
        setMeta(response.meta);
        setHasFetched(true);

        if (!firstLoadDone) setFirstLoadDone(true);
      } catch (error) {
        console.error("Error al cargar plantaciones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlantations();
  }, [currentPage, firstLoadDone]);

  const contarPorEstado = (estado: IndicatorStatus): number => plantations.filter((p) => p.status === estado).length;

  const resumenes = [
    { titulo: "Totales", valor: meta.total_items.toString(), type: IndicatorStatus.TOTAL },
    { titulo: "Activas", valor: contarPorEstado(IndicatorStatus.ACTIVE).toString(), type: IndicatorStatus.ACTIVE },
    {
      titulo: "Inactivas",
      valor: contarPorEstado(IndicatorStatus.INACTIVE).toString(),
      type: IndicatorStatus.INACTIVE,
    },
    { titulo: "En Alerta", valor: contarPorEstado(IndicatorStatus.ALERT).toString(), type: IndicatorStatus.ALERT },
  ];

  const handleVerSensor = (plantacion: Plantation) => {
    console.log("Ver sensor de:", plantacion.name);
  };

  return (
    <main
      className={`transition-all duration-300 ease-in-out animate-fadeInSlow ${
        isSidebarOpen ? "ml-64" : "ml-20"
      } flex flex-col h-full p-4 sm:p-6`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        {resumenes.map((item) => (
          <SummaryCard key={item.titulo} title={item.titulo} value={item.valor} type={item.type} />
        ))}
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {loading && !hasFetched ? (
          <div className="flex-1 flex justify-center items-center">
            <LoadingPlantations />
          </div>
        ) : (
          <div className="flex-1 overflow-auto">
            <PlantationTable
              plantations={plantations}
              onVerSensor={handleVerSensor}
              loading={loading}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
        <style>
          {`
          @keyframes fadeInSlow {
            0% { opacity: 0; transform: translateY(12px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          .animate-fadeInSlow {
            animation: fadeInSlow 0.5s ease-out;
          }
        `}
        </style>
      </div>
    </main>
  );
};

export default Dashboard;
