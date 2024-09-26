import FormField from "@/components/FormField";
import FileUploadPreview from "./FileUpload";
import TextInputs from "@/components/FormInputs/TextInputs";
import { useForm } from "react-hook-form";
import loginType from "@/types/SignIn";
import SelectInput from "@/components/FormInputs/SelectIput";
const phoneOptions = [
  { value: "1234567890", label: "123-456-7890" },
  { value: "0987654321", label: "098-765-4321" },
];
export default function AddProducts() {
  const { control } = useForm<loginType>();
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
                          <FormField
                            label="Tên sản phẩm"
                            name="password"
                            placeholder=""
                            type="text"
                            Component={TextInputs}
                            control={control}
                            rules={{
                              required: "Không được bỏ trống",
                              minLength: {
                                value: 3,
                                message: "Không được ít hơn 3 kí tự.",
                              },
                            }}
                          />
                        </div>
                        <div>
                          <FormField
                            label="Giá sản phẩm"
                            name="password"
                            placeholder=""
                            type="number"
                            Component={TextInputs}
                            control={control}
                            rules={{
                              required: "Không được bỏ trống",
                              minLength: {
                                value: 3,
                                message: "Không được ít hơn 3 kí tự.",
                              },
                            }} />
                        </div>
                        <div className="">
                          <FormField<loginType>
                            label="Category"
                            name="password"
                            placeholder="Chọn danh mục..."
                            Component={SelectInput}
                            control={control}
                            options={phoneOptions}
                          />
                        </div>
                        <div className="">
                          <FormField<loginType>
                            label="Category"
                            name="password"
                            placeholder="Chọn danh mục..."
                            Component={SelectInput}
                            control={control}
                            options={phoneOptions}
                          />
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
