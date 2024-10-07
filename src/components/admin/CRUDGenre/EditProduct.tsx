import FileUploadPreview from "./FileUpload";

export default function EditCategory() {
  return (
    <>
      <div className="h-auto rounded-xl bg-white px-2 pb-12">
        <div className="flex-no-wrap flex items-start">
          <div className="w-full">
            <div className="px-2">
              <div className="py-7">
                <div className="grid grid-cols-2 gap-8 max-lg:grid-cols-1">
                  <div>
                    <div className="mt-10 px-7">
                      <div className="grid w-full grid-cols-1 gap-7">
                        <div>
                          <p className="text-[16px] font-semibold leading-none text-gray-800">
                            Tên sản phẩm
                          </p>
                          <input className="mt-4 w-full rounded-xl border border-gray-300 p-3 outline-none focus:bg-gray-50" />
                        </div>
                        <div>
                          <p className="text-[16px] font-semibold leading-none text-gray-800">
                            Giá
                          </p>
                          <input className="mt-4 w-full rounded-xl border border-gray-300 p-3 outline-none focus:bg-gray-50" />
                        </div>
                        <div className="">
                          <label
                            htmlFor="countries"
                            className="mb-2 block text-[16px] font-semibold text-gray-900 dark:text-white"
                          >
                            Select an option
                          </label>
                          <select
                            id="countries"
                            className="block h-16 w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 text-2xl text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          >
                            <option selected>Choose a country</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="FR">France</option>
                            <option value="DE">Germany</option>
                          </select>
                        </div>
                        <div className="">
                          <label
                            htmlFor="countries"
                            className="mb-2 block text-[16px] font-semibold text-gray-900 dark:text-white"
                          >
                            Select an option
                          </label>
                          <select
                            id="countries"
                            className="block h-16 w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 text-2xl text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          >
                            <option selected>Choose a country</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="FR">France</option>
                            <option value="DE">Germany</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="my-8 mt-2 px-7 pt-6">
                      <label
                        htmlFor="message"
                        className="mb-2 block text-[16px] font-semibold text-gray-900 dark:text-white"
                      >
                        Mô tả
                      </label>
                      <textarea
                        id="message"
                        rows={8}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-[14px] text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Vui lòng viết thêm mô tả sản phẩm"
                      ></textarea>
                    </div>
                    <FileUploadPreview />
                  </div>
                </div>

                <div className="flex w-full flex-col flex-wrap items-center justify-center gap-x-4 gap-y-4 px-7 md:justify-end lg:flex-row lg:justify-end">
                  <button className="w-full transform rounded border border-solid border-indigo-700 bg-white px-6 py-4 text-xl font-medium text-indigo-700 duration-300 ease-in-out hover:bg-indigo-700 hover:text-white lg:max-w-[95px]">
                    Cancel
                  </button>
                  <button className="w-full transform rounded bg-indigo-700 px-6 py-4 text-xl font-medium text-white duration-300 ease-in-out hover:bg-indigo-600 lg:max-w-[144px]">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
