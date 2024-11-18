import { ProductType } from "./product";

export type SearchProductResponse = {
  id: number;
  name: string;
  slug: string;
  sku: string;
  img_thumbnail: string;
  price_regular: string;
  price_sale: string;
  description: string;
  content: string;
  user_manual: string;
  view: number;
  is_active: boolean;
  is_new: boolean;
  is_show_home: boolean;
  category_id: string;
  brand_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: boolean;
}[];

export type FilterProductResponse = ProductType[];
