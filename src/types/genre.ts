import { ProductType } from "./product";

type ChildType = {
  id: number;
  name: string;
  slug: string;
  image: string;
  parent_id: number;
};
export interface ICategory {
  id: string;
  name: string;
  slug: string;
  image: string;
  parent_id: number;
  children?: ChildType[];
}

export interface CategoriesResponse {
  success: boolean;
  message: string;
  data: {
    categories: ICategory[];
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
  children: {
    created_at: string;
    deleted_at: null;
    id: number;
    image: string;
    name: string;
    parent_id: number;
    slug: string;
    updated_at: string;
  }[];
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
