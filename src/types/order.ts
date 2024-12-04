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

  user: {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    avatar: string | null;
    link_fb: string | null;
    link_tt: string | null;
    role: string;
    created_at: string;
    updated_at: string;
  };
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
  status_deleted: number;
  slug: string;
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

export interface updateStatusOrderAdminsResponse {
  message: string;
  order: {
    id: number;
    order_status: string;
    updated_at: string;
  };
}

// Đơn hàng đang giao
export interface GetOrdersByStatusShippingResponse {
  message: string;
  orders: {
    order_id: number;
    customer_name: string;
    address: string;
    products: {
      product_name: string;
      quantity: number;
      price: string;
      image: string;
    }[];
    total_quantity: number;
    total_amount: string;
    order_status: string;
    delivery_time: string;
  }[];
  order_count_by_status: {
    shipped: number;
  };
}
