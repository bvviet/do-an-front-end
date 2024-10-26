import { RootState } from "@/redux/store";
import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { logout } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";
import { getAllProductsResponse, ProductDetailType } from "@/types/product";
import {
  CartAddResponse,
  CartDeleteResponse,
  updateQuantityCarResponse,
} from "@/types/cart";
import {
  CanCelOrderUserResponse,
  GetallOrderAdminsResponse,
  OrderDetailTypeResponse,
  OrderResponse,
} from "@/types/order";

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

    // Order user
    getOrdersUser: builder.query<OrderResponse, string>({
      query: (status) => ({
        url: `/user/orders?status=${status}`,
      }),
    }),

    getOrderDetailUser: builder.query<OrderDetailTypeResponse, number>({
      query: (orderId) => ({
        url: `/user/orders/${orderId}`,
      }),
    }),

    cancelOrderUser: builder.mutation<
      CanCelOrderUserResponse,
      { orderId: number; note: string }
    >({
      query: ({ orderId, note }) => ({
        url: `/user/orders/${orderId}/cancel`,
        method: "PATCH",
        body: { note },
      }),
    }),

    // Order admin
    getOrdersAdmin: builder.query<GetallOrderAdminsResponse, void>({
      query: () => ({
        url: `/admin/orders`,
      }),
    }),

    getDetailOrderAdmin: builder.query<OrderDetailTypeResponse, number>({
      query: (orderId) => ({
        url: `/admin/orders/${orderId}`,
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
  useGetOrdersUserQuery,
  useGetOrderDetailUserQuery,
  useCancelOrderUserMutation,
  useGetOrdersAdminQuery,
  useGetDetailOrderAdminQuery,
} = productApi;
