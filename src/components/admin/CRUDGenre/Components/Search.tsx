export default function Search() {
  return (
    <>
      <form className="flex items-center" >
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <button
            type="submit"
            className="absolute inset-y-0 left-0 flex items-center pl-3"
          >
            <svg
              className="h-9 w-9 text-gray-800 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <input
            type="text"
            id="simple-search"
            className="block shadow-xl  w-full rounded-2xl border border-gray-300 bg-gray-50 p-4 pl-14 text-xl text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Search"
            required
          />
        </div>
      </form>
    </>
  );
}
