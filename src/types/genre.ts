import { ProductType } from "./product";

export interface ICategory {
  id: string;
  name: string;
  slug: string;
  image: string;
  parent_id: number;
  children?: ICategory[];
}

export interface CategoriesResponse {
  success: boolean;
  message: string;
  categories: {
    data: ICategory[];
  };
}

export interface GetCategoriesItemResponse {
  id: number;
  name: string;
  slug: string;
  image: string;
  parent_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: boolean;
  children: [];
}

export interface GetAllCategoriesResponse {
  success: boolean;
  message: string;
  categories: GetCategoriesItemResponse[];
}

export interface GetCategoriesProductsResponse {
  success: boolean;
  message: string;
  products: ProductType[];
}
