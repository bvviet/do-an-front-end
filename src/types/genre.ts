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
