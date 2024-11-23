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
import {
  AddIBrand,
  BrandType,
  GetAllBrandsResponse,
  GetDetailBrandsResponse,
} from "@/types/brand";
import { GetColor, GetSize } from "@/types/tags";
import { CheckOut } from "@/types/Checkout";

import { AddVoucherBase, IVoucher } from "@/types/voucher";
import { FilterProductResponse, SearchProductResponse } from "@/types/search";
import {
  GetStatisticalOrdersResponse,
  GetStatisticalProductsResponse,
  GetStatisticalUsersResponse,
} from "@/types/statistical";
import { getFavoriteResponse } from "@/types/favorites";
import { CreateCommentResponse, GetCommentsResponse } from "@/types/comment";

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
  tagTypes: [
    "orderUser",
    "orderShipping",
    "Brand",
    "statisticalUsers",
    "Comments",
  ],
  baseQuery: baseQueryWithForceLogout,
  endpoints: (builder) => ({
    getAllProducts: builder.query<getAllProductsResponse, void>({
      query: () => ({
        url: "/products",
      }),
    }),

    getDetailProduct: builder.query<ProductDetailType, string>({
      query: (slug) => ({
        url: `/products/${slug}`,
      }),
    }),

    addProduct: builder.mutation<AddProduct, FormData>({
      query: (newProduct) => ({
        url: `/admin/products`,
        method: "POST",
        body: newProduct,
      }),
    }),
    editProduct: builder.mutation<AddProduct, { slug: string; updatedProduct: FormData }>({
      query: ({ slug, updatedProduct }) => {
        updatedProduct.append('_method', 'PUT'); // Thêm _method vào FormData nếu backend yêu cầu
        return {
          url: `/admin/products/${slug}`,
          method: "POST", // Giữ POST nếu backend yêu cầu POST
          body: updatedProduct,
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

    // Shipper hủy đơn
    cancelOrderShipping: builder.mutation<
      {
        message: string;
        status: string;
      },
      { orderId: number | null; note: string }
    >({
      query: ({ orderId, note }) => ({
        url: `/admin/orders/update-status/${orderId}?status=cancelled&reason=${note}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "orderShipping" }],
    }),

    // Order user
    getOrdersUser: builder.query({
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
      invalidatesTags: [{ type: "orderUser" }, { type: "statisticalUsers" }],
    }),

    // Đơn hàng đang giao
    getOrdersByStatusShipping: builder.query<
      GetOrdersByStatusShippingResponse,
      void
    >({
      query: () => ({
        url: "/admin/orders/ready-to-deliver/?status=shipping",
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

    // Search
    searchProduct: builder.query<SearchProductResponse, string>({
      query: (keyword) => ({
        url: `/search?search=${keyword}`,
      }),
    }),

    // Filter
    filterProducts: builder.query<
      FilterProductResponse,
      { categories: number[]; minPrice: number; maxPrice: number }
    >({
      query: ({ categories, minPrice, maxPrice }) => ({
        url: `/filter`,
        params: {
          "categories[]": categories,
          minPrice,
          maxPrice,
        },
      }),
    }),

    getAllBrand: builder.query<GetAllBrandsResponse, void>({
      query: () => ({
        url: "/admin/brands",
      }),
      providesTags: [{ type: "Brand" }],
    }),
    addBrand: builder.mutation<AddIBrand, FormData>({
      query: (newBrand) => ({
        url: `/admin/brands`,
        method: "POST",
        body: newBrand,
      }),
      invalidatesTags: [{ type: "Brand" }], // Đặt invalidatesTag cho "Brand"
    }),
    deleteBrand: builder.mutation<BrandType, number>({
      query: (brandId) => ({
        url: `admin/brands/${brandId}`,
        method: "DELETE",
      }),
    }),
    getDetailBrand: builder.query<GetDetailBrandsResponse, number>({
      query: (id) => `/admin/brands/${id}`,
      providesTags: [{ type: "Brand" }],
    }),
    updateBrand: builder.mutation<
      BrandType,
      { id: number; data: Partial<BrandType> }
    >({
      query: ({ id, data }) => ({
        url: `/admin/brands/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [{ type: "Brand" }],
    }),

    addVoucher: builder.mutation<AddVoucherBase, string>({
      query: (voucherJson) => ({
        url: `/admin/voucher`,
        method: "POST",
        body: JSON.parse(voucherJson),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    deleteVoucher: builder.mutation<IVoucher, number>({
      query: (id) => ({
        url: `admin/voucher/${id}`,
        method: "DELETE",
      }),
    }),
    updateVoucher: builder.mutation<
      void,
      { id: number; data: Partial<AddVoucherBase> }
    >({
      query: ({ id, data }) => ({
        url: `/admin/voucher/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    // Thống kê
    getStatisticalTime: builder.query<
      {
        total_revenue: string;
        start_date: string;
        end_date: string;
      },
      { start_date: string; end_date: string }
    >({
      query: ({ start_date, end_date }) => ({
        url: `admin/statistical/revenue`,
        params: { start_date, end_date },
      }),
      providesTags: [{ type: "statisticalUsers" }],
    }),

    getStatisticalUsers: builder.query<
      GetStatisticalUsersResponse,
      { start_date: string; end_date: string }
    >({
      query: ({ start_date, end_date }) => ({
        url: `admin/statistical/user`,
        params: { start_date, end_date },
      }),
      providesTags: [{ type: "statisticalUsers" }],
    }),

    getStatisticalProducts: builder.query<
      GetStatisticalProductsResponse,
      { start_date: string; end_date: string }
    >({
      query: ({ start_date, end_date }) => ({
        url: `admin/statistical/product`,
        params: { start_date, end_date },
      }),
    }),

    getStatisticalOrders: builder.query<
      GetStatisticalOrdersResponse,
      { start_date: string; end_date: string }
    >({
      query: ({ start_date, end_date }) => ({
        url: `admin/statistical/order`,
        params: { start_date, end_date },
      }),
    }),

    weekStatistical: builder.query({
      query: () => ({
        url: "admin/statistical/revenue",
      }),
    }),

    // Favorite
    createFavorite: builder.mutation<{ message: string }, number>({
      query: (product_id) => ({
        url: "/favourites",
        method: "POST",
        body: { product_id },
      }),
    }),

    getFavorites: builder.query<getFavoriteResponse, void>({
      query: () => ({
        url: "/favourites",
      }),
    }),

    deleteFavorite: builder.mutation<{ message: string }, number>({
      query: (favoriteId) => ({
        url: `/favourites/${favoriteId}`,
        method: "DELETE",
      }),
    }),

    // Comment
    createComment: builder.mutation<
      CreateCommentResponse,
      { rating: number; content: string; productId: number }
    >({
      query: ({ rating, content, productId }) => ({
        url: `products/${productId}/comments`,
        method: "POST",
        body: { rating, content },
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Comments", id: productId }, // Invalidates tag khi tạo bình luận
      ],
    }),

    getComments: builder.query<GetCommentsResponse, { productId: number }>({
      query: ({ productId }) => ({
        url: `/get/comments/${productId}`,
      }),
      providesTags: (result, error, { productId }) => [
        { type: "Comments", id: productId }, // Cung cấp tag cho bình luận của sản phẩm
      ],
    }),

    deleteComments: builder.mutation<
      { message: string },
      { commentId: number; productId: number } // Nhận cả commentId và productId
    >({
      query: ({ commentId }) => ({
        url: `/products/${commentId}/comments`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Comments", id: productId }, // Dùng trực tiếp productId đã truyền vào
      ],
    }),

    updateComment: builder.mutation<
      CreateCommentResponse,
      { rating: number; content: string; productId: number }
    >({
      query: ({ rating, content, productId }) => ({
        url: `products/${productId}/comments`,
        method: "PATCH",
        body: { rating, content },
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Comments", id: productId },
      ],
    }),
    getAllVoucher: builder.query({
      query: ({ page, limit }: { page: number; limit: number }) =>
        `voucher?page=${page}&limit=${limit}`,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetDetailProductQuery,
  useAddCartMutation,
  useEditProductMutation,
  useDeleteCartMutation,
  useUpdateQuantityCartMutation,
  useGetOrdersUserQuery,
  useGetOrderDetailUserQuery,
  useMarkReceivedOrderUserMutation,
  useGetOrdersByStatusShippingQuery,
  useConfirmDeliveryMutation,
  useCancelOrderShippingMutation,
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
  useSearchProductQuery,
  useAddBrandMutation,
  useDeleteBrandMutation,
  useGetDetailBrandQuery,
  useUpdateBrandMutation,
  useAddVoucherMutation,
  useDeleteVoucherMutation,
  useUpdateVoucherMutation,
  useGetStatisticalUsersQuery,
  useGetStatisticalProductsQuery,
  useGetStatisticalOrdersQuery,
  useGetStatisticalTimeQuery,
  useWeekStatisticalQuery,
  useFilterProductsQuery,
  useCreateFavoriteMutation,
  useGetFavoritesQuery,
  useDeleteFavoriteMutation,
  useCreateCommentMutation,
  useGetCommentsQuery,
  useDeleteCommentsMutation,
  useUpdateCommentMutation,
  useGetAllVoucherQuery
} = productApi;
