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
  voucher_active: boolean;
  usage_limit: number;
  used_count: number;
  applicable_type: string;
  applicable_ids: string;
  code: string;
}
export interface AddVoucherBase {
  name: string;
  minimum_order_value: number;
  discount_type: string;
  discount_value: string;
  start_date: string;
  end_date: string;
  usage_limit: number;
  voucher_active: boolean;
  applicable_type: "category" | "product";
  applicable_ids: number[]; // Nếu là mảng ID
}

// export interface AddVoucherCategory extends AddVoucherBase {
//   applicable_type: "category";
//   applicable_ids: CategoryVoucher[];
// }

// export interface AddVoucherProduct extends AddVoucherBase {
//   applicable_type: "product";
//   applicable_ids: ProductVoucher[];
// }

// // Union type
// export type AddVoucher = AddVoucherCategory | AddVoucherProduct;

// export interface CategoryVoucher {
//   id: number;
//   name: string;
// }

// export interface ProductVoucher {
//   id: number;
//   name: string;
// }
