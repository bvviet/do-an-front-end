import { RootState } from "@/redux/store";
import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { logout } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";
import {
  AddProduct,
  getAllProductsResponse,
  ProductDetailType,
} from "@/types/product";
import {
  CartAddResponse,
  CartDeleteResponse,
  updateQuantityCarResponse,
} from "@/types/cart";
import {
  CanCelOrderUserResponse,
  GetallOrderAdminsResponse,
  GetOrdersByStatusShippingResponse,
  OrderDetailTypeResponse,
  updateStatusOrderAdminsResponse,
} from "@/types/order";
import { GetAllBrandsResponse } from "@/types/brand";
import { GetColor, GetSize } from "@/types/tags";
import { CheckOut } from "@/types/Checkout";

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
  tagTypes: ["orderUser", "orderShipping"],
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
      query: (newProduct) => ({
        url: `/admin/products`,
        method: "POST",
        body: newProduct,
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

    // Xác nhận đã giao
    confirmDelivery: builder.mutation<
      {
        message: string;
      },
      { orderId: number }
    >({
      query: ({ orderId }) => ({
        url: `/admin/orders/confirm-delivery/${orderId}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "orderShipping" }],
    }),

    // Order user
    getOrdersUser: builder.query<GetallOrderAdminsResponse, string>({
      query: (status) => ({
        url: `/user/orders?status=${status}`,
      }),
      providesTags: [{ type: "orderUser" }, { type: "orderShipping" }],
    }),

    getOrderDetailUser: builder.query<OrderDetailTypeResponse, number>({
      query: (orderId) => ({
        url: `/user/orders/${orderId}`,
      }),
      providesTags: [{ type: "orderUser" }],
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

    markReceivedOrderUser: builder.mutation<
      {
        message: string;
      },
      number
    >({
      query: (orderId) => ({
        url: `/user/orders/mark-as-received/${orderId}`,
        method: "PATCH",
      }),
      invalidatesTags: [{ type: "orderUser" }],
    }),

    // Đơn hàng đang giao
    getOrdersByStatusShipping: builder.query<
      GetOrdersByStatusShippingResponse,
      void
    >({
      query: () => ({
        url: "/admin/orders/delivery",
      }),
      providesTags: [{ type: "orderShipping" }],
    }),

    // Product

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

    updateOrderStatusAdmin: builder.mutation<
      updateStatusOrderAdminsResponse,
      { orderId: number; status: string }
    >({
      query: ({ orderId, status }) => ({
        url: `/admin/orders/status/${orderId}`,
        method: "PUT",
        body: { status },
      }),
    }),

    filterByDateOrdersAdmin: builder.query<
      GetallOrderAdminsResponse,
      { start_date: string; end_date: string }
    >({
      query: ({ start_date, end_date }) => ({
        url: `/admin/orders/filter?start_date=${start_date}&end_date=${end_date}`,
      }),
    }),
    Checkout: builder.mutation<CheckOut, FormData>({
      query: (newOrders) => ({
        url: `/orders`,
        method: "POST",
        body: newOrders,
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
  useMarkReceivedOrderUserMutation,
  useGetOrdersByStatusShippingQuery,
  useConfirmDeliveryMutation,
  useCancelOrderUserMutation,
  useGetOrdersAdminQuery,
  useGetDetailOrderAdminQuery,
  useDeleteProductMutation,
  useAddProductMutation,
  useGetAllBrandQuery,
  useGetAllColorQuery,
  useGetAllSizeQuery,
  useUpdateOrderStatusAdminMutation,
  useFilterByDateOrdersAdminQuery,
  useCheckoutMutation,
} = productApi;
