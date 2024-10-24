import { RootState } from "@/redux/store";
import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { logout } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";
import { AddProduct, getAllProductsResponse, ProductDetailType } from "@/types/product";
import {
  CartAddResponse,
  CartDeleteResponse,
  updateQuantityCarResponse,
} from "@/types/cart";
import { BrandType, GetAllBrandsResponse } from "@/types/brand";
import { GetColor, GetSize } from "@/types/tags";

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

    getDetailProduct: builder.query<ProductDetailType, number>({
      query: (productId) => ({
        url: `/products/${productId}`,
      }),
    }),
    addProduct: builder.mutation<AddProduct, FormData>({
      query: (newProduct) => {
        return {
          url: `/admin/products`, // Thay đổi URL nếu cần
          method: "POST",
          body: newProduct, // Sử dụng FormData
          // Không cần thiết lập Content-Type, fetch sẽ tự động làm điều này cho FormData
        };
      },
    }),
    addCart: builder.mutation<
      CartAddResponse,
      { product_id: number; quantity: number; color: string; size: string }
    >({
      query: ({ product_id, quantity, color, size }) => ({
        url: `/carts`,
        method: "POST",
        body: { product_id, quantity, color, size },
      }),
    }),

    deleteCart: builder.mutation<CartDeleteResponse, number>({
      query: (cartId) => ({
        url: `/carts/${cartId}`,
        method: "DELETE",
      }),
    }),

    updateQuantityCart: builder.mutation<
      updateQuantityCarResponse,
      { cartId: number; quantity: number }
    >({
      query: ({ cartId, quantity }) => ({
        url: `/cart/${cartId}`,
        method: "PATCH",
        body: { quantity },
      }),
    }),
    deleteProduct: builder.mutation<ProductDetailType, number>({
      query: (productId) => ({
        url: `/admin/products/${productId}`,
        method: "DELETE",
      }),
    }),
    getAllBrand: builder.query<GetAllBrandsResponse, void>({
      query: () => ({
        url: "/admin/brands",
      }),
    }),
    getAllSize: builder.query<GetSize, void>({
      query: () => ({
        url: "/admin/product/sizes",
      }),
    }),
    getAllColor: builder.query<GetColor, void>({
      query: () => ({
        url: "/admin/product/colors",
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetDetailProductQuery,
  useAddCartMutation,
  useDeleteCartMutation,
  useUpdateQuantityCartMutation,
  useDeleteProductMutation,
  useAddProductMutation,
  useGetAllBrandQuery,
  useGetAllColorQuery,
  useGetAllSizeQuery
} = productApi;
