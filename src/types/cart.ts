export interface CartItemType {
  id: number;
  product_id: number;
  name: string;
  slug: string;
  sku: string;
  img_thumbnail: string;
  quantity: number;
  color: string;
  size: string;
  price_regular: string;
  price_sale: string;
  price: string;
  total: number;
  description: string;
  status: number;
  status_message: string;
}

export interface CartAddResponse {
  message: string;
  cart_item: CartItemType;
}

export interface CartGetResponse {
  cart_items: CartItemType[];
  total_price: number;
}

export interface CartDeleteResponse {
  message: "Xóa sản phẩm thành công.";
}

export interface CartItemTypeStore {
  id: number;
  user_id: number; // Có thể cần thiết nếu bạn muốn theo dõi người dùng
  product_id: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  color: string;
  size: string;
  price: string; // Giá có thể là số hoặc chuỗi
}

export interface updateQuantityCarResponse {
  message: string;
  cart_item: {
    id: string;
    user_id: string;
    product_id: string;
    quantity: string;
    created_at: string;
    updated_at: string;
    color: string;
    size: string;
    price: string;
  };
  total_price: number;
}
