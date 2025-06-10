import {Link, type To} from "react-router-dom";
import {type ReactNode} from "react";

interface Props {
  title: string;
  paragraph: string;
  to: To;
  icon: ReactNode;
}

export default function DashboardLink({ title, paragraph, to, icon }: Props) {
  return (
    <Link
      to={to}
      className="bg-white shadow-md rounded-2xl border border-gray-200 p-5 hover:shadow-xl hover:border-green-500 transition-all group"
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="bg-green-100 p-3 rounded-xl">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">
        {paragraph}
      </p>
    </Link>
  )
}