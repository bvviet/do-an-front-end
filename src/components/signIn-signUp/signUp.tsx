import { useModalContext } from "../../contexts/ModelPopUp/ModelProvider";
import FormField from "../FormField";
import SignIn from "./signIn";
import "./signIn.css";
import ButtonComponent from "../ButtonComponent";
import { SubmitHandler, useForm } from "react-hook-form";
import TextInputs from "../FormInputs/TextInputs";
import { useRegisterMutation } from "@/services/authApi";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert } from "@mui/material";
import SelectInput from "../FormInputs/SelectIput";

interface signInterface {
  name: string;
  email: string;
  phone: string;
  confirmPassword: string;
  password: string;
  category: string;
}

const phoneOptions = [
  { value: "1234567890", label: "123-456-7890" },
  { value: "0987654321", label: "098-765-4321" },
];
export default function SignUp() {
  const { openPopup } = useModalContext();
  const [register, { isLoading, isError, error }] = useRegisterMutation();
  // Validate
  const formSchema = yup.object().shape({
    name: yup.string().required("Tên không được bỏ trống"),
    phone: yup.string().required(),
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email không đúng định dạng",
      )
      .required("Email không được bỏ trống"),
    password: yup
      .string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .required("Mật khẩu không được bỏ trống"),
    confirmPassword: yup.string().required("Vui lòng xác nhận mật khẩu"),
    category: yup.string().required("Vui lòng chọn danh mục"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<signInterface>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<signInterface> = async (formData) => {
    try {
      const response = await register(formData).unwrap();
      toast.success("Đăng ký thành công!");
      console.log("Đăng ký thành công:", response);
    } catch (err) {
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
              <FormField<signInterface>
                label="User Name"
                name="name"
                placeholder="username..."
                Component={TextInputs}
                control={control}
                error={errors["name"]}
              />
            </div>
            <div className="mt-[3rem]">
              <FormField<signInterface>
                label="Email"
                name="email"
                placeholder="email..."
                Component={TextInputs}
                control={control}
                error={errors["email"]}
              />
            </div>
            <div className="mt-[3rem]">
              <FormField<signInterface>
                label="Password"
                name="password"
                placeholder="password..."
                type="password"
                Component={TextInputs}
                control={control}
                error={errors["password"]}
              />
            </div>
            <div className="mt-[3rem]">
              <FormField<signInterface>
                label="Phone"
                name="phone"
                placeholder="phone..."
                type="text"
                Component={TextInputs}
                control={control}
                error={errors["phone"]}
              />
            </div>
            <div className="mt-[3rem]">
              <FormField<signInterface>
                label="Confirm password"
                name="confirmPassword"
                placeholder="Confirm password..."
                type="password"
                Component={TextInputs}
                control={control}
                error={errors["confirmPassword"]}
              />
            </div>

            <div className="mt-[3rem]">
              <FormField<signInterface>
                label="Category"
                name="category"
                placeholder="Chọn danh mục..."
                Component={SelectInput}
                control={control}
                error={errors["category"]}
                options={phoneOptions}
              />
            </div>

            <div className="my-[2rem]">
              <ButtonComponent
                title="Đăng ký"
                width="100%"
                onClick={handleSubmit(onSubmit)}
                loading={isLoading}
              />
            </div>
            {isError && (
              <Alert severity="error">
                {(error as { data?: { message?: string } }).data?.message ||
                  "Đã xảy ra lỗi không xác định."}
              </Alert>
            )}
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
