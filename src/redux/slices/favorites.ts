import { createSlice } from "@reduxjs/toolkit";

interface itemFavorite {
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
    deleted_at: string | null;
  };
}

interface FavoriteState {
  items: itemFavorite[];
}

const initialState: FavoriteState = {
  items: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    setFavorite: (state, action) => {
      state.items = action.payload;
    },

    removeFavorite: () => {
      return initialState;
    },
  },
});

// Export các actions và reducer
export const { setFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
