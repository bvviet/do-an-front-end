import { BrandType } from "./brand";
import { CategoryType } from "./category";
import { TagsType } from "./tags";

export interface ProductColor {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
export interface ProductSize {
  id: number;
  name: string;
  type: number;
  created_at: string;
  updated_at: string;
}

export interface ProductVariants {
  id: number;
  product_id: number;
  product_size_id: number;
  product_color_id: number;
  quantity: number;
  image: File | null;
  created_at: string | null;
  updated_at: string | null;
  product_color: ProductColor;
  product_size: ProductSize;
}

export interface ProductType {
  id: number;
  name: string;
  slug: string;
  sku: string;
  img_thumbnail: string;
  price_regular: number;
  price_sale: number;
  description: string;
  content: string;
  user_manual: string;
  view: number;
  is_active: boolean;
  is_new: boolean;
  is_show_home: boolean;
  category_id: number;
  brand_id: number;
  brand_name: string;
  category_name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  category: CategoryType;
  brand: BrandType;
}

export interface getAllProductsResponse {
  message: string;
  products: ProductType[];
}

export interface ProductDetailType {
  id: number;
  name: string;
  slug: string;
  sku: string;
  img_thumbnail: string;
  price_regular: number;
  price_sale: number;
  description: string;
  content: string;
  user_manual: string;
  view: number;
  is_active: boolean;
  is_new: boolean;
  is_show_home: boolean;
  category_id: number;
  brand_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: boolean | null;
  category: CategoryType;
  brand: BrandType;
  tags: TagsType[];
  product_images: [];
  productVariants: ProductVariants[];
}

export interface AddProduct {
  name: string;
  price_regular: number;
  price_sale: number;
  description: string;
  content: string;
  user_manual: string;
  brand_name: string;
  category_name: string;
  view: number;
  is_active: number;
  is_new: number;
  is_show_home: number;
  category_id: number;
  brand_id: number;
  img_thumbnail: File | null;
  product_variants: ProductVariants[];
}
