export default function LinkCategory() {
  return (
    <>
      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          className="flex items-center rounded-2xl border border-solid border-gray-400 bg-white px-8 py-3.5 text-[12px] font-medium text-[#280559] shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 max-sm:px-4 max-sm:py-2 max-sm:text-[10px]"
        >
          <i className="fa-duotone fa-solid fa-filter pr-2"></i>
          Apply
        </button>
        <button
          type="button"
          className="flex items-center rounded-2xl border border-solid border-gray-400 bg-white px-8 py-3.5 text-[12px] font-medium text-[#280559] shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 max-sm:px-4 max-sm:py-2 max-sm:text-[10px]"
        >
          <i className="fa-solid fa-file-export pr-2"></i>
          Export
        </button>
        <button
          type="button"
          className="flex items-center rounded-2xl border border-solid border-gray-400 bg-white px-8 py-3.5 text-[12px] font-medium text-[#280559] shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 max-sm:px-4 max-sm:py-2 max-sm:text-[10px]"
        >
          <i className="fa-solid fa-print pr-2"></i>
          Print
        </button>
      </div>
    </>
  );
}
