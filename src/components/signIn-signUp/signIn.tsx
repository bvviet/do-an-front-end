import FormField from "../FormField";
import "./signIn.css";
import ButtonComponent from "../ButtonComponent";
import { SubmitHandler, useForm } from "react-hook-form";
import TextInputs from "../FormInputs/TextInputs";
import {
  useGetCartQuery,
  useGetUsersQuery,
  useLoginMutation,
} from "@/services/authApi";
import { toast } from "react-toastify";
import loginType from "@/types/SignIn";
import { Checkbox } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { login, saveUserInfo } from "@/redux/slices/authSlice";
import { useEffect } from "react";
import { setLoading } from "@/redux/slices/loadingSlice";
import { useGetFavoritesQuery } from "@/services/productApi";
import { setFavorite } from "@/redux/slices/favorites";
import { setCart } from "@/redux/slices/CartSlice";

interface LoginResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}

export default function SignInComponent() {
  const [logIn, { isLoading, isSuccess }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  // Validate
  const formSchema = yup.object().shape({
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email không đúng định dạng",
      )
      .required("Email không được bỏ trống"),
    password: yup
      .string()
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .required("Mật khẩu không được bỏ trống"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<loginType>({
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<loginType> = async (formData) => {
    try {
      const response = (await logIn(
        formData,
      ).unwrap()) as unknown as LoginResponse;
      toast.success("Đăng nhập thành công!");
      dispatch(
        login({
          access_token: response.access_token,
          refresh_token: response.refresh_token,
        }),
      );
    } catch (err) {
      toast.error(
        (err as { data?: { message?: string } }).data?.message ||
          "Đã xảy ra lỗi không xác định.",
      );
      console.error("Đăng ký thất bại:", err);
    }
  };

  // Gọi query người dùng chỉ khi đăng nhập thành công
  const { data: users } = useGetUsersQuery(undefined, { skip: !isSuccess });
  const { data: favoritess } = useGetFavoritesQuery(undefined, {
    skip: !isSuccess,
  });
  const { data: carts } = useGetCartQuery(undefined, {
    skip: !isSuccess,
  });
  useEffect(() => {
    if (isSuccess && users && carts && (favoritess || [])) {
      dispatch(saveUserInfo(users));
      dispatch(
        setCart({
          cart_items: carts?.cart_items,
          total_price: carts?.total_price,
        }),
      );
      dispatch(setFavorite(favoritess?.data));
      navigate("/");
    }
  }, [
    dispatch,
    isSuccess,
    users,
    navigate,
    carts?.cart_items,
    carts?.total_price,
    favoritess?.data,
    favoritess,
    carts,
  ]);

  return (
    <>
      <div className="grid grid-cols-2 gap-8 max-sm:grid-cols-1">
        <div className="flex h-full w-[470px] flex-col justify-center border-2 border-black max-xl:w-full max-sm:w-full">
          <div className="">
            <p className="login font-manrope text-[40px] font-semibold">
              Đăng nhập
            </p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit(onSubmit)()}
            >
              <div className="mt-[3rem]">
                <FormField<loginType>
                  label="Email"
                  name="email"
                  placeholder=""
                  type="email"
                  Component={TextInputs}
                  control={control}
                  error={errors["email"]}
                />
              </div>
              <div className="mt-[3rem]">
                <FormField<loginType>
                  label="Password"
                  name="password"
                  placeholder=""
                  type="password"
                  Component={TextInputs}
                  control={control}
                  error={errors["password"]}
                />
              </div>
              <div className="ml-[-12px] mt-[1rem] flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox />
                  <p className="text-[14px] font-semibold">Remember me</p>
                </div>
                <div>
                  <Link
                    to={"#"}
                    className="text-[14px] font-semibold text-[#FF8682] hover:text-red-500 hover:underline"
                  >
                    Forgot Password
                  </Link>
                </div>
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
                  Don't have an account?{" "}
                </p>
                <Link
                  to={"/sign-up"}
                  className="text-[14px] font-semibold text-[#FF8682] hover:text-red-500 hover:underline"
                >
                  Sign Up
                </Link>
              </div>
            </form>
            <span className="relative flex justify-center">
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"></div>

              <span className="relative z-10 my-12 bg-[#F0F0F0] px-6 text-[14px] font-medium text-gray-400">
                OR login with
              </span>
            </span>
            <div className="flex justify-center gap-6 max-xl:mb-12">
              <div className="">
                <button className="flex items-center gap-2 rounded-lg border border-solid border-[#515DEF] px-24 py-4 text-slate-700 transition duration-150 hover:border-slate-400 hover:text-slate-900 hover:shadow dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-slate-300 max-xl:px-16 max-sm:px-20">
                  <img
                    className="h-6 w-6"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
                    loading="lazy"
                    alt="facebook logo"
                  />
                </button>
              </div>
              <div className="">
                <button className="flex items-center gap-2 rounded-lg border border-solid border-[#515DEF] px-24 py-4 text-slate-700 transition duration-150 hover:border-slate-400 hover:text-slate-900 hover:shadow dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-slate-300 max-xl:px-16 max-sm:px-20">
                  <img
                    className="h-6 w-6"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    loading="lazy"
                    alt="google logo"
                  />
                </button>
              </div>
              <div className="">
                <button className="flex items-center gap-2 rounded-lg border border-solid border-[#515DEF] px-24 py-4 text-slate-700 transition duration-150 hover:border-slate-400 hover:text-slate-900 hover:shadow dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-slate-300 max-xl:px-16 max-sm:px-20">
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
        <div className="max-lg:flex max-lg:items-center max-sm:hidden">
          <img src="../src/images/Remove-bg.ai_1729577473146.png" alt="" />
        </div>
      </div>
    </>
  );
}
