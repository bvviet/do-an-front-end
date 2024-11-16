export interface IVoucher {
  id: number;
  name: string;
  minimum_order_value: number;
  discount_type: string;
  discount_value: string;
  start_date: string;
  end_date: string;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  voucher_active: number;
  usage_limit: number;
  used_count: number;
  applicable_type: string;
  applicable_ids: string;
  code: string;
}
