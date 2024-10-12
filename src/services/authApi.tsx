import { RootState } from "@/redux/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import signUpType from "@/types/SignUp";
import loginType from "@/types/SignIn";
import { userType } from "@/types/user";
import { AddressResponse, addressType } from "@/types/address";
import { CategoriesResponse } from "@/types/genre";

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

// Định nghĩa kiểu dữ liệu cho phản hồi cập nhật hồ sơ
interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      email_verified_at: string;
      avatar: string;
      created_at: string;
      link_fb: string;
      link_tt: string;
      role: string;
      updated_at: string;
    };
    avatar_url: string;
  };
}

// Định nghĩa kiểu dữ liệu cho phản hồi tạo địa chỉ
interface CreateAddressResponse {
  id: number;
  user_id: number;
  address_name: string;
  phone_number: string;
  city: string;
  district: string;
  ward: string;
  detail_address: string;
  is_default: boolean;
}
// interface CategoryType {
//   id: string;
//   name: string;
//   image: string
// }
interface AddCategoryType {
  id: string;
  name: string;
  parent_id: number | null;
  image: string
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

// Tạo API với createApi
export const authApi = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
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

    getUsers: builder.query<userType, void>({
      query: () => "/auth/profile",
    }),

    updateProfile: builder.mutation<UpdateProfileResponse, FormData>({
      query: (formData) => ({
        url: "/auth/profile/update/6",
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
    addCategory: builder.mutation<AddCategoryType, FormData>({
      query: (formData) => ({
        url: '/admin/categories',
        method: 'POST',
        body: formData, // Sử dụng FormData trực tiếp
      }),
    }),
    getCategories: builder.query<CategoriesResponse, void>({
      query: () => '/categories', // Đường dẫn đến API của bạn
    }),
    deleteCategory: builder.mutation<CategoriesResponse, string>({
      query: (id) => ({
        url: `/admin/categories/${id}`,
        method: "DELETE",
      }),
    }),
    updateCategory: builder.mutation<CategoriesResponse, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/admin/categories/${id}`,
        method: "PUT",
        body: data, // Gửi FormData chứa thông tin danh mục
      }),
    })
  }),
})

// Xuất các hooks để sử dụng trong các component
export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUsersQuery,
  useUpdateProfileMutation,
  useCreateAddressMutation,
  useGetAddressQuery,
  useDeleteAddressMutation,
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation
} = authApi;
