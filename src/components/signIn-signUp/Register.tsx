import FormField from "../FormField";
import "./signIn.css";
import signType from "@/types/SignUp";
import ButtonComponent from "../ButtonComponent";
import { SubmitHandler, useForm } from "react-hook-form";
import TextInputs from "../FormInputs/TextInputs";
import { useRegisterMutation } from "@/services/authApi";
// import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

// interface ErrorResponse {
//   message: string;
// }

export default function Register() {
  const { control, handleSubmit } = useForm<signType>();
  const [register, { isLoading }] = useRegisterMutation();

  const onSubmit: SubmitHandler<signType> = async (formData) => {
    try {
      const response = await register(formData).unwrap();
      toast.success("Đăng ký thành công!");
      console.log("Đăng ký thành công:", response);
    } catch (err) {
      toast.error(
        (err as { data?: { message?: string } }).data?.message ||
          "Đã xảy ra lỗi không xác định.",
      );
      console.error("Đăng ký thất bại:", err);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <img src="../src/images/Rectangle 20.png" alt="" />
        </div>
        <div className="flex h-full w-[470px] flex-col justify-center border-2 border-black bg-custom-white max-sm:w-full">
          <div className="">
            <p className="login font-manrope text-[40px] font-semibold">
              Sign Up
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-[3rem]">
                <FormField<signType>
                  label="User Name"
                  name="name"
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
              <div className="flex gap-8">
                <div className="mt-[3rem]">
                  <FormField<signType>
                    label="Email"
                    name="email"
                    placeholder=""
                    type="email"
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
                <div className="mt-[3rem]">
                  <FormField<signType>
                    label="Phone Number"
                    name="phone"
                    placeholder=""
                    type="number"
                    Component={TextInputs}
                    control={control}
                    rules={{
                      required: "Không được bỏ trống",
                    }}
                  />
                </div>
              </div>
              <div className="mt-[3rem]">
                <FormField<signType>
                  label="Password"
                  name="password"
                  placeholder=""
                  type="password"
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
              <div className="mt-[3rem]">
                <FormField<signType>
                  label="Confirm Password"
                  name="cfpassword"
                  placeholder=""
                  type="password"
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

              <div className="mt-[3rem]">
                <ButtonComponent
                  title="Đăng nhập"
                  width="100%"
                  onClick={handleSubmit(onSubmit)}
                  loading={isLoading}
                />
              </div>
              <div className="mt-4 flex items-center justify-center text-center">
                <p className="text-[14px] font-semibold">
                  Already have an account?{" "}
                </p>
                <Link
                  to={"/login"}
                  className="text-[14px] font-semibold text-[#FF8682] hover:text-red-500 hover:underline"
                >
                  Login
                </Link>
              </div>
            </form>
            <span className="relative flex justify-center">
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>

              <span className="relative z-10 my-12 bg-white px-6 text-[14px] font-medium text-gray-400">
                OR login with
              </span>
            </span>
            <div className="flex justify-center gap-6">
              <div className="">
                <button className="flex items-center gap-2 rounded-lg border border-solid border-[#515DEF] px-24 py-4 text-slate-700 transition duration-150 hover:border-slate-400 hover:text-slate-900 hover:shadow dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-slate-300">
                  <img
                    className="h-6 w-6"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
                    loading="lazy"
                    alt="facebook logo"
                  />
                </button>
              </div>
              <div className="">
                <button className="flex items-center gap-2 rounded-lg border border-solid border-[#515DEF] px-24 py-4 text-slate-700 transition duration-150 hover:border-slate-400 hover:text-slate-900 hover:shadow dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-slate-300">
                  <img
                    className="h-6 w-6"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    loading="lazy"
                    alt="google logo"
                  />
                </button>
              </div>
              <div className="">
                <button className="flex items-center gap-2 rounded-lg border border-solid border-[#515DEF] px-24 py-4 text-slate-700 transition duration-150 hover:border-slate-400 hover:text-slate-900 hover:shadow dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-slate-300">
                  <img
                    className="h-6 w-6"
                    src="https://cdn.freebiesupply.com/images/large/2x/apple-logo-transparent.png"
                    loading="lazy"
                    alt="apple logo"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
