import FormField from "../FormField";
import "./signIn.css";
import { useForm } from "react-hook-form";
import TextInputs from "../FormInputs/TextInputs";
import loginType from "@/types/SignIn";

// interface ErrorResponse {
//   message: string;
// }

export default function SetPassword() {
  const { control } = useForm<loginType>();

  return (
    <>
      <div className="container my-24 grid grid-cols-2 gap-8">
        <div className="flex h-full w-[470px] flex-col justify-center border-2 border-black bg-custom-white max-sm:w-full">
          <div className="">
            <p className="login font-manrope text-[40px] font-semibold">
              Set a password
            </p>
            <p className="text-gray-500">
              Your previous password has been reseted. Please set a new password
              for your account.
            </p>
            <form>
              <div className="mt-[3rem]">
                <FormField
                  label="Create New Password"
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
                <FormField
                  label="Re-enter Password"
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
                <button
                  type="submit"
                  className="block w-full rounded-md bg-[#005D63] py-6 text-center text-2xl text-white shadow-sm hover:bg-[#528a8f]"
                >
                  Set password
                </button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <img src="../src/images/Rectangle 20 (1).png" alt="" />
        </div>
      </div>
    </>
  );
}
