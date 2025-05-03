import { useEffect, useState } from "react";
import axios from "axios";
import plantationService from "../services/plantationService";
import PlantationTable from "../components/Plantation/PlantationTable";
import SummaryCard from "../components/DashboardWidgets/SummaryCard";
import { IndicatorStatus } from "../types/indicatorStatus";
import type { Plantation } from "../interfaces/Plantation";

type DashboardProps = {
  isSidebarOpen: boolean;
};

const Dashboard = ({ isSidebarOpen }: DashboardProps) => {
  const [plantations, setPlantations] = useState<Plantation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  const normalizePlantations = (data: Plantation[]): Plantation[] =>
    data.map((p) => ({
      ...p,
      status: p.status ?? IndicatorStatus.ACTIVE,
    }));

  useEffect(() => {
    const fetchPlantations = async () => {
      setLoading(true);
      try {
        const response = await plantationService.getPlantations({
          page: currentPage,
          limit: 10,
        });

        const normalized = normalizePlantations(response.data);
        setPlantations(normalized);
        setTotalPages(response.meta.total_pages);
        setHasFetched(true);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios Error al cargar plantaciones:", {
            message: error.message,
            url: error.config?.url,
            status: error.response?.status,
            data: error.response?.data,
          });
        } else {
          console.error("Error inesperado al cargar plantaciones:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPlantations();
  }, [currentPage]);

  const contarPorEstado = (estado: IndicatorStatus): number => plantations.filter((p) => p.status === estado).length;

  const resumenes = [
    { titulo: "Totales", valor: plantations.length.toString(), type: IndicatorStatus.TOTAL },
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
      className={`transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "ml-64" : "ml-20"
      } flex flex-col h-full p-4 sm:p-6`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        {resumenes.map((item) => (
          <SummaryCard key={item.titulo} title={item.titulo} value={item.valor} type={item.type} />
        ))}
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          <PlantationTable
            plantations={plantations}
            onVerSensor={handleVerSensor}
            loading={loading && !hasFetched}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
