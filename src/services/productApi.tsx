import { RootState } from "@/redux/store";
import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { logout } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";
import { getAllProductsResponse } from "@/types/product";

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
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQueryWithForceLogout,
  endpoints: (builder) => ({
    getAllProducts: builder.query<getAllProductsResponse, void>({
      query: () => ({
        url: "/products",
      }),
    }),
  }),
});

export const { useGetAllProductsQuery } = productApi;
