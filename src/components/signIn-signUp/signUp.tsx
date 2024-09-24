import { useModalContext } from "../../contexts/ModelPopUp/ModelProvider";
import FormField from "../FormField";
import SignIn from "./signIn";
import "./signIn.css";
import signType from "@/types/SignUp";
import ButtonComponent from "../ButtonComponent";
import { SubmitHandler, useForm } from "react-hook-form";
import TextInputs from "../FormInputs/TextInputs";
import { useRegisterMutation } from "@/services/authApi";
// import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";

// interface ErrorResponse {
//   message: string;
// }

export default function SignUp() {
  const { openPopup } = useModalContext();
  const { control, handleSubmit } = useForm<signType>();
  const [register, { isLoading, data, error }] = useRegisterMutation();
  console.log(data, error);

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
      <div className="mx-auto h-full w-[470px] border-2 border-black bg-custom-white max-sm:w-full">
        <div className="mx-[30px] pt-[30px]">
          <p className="signin">Create your account</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-[3rem]">
              <FormField<signType>
                label="User Name"
                name="name"
                placeholder="username..."
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
                label="Email"
                name="email"
                placeholder="email..."
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
                label="Password"
                name="password"
                placeholder="password..."
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
                title="Đăng ký"
                width="100%"
                onClick={handleSubmit(onSubmit)}
                loading={isLoading}
              />
            </div>
            {/* {error && (
              <p className="mt-4 text-red-500">
                {"data" in error
                  ? ((error as FetchBaseQueryError).data as ErrorResponse)
                      ?.message
                  : "Đã xảy ra lỗi không xác định."}
              </p>
            )} */}
          </form>
          <button
            className="mt-6 flex items-center"
            onClick={() => openPopup(<SignIn />)}
          >
            <i className="fas fa-arrow-left text-[#566363] hover:text-[#a9c5c5]"></i>
            <span className="ml-3 text-[16px] text-[#566363]">
              Quay lại trang Login
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
