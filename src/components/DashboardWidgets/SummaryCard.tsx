type SummaryCardProps = {
    title: string;
    value: string;
  };
  
  export default function SummaryCard({ title, value }: SummaryCardProps) {
    return (
      <div className="bg-white shadow rounded-2xl p-4 border border-gray-100">
        <h4 className="text-sm text-gray-500">{title}</h4>
        <p className="text-2xl font-semibold text-green-600 mt-1">{value}</p>
      </div>
    );
  }
  