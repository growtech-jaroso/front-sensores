import { IndicatorStatus } from "../../types/indicatorStatus";

interface SummaryCardProps {
  title: string;
  value: string;
  type?: IndicatorStatus
}

const SummaryCard = ({ title, value, type }: SummaryCardProps) => {
  // Función para determinar el color del texto según el tipo
  const getDinamicColorText = (type?: SummaryCardProps["type"]) => {
    switch (type) {
      case IndicatorStatus.ACTIVE:
        return "text-green-600";
      case IndicatorStatus.INACTIVE:
        return "text-gray-500";
      case IndicatorStatus.ALERT:
        return "text-red-600";
      case IndicatorStatus.TOTAL:
        return "text-green-600";
      default:
        return "text-green-600";
    }
  
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col justify-between">
      {/* Título del resumen */}
      <span className="text-sm text-gray-500">{title}</span>

      {/* Valor mostrado con color dinámico */}
      <span className={`text-2xl font-bold ${getDinamicColorText(type)}`}>{value}</span>
    </div>
  );
};

export default SummaryCard;
