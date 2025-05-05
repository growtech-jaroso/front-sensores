type PaginationProps = {
  currentPage: number;
  totalPages: number;
  loading: boolean;
  onPageChange: (page: number) => void;
};

export default function PaginationTable({ currentPage, totalPages, loading, onPageChange }: PaginationProps) {
  const getPageNumbers = () => {
    const delta = 2;
    const pages: number[] = [];

    const start = Math.max(2, currentPage - delta);
    const end = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1); // always show first

    if (start > 2) pages.push(-1); // ellipsis

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push(-1); // ellipsis

    if (totalPages > 1) pages.push(totalPages); // always show last

    return pages;
  };

  if (totalPages <= 1) return null;

  const handleClick = (page: number) => {
    if (!loading && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center items-center mt-6 gap-2 text-sm flex-wrap">
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        className={`px-3 py-1 rounded border ${
          currentPage === 1 || loading
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
        }`}
      >
        «
      </button>

      {getPageNumbers().map((page, idx) =>
        page === -1 ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => handleClick(page)}
            disabled={loading}
            className={`px-3 py-1 rounded border ${
              currentPage === page
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
        className={`px-3 py-1 rounded border ${
          currentPage === totalPages || loading
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
        }`}
      >
        »
      </button>
    </div>
  );
}
