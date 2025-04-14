import React from "react";

type SensorCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  color?: string; // Ej: "bg-green-100 text-green-600"
};

export default function SensorCard({
  title,
  value,
  icon,
  color = "bg-green-100 text-green-600",
}: SensorCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md p-5 transition-all duration-300 flex items-center gap-4">
      <div className={`p-3 rounded-full ${color} flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <h4 className="text-sm text-gray-500">{title}</h4>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
