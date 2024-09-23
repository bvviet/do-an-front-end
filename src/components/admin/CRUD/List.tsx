import Search from "./Search";

export default function ListProducts() {
  const items = [
    {
      Name: "Apple",
      Color: "Black",
      Category: "SmartPhone",
      Accessories: "Yes",
      Available: "Yes",
      Price: "200.000.000",
      Weight: "1kg",
    },
    {
      Name: "Apple",
      Color: "Black",
      Category: "SmartPhone",
      Accessories: "Yes",
      Available: "Yes",
      Price: "200.000.000",
      Weight: "1kg",
    },
    {
      Name: "Apple",
      Color: "Black",
      Category: "SmartPhone",
      Accessories: "Yes",
      Available: "Yes",
      Price: "200.000.000",
      Weight: "1kg",
    },
    {
      Name: "Apple",
      Color: "Black",
      Category: "SmartPhone",
      Accessories: "Yes",
      Available: "Yes",
      Price: "200.000.000",
      Weight: "1kg",
    },
    {
      Name: "Apple",
      Color: "Black",
      Category: "SmartPhone",
      Accessories: "Yes",
      Available: "Yes",
      Price: "200.000.000",
      Weight: "1kg",
    },
    {
      Name: "Apple",
      Color: "Black",
      Category: "SmartPhone",
      Accessories: "Yes",
      Available: "Yes",
      Price: "200.000.000",
      Weight: "1kg",
    },
    {
      Name: "Apple",
      Color: "Black",
      Category: "SmartPhone",
      Accessories: "Yes",
      Available: "Yes",
      Price: "200.000.000",
      Weight: "1kg",
    },
  ];
  return (
    <>
      <div className="relative overflow-x-auto bg-white py-8 shadow-md sm:rounded-3xl">
        <div className="mx-auto flex max-w-[98%] items-center rounded-3xl bg-[#F5F5F5]">
          <div className="w-[900px] p-6">
            <Search />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-2xl border border-solid border-gray-400 bg-white px-8 py-3.5 text-[12px] font-medium text-[#280559] shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100"
            >
              <i className="fa-duotone fa-solid fa-filter pr-2"></i>
              Apply
            </button>
            <button
              type="button"
              className="rounded-2xl border border-solid border-gray-400 bg-white px-8 py-3.5 text-[12px] font-medium text-[#280559] shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100"
            >
              <i className="fa-solid fa-file-export"></i>
              Export
            </button>
            <button
              type="button"
              className="rounded-2xl border border-solid border-gray-400 bg-white px-8 py-3.5 text-[12px] font-medium text-[#280559] shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100"
            >
              <i className="fa-solid fa-print"></i>
              Print
            </button>
          </div>
        </div>

        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
          <thead className="text-xs text-[#92929D] dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-[14px]">
              <th scope="col" className="p-6">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="">
                Product name
              </th>
              <th scope="col" className="pb-8">
                Color
              </th>
              <th scope="col" className="pb-8">
                Category
              </th>
              <th scope="col" className="pb-8">
                Accessories
              </th>
              <th scope="col" className="pb-8">
                Available
              </th>
              <th scope="col" className="pb-8">
                Price
              </th>
              <th scope="col" className="pb-8">
                Weight
              </th>
              <th scope="col" className="pb-8">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr className="border-b bg-white text-[16px] hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                <td className="w-4 p-6">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-8 font-medium text-gray-900 dark:text-white"
                >
                  {item.Name}
                </th>
                <td className="py-4 font-medium text-gray-900">{item.Color}</td>
                <td className="py-4 font-medium text-gray-900">
                  {item.Category}
                </td>
                <td className="py-4 font-medium text-gray-900">
                  {item.Accessories}
                </td>
                <td className="py-4 font-medium text-gray-900">
                  {item.Available}
                </td>
                <td className="py-4 font-medium text-gray-900">{item.Price}</td>
                <td className="py-4 font-medium text-gray-900">
                  {item.Weight}
                </td>
                <td className="flex items-center gap-2">
                  <a
                    href="#"
                    className="rounded-full border border-solid border-red-500 bg-white px-8 py-3.5 text-[12px] font-medium text-red-500 shadow-lg hover:bg-red-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-100"
                  >
                    Remove
                  </a>
                  <a
                    href="#"
                    className="rounded-full border border-solid border-green-500 bg-white px-8 py-3.5 text-[12px] font-medium text-green-500 shadow-lg hover:bg-green-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-100"
                  >
                    Update
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mx-auto flex h-16 max-w-[98%] items-center justify-between rounded-3xl bg-[#F5F5F5] p-6">
          <div>
            <span className="text-gray-400">
              <strong className="text-black">1</strong> - 5 of 56
            </span>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-[14px] text-gray-400">The page you’re on</p>
            <div>
              <button className="rounded-2xl border border-solid border-gray-400 bg-white px-6 py-2.5 text-[12px] font-medium text-[#280559] shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100">
                <strong className="">1</strong>
                <i className="fa-solid fa-chevron-down pl-2"></i>
              </button>
              <span className="mx-2 h-full border-l border-solid border-gray-400"></span>
              <button className="rounded-2xl border border-solid border-gray-400 bg-white px-6 py-2.5 text-[12px] font-medium text-[#280559] shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100">
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <button className="ml-2 rounded-2xl border border-solid border-gray-400 bg-white px-6 py-2.5 text-[12px] font-medium text-[#280559] shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100">
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
