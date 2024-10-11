import { RootState } from "@/redux/store";
import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import signUpType from "@/types/SignUp";
import loginType from "@/types/SignIn";
import { userType } from "@/types/user";
import { AddressResponse, addressType } from "@/types/address";
import { logout } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";
import { UpdateProfileResponse } from "@/types/profile";

// Định nghĩa kiểu dữ liệu cho phản hồi đăng ký
interface RegisterResponse {
  id: number;
  name: string;
  email: string;
}

// Định nghĩa kiểu dữ liệu cho phản hồi đăng nhập
interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

// Định nghĩa kiểu dữ liệu cho phản hồi tạo địa chỉ
interface CreateAddressResponse {
  id: number; // ID của địa chỉ
  user_id: number; // ID của người dùng
  address_name: string; // Tên địa chỉ
  phone_number: string; // Số điện thoại
  city: string; // Tỉnh/Thành phố
  district: string; // Quận/Huyện
  ward: string; // Xã/Phường
  detail_address: string; // Địa chỉ chi tiết
  is_default: boolean; // Địa chỉ có phải là mặc định hay không
  created_at: string; // Thời gian tạo
  updated_at: string; // Thời gian cập nhật
  message: string; // Thông điệp trả về
  success: boolean; // Trạng thái thành công
}

// Cấu hình baseQuery với fetchBaseQuery
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state?.auth?.access_token; // Lấy token từ state
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Accept", "application/json");
    return headers;
  },
});

const baseQueryWithForceLogout = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object,
) => {
  const result = await baseQuery(args, api, extraOptions);
  console.log({ extraOptions });

  if (result?.error?.status === 401) {
    toast.error("Bạn cần đăng nhập để tiếp tục");
    api.dispatch(logout());
    setTimeout(() => {
      window.location.href = "/login";
    }, 3000);
  }

  return result;
};

// Tạo API với createApi
export const authApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithForceLogout,
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, signUpType>({
      query: ({ name, email, password }) => ({
        url: "/auth/register",
        method: "POST",
        body: { name, email, password },
      }),
    }),

    login: builder.mutation<LoginResponse, loginType>({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, password },
      }),
    }),

    verifyEmail: builder.mutation({
      query: ({ email }) => ({
        url: `/auth/password/forgot`,
        method: "POST",
        body: { email },
      }),
    }),

    getUsers: builder.query<userType, void>({
      query: () => "/auth/profile",
    }),

    updateProfile: builder.mutation<
      UpdateProfileResponse,
      [FormData, number | undefined]
    >({
      query: ([formData, id]) => ({
        url: `/auth/profile/update/${id} `,
        method: "POST",
        body: formData,
      }),
    }),

    getAddress: builder.query<AddressResponse, void>({
      query: () => "/addresses",
    }),

    deleteAddress: builder.mutation<AddressResponse, number>({
      query: (id) => ({
        url: `/addresses/${id}`,
        method: "DELETE",
      }),
    }),

    createAddress: builder.mutation<CreateAddressResponse, addressType>({
      query: ({
        city,
        district,
        ward,
        detail_address,
        phone_number,
        address_name,
      }) => ({
        url: "/addresses",
        method: "POST",
        body: {
          city,
          district,
          ward,
          detail_address,
          phone_number,
          address_name,
        },
      }),
    }),
  }),
});

// Xuất các hooks để sử dụng trong các component
export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyEmailMutation,
  useGetUsersQuery,
  useUpdateProfileMutation,
  useCreateAddressMutation,
  useGetAddressQuery,
  useDeleteAddressMutation,
} = authApi;
