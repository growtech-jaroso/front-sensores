type ProgressBarProps = {
    label: string;
    value: number;
  };
  
  const getColorByLabel = (label: string) => {
    switch (label.toLowerCase()) {
      case "humedad promedia":
        return "bg-blue-500"; 
      case "luz solar promedia":
        return "bg-yellow-400"; 
      case "temperatura promedia":
        return "bg-red-500"; 
      default:
        return "bg-green-500"; // Verde por defecto
    }
  };
  
  export default function ProgressBar({ label, value }: ProgressBarProps) {
    const color = getColorByLabel(label);
  
    return (
      <div className="bg-white shadow rounded-2xl p-4 border border-gray-100">
        <h4 className="text-sm text-gray-600 font-medium mb-2">{label}</h4>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`${color} h-3 rounded-full transition-all duration-500`}
            style={{ width: `${value}%` }}
          ></div>
        </div>
        <span className="text-xs text-gray-500 mt-1 block">{value}%</span>
      </div>
    );
  }
  