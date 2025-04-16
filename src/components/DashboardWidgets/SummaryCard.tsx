interface SummaryCardProps {
  title: string;
  value: string;
  type?: "total" | "activas" | "inactivas" | "alertas"; 
}

const SummaryCard = ({ title, value, type }: SummaryCardProps) => {
  // Función para determinar el color del texto según el tipo
  const obtenerColorTexto = (type?: SummaryCardProps["type"]) => {
    switch (type) {
      case "activas":
        return "text-green-600";
      case "inactivas":
        return "text-gray-500";
      case "alertas":
        return "text-red-600";
      case "total":
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
      <span className={`text-2xl font-bold ${obtenerColorTexto(type)}`}>{value}</span>
    </div>
  );
};

export default SummaryCard;
