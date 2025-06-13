import {ArrowLeft} from "lucide-react";
import {useNavigate} from "react-router-dom";

interface Props {
  className?: string;
}

export default function GoBackButton({className = "mb-6 "}: Props) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`flex items-center text-sm text-gray-600 cursor-pointer hover:text-green-600 transition ${className}`}
    >
      <ArrowLeft className="w-4 h-4 mr-1" /> Volver
    </button>
  )
}