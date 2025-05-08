import { Link } from "react-router-dom";
import { ArrowLeftCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-center p-6">
      <h1 className="text-6xl font-bold text-green-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Página no encontrada</h2>
      <p className="text-gray-600 mb-6">Lo sentimos, la página que estás buscando no existe o fue movida.</p>

      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
      >
        <ArrowLeftCircle className="w-5 h-5" />
        Volver al inicio
      </Link>
    </div>
  );
}
