type PaginationProps = {
  currentPage: number;
  totalPages: number;
  loading: boolean;
  onPageChange: (page: number) => void;
};

export default function PaginationTable({ currentPage, totalPages, loading, onPageChange }: PaginationProps) {
  const handlePrevious = () => {
    if (!loading && currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (!loading && currentPage < totalPages) onPageChange(currentPage + 1);
  };

  if (totalPages <= 1) return null; // Solo mostrar si hay más de una página

  return (
    <div className="flex justify-center items-center mt-6 space-x-4 text-sm">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1 || loading}
        className={`px-4 py-2 rounded-lg border transition ${
          currentPage === 1 || loading
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white hover:bg-gray-100 text-gray-700 border-gray-300"
        }`}
      >
        Anterior
      </button>

      <span className="text-gray-700 font-medium">
        Página {currentPage} de {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages || loading}
        className={`px-4 py-2 rounded-lg border transition ${
          currentPage === totalPages || loading
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white hover:bg-gray-100 text-gray-700 border-gray-300"
        }`}
      >
        Siguiente
      </button>
    </div>
  );
}
