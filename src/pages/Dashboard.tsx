import { useEffect, useState } from "react";
import plantationService from "../services/plantationService";
import PlantationTable from "../components/Plantation/PlantationTable";
import SummaryCard from "../components/DashboardWidgets/SummaryCard";
import LoadingPlantations from "../components/Plantation/LoadingPlantations";
import { IndicatorStatus } from "../types/indicatorStatus";
import type { Plantation } from "../interfaces/Plantation";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {useDebounce} from "use-debounce";

const Dashboard = () => {
  const { isAdmin, isSupport } = useAuth();
  const navigate = useNavigate();

  if (isAdmin || isSupport) {
    navigate("/admin/dashboard");
  }

  const [plantations, setPlantations] = useState<Plantation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [firstLoadDone, setFirstLoadDone] = useState(false);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState<{ total_items: number }>({ total_items: 0 });
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 400);

  const normalizePlantations = (data: Plantation[]): Plantation[] =>
    data.map((p) => ({
      ...p,
      status: p.status ?? IndicatorStatus.ONLINE,
    }));

  useEffect(() => {
    const fetchPlantations = async () => {
      setLoading(true);

      try {
        const response = await plantationService.getPlantations({ page: currentPage, limit: 10, search: debouncedSearch })

        const normalized = normalizePlantations(response.data);
        setPlantations(normalized);
        setTotalPages(response.meta.total_pages);
        setMeta(response.meta);

        if (!firstLoadDone) setFirstLoadDone(true);
      } catch (error) {
        console.error("Error al cargar plantaciones:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlantations();
  }, [currentPage, firstLoadDone, debouncedSearch]);

  const contarPorEstado = (estado: IndicatorStatus): number => plantations.filter((p) => p.status === estado).length;

  const resumenes = [
    { titulo: "Totales", valor: meta.total_items.toString(), type: IndicatorStatus.TOTAL },
    { titulo: "Activas", valor: contarPorEstado(IndicatorStatus.ONLINE).toString(), type: IndicatorStatus.ONLINE },
    { titulo: "En Alerta", valor: contarPorEstado(IndicatorStatus.OFFLINE).toString(), type: IndicatorStatus.OFFLINE },
  ];

  const handleVerSensor = (plantacion: Plantation) => {
    console.log("Ver sensor de:", plantacion.name);
  };

  return (
    <div className="flex flex-col flex-grow min-h-full animate-fadeInSlow">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {resumenes.map((item) => (
          <SummaryCard key={item.titulo} title={item.titulo} value={item.valor} type={item.type} />
        ))}
      </div>

      <div className="flex-1 flex flex-col">
        {loading ? (
          <div className="flex-1 flex justify-center items-center">
            <LoadingPlantations />
          </div>
        ) : (
          <div className="flex-1">
            <PlantationTable
              plantations={plantations}
              onVerSensor={handleVerSensor}
              loading={loading}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              search={search}
              setSearch={setSearch}
            />
          </div>
        )}
      </div>

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
  );
};

export default Dashboard;
