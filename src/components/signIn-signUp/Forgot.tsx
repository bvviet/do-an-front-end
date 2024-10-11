import FormField from "../FormField";
import "./signIn.css";
import { SubmitHandler, useForm } from "react-hook-form";
import TextInputs from "../FormInputs/TextInputs";
import { Link } from "react-router-dom";
import { VerityEmail } from "@/types/verifyEmail";
import { useVerifyEmailMutation } from "@/services/authApi";
import { toast } from "react-toastify";

interface VerifyEmailError {
  status: number;
  message: string;
}

export default function Forgot() {
  const { control, handleSubmit } = useForm<VerityEmail>();
  const [verifyEmail, { error, isError }] = useVerifyEmailMutation();
  const onSubmit: SubmitHandler<VerityEmail> = (data) => {
    verifyEmail(data);
  };

  if (isError) {
    const errorMessage = error as VerifyEmailError;
    toast.error(errorMessage.message);
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-8">
        <div className="flex h-full w-[470px] flex-col justify-center border-2 border-black bg-custom-white max-sm:w-full">
          <div className="">
            <p className="login font-manrope text-[40px] font-semibold">
              Forgot your password?
            </p>
            <p className="text-gray-500">
              Don’t worry, happens to all of us. Enter your email below to
              recover your password
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-[3rem]">
                <FormField<VerityEmail>
                  label="Email"
                  name="email"
                  placeholder=""
                  type="email"
                  Component={TextInputs}
                  control={control}
                />
              </div>
              <div className="mt-[3rem]">
                <button
                  type="submit"
                  className="block w-full rounded-md bg-[#005D63] py-6 text-center text-2xl text-white shadow-sm hover:bg-[#528a8f]"
                >
                  Submit
                </button>
              </div>
              <div className="mt-4 flex items-center justify-center text-center">
                <p className="text-[14px] font-semibold">
                  Don't have an account?{" "}
                </p>
                <Link
                  to={"/signup"}
                  className="text-[14px] font-semibold text-[#FF8682] hover:text-red-500 hover:underline"
                >
                  Sign Up
                </Link>
              </div>
            </form>
            <span className="relative flex justify-center">
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>

              <span className="relative z-10 my-12 bg-white px-6 text-[14px] font-medium text-gray-400">
                OR login with
              </span>
            </span>
            <div className="flex gap-6">
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
        <div>
          <img src="../src/images/Rectangle 20 (1).png" alt="" />
        </div>
      </div>
    </>
  );
}
