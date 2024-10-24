export interface TagsType {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  pivot: {
    product_id: number;
    tag_id: number;
  };
}

export interface ISize {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
export interface IColor {
  id: number;
  name: string;
  created_at: number;
  updated_at: number;
}

export interface GetSize {
  message: string;
  sizes: ISize[];
}
export interface GetColor {
  message: string;
  colors: IColor[];
}
