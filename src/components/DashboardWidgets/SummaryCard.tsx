import { IndicatorStatus } from "../../types/indicatorStatus";
import CountUp from "react-countup";

interface SummaryCardProps {
  title: string;
  value: string;
  type?: IndicatorStatus;
}

const SummaryCard = ({ title, value, type }: SummaryCardProps) => {
  const getColor = (type?: SummaryCardProps["type"]) => {
    switch (type) {
      case IndicatorStatus.ONLINE:
        return "text-green-600";
      case IndicatorStatus.OFFLINE:
        return "text-red-500";

      case IndicatorStatus.TOTAL:
        return "text-gray-700";
      default:
        return "text-green-600";
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 flex flex-col justify-between">
      <span className="text-sm text-gray-500">{title}</span>
      <span className={`text-2xl font-bold ${getColor(type)}`}>
        <CountUp end={parseInt(value)} duration={1.2} separator="." />
      </span>
    </div>
  );
};

export default SummaryCard;
