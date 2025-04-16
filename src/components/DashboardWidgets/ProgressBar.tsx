interface ProgressBarProps {
  label: string;
  value: number;
  type: "temperature" | "humidity" | "light" | "pressure" | "windSpeed" | "co2" | "luminosity"; 
}

const ProgressBarCard = ({ label, value, type }: ProgressBarProps) => {
  // Función para obtener el color según el tipo de indicador
  const getBarColor = () => {
    if (type === "humidity") return "bg-blue-500";  
    if (type === "temperature") return "bg-red-500"; 
    if (type === "light") return "bg-yellow-500";
    if (type === "pressure") return "bg-purple-500";   
    if (type === "windSpeed") return "bg-cyan-500";     
    if (type === "co2") return "bg-orange-500";         
    if (type === "luminosity") return "bg-lime-500";    
    return "bg-green-500";  
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col space-y-4">
      {/* Título y valor */}
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold text-gray-700">{label}</span>
        <span className="text-sm font-xl text-gray-900">{value}%</span>
      </div>

      {/* Barra de progreso */}
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all duration-500 ease-in-out ${getBarColor()}`}
          style={{ width: `${value}%` }} // Ajuste de ancho de la barra según el valor
        ></div>
      </div>
    </div>
  );
};

export default ProgressBarCard;
