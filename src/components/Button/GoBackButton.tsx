import {ArrowLeft} from "lucide-react";
import {useNavigate} from "react-router-dom";

export default function GoBackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="mb-6 flex items-center text-sm text-gray-600 cursor-pointer hover:text-green-600 transition"
    >
      <ArrowLeft className="w-4 h-4 mr-1" /> Volver
    </button>
  )
}