export interface getFavoriteResponse {
  status: string;
  data: {
    id: number;
    user_id: number;
    product_id: number;
    created_at: string;
    updated_at: string;
    product: {
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
      deleted_at: boolean;
    };
  }[];
}
