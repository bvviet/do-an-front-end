export interface GetStatisticalUsersResponse {
  top_customers: {
    id: string;
    name: string;
    email: string;
    total_orders: string;
    total_spent: string;
    average_order_value: number;
  }[];
}

export interface StatisticalProductItem {
  id: string;
  name: string;
  price: string;
  total_quantity: string;
  total_revenue: string;
  revenue_percentage: string;
}

export type GetStatisticalProductsResponse = StatisticalProductItem[];

interface StatisticalOrderItem {
  id: number;
  order_code: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  total_amount: string;
  order_status: string;
  created_at: string;
  order_items: [
    {
      product_name: string;
      quantity: number;
      price: string;
      subtotal: string;
    }[],
  ];
}

export type GetStatisticalOrdersResponse = StatisticalOrderItem[];
