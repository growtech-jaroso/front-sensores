import { IndicatorType } from "../../types/indicatorTypes";

interface ProgressBarProps {
  label: string;
  value: number;
  type: IndicatorType; // usamos el enum  
}

const ProgressBarCard = ({ label, value, type }: ProgressBarProps) => {
  const getBarColor = () => {
    switch (type) {
      case IndicatorType.HUMIDITY:
        return "bg-blue-500";
      case IndicatorType.TEMPERATURE:
        return "bg-red-500";
      case IndicatorType.LIGHT:
        return "bg-yellow-500";
      case IndicatorType.PRESSURE:
        return "bg-purple-500";
      case IndicatorType.WINDSPEED:
        return "bg-cyan-500";
      case IndicatorType.CO2:
        return "bg-orange-500";
      case IndicatorType.LUMINOSITY:
        return "bg-lime-500";
      default:
        return "bg-green-500";
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold text-gray-700">{label}</span>
        <span className="text-sm font-xl text-gray-900">{value}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all duration-500 ease-in-out ${getBarColor()}`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};


export default ProgressBarCard;
