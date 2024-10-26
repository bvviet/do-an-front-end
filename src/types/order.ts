export interface OrderItem {
  id: number;
  user_id: number;
  address_id: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  total_amount: string;
  note: string;
  deleted_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export type OrderResponse = {
  message: string;
  orders: OrderItem[];
};

interface OrderItemDetailType {
  order_id: number;
  product_id: number;
  quantity: number;
  price: string;
  size: string;
  color: string;
  product_name: string;
  img_thumbnail: string;
  price_regular: string;
  price_sale: string;
  created_at: string;
  updated_at: string;
  product: {
    id: number;
    name: string;
    description: string;
    price_regular: string;
    price_sale: string;
    category: string;
    img_thumbnail: string;
  };
}

export interface OrderDetailTypeResponse {
  order_id: number;
  name: string;
  email: string;
  total_amount: string;
  total_all_orders: string;
  address: {
    id: number;
    address_name: string;
    phone_number: number;
    city: string;
    district: string;
    ward: string;
    detail_address: string;
  };
  payment_method: string;
  payment_status: string;
  order_status: string;
  note: string;
  created_at: string;
  updated_at: string;
  order_items: OrderItemDetailType[];
}

export interface CanCelOrderUserResponse {
  message: string;
}

export interface GetallOrderAdminsResponse {
  message: string;
  order_count: number;
  orders: OrderItem[];
}
