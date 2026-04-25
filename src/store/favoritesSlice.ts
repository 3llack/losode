import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { Product } from "@/types";
import { RootState } from "./index";

interface FavoritesState { items: Product[]; }
const initialState: FavoritesState = { items: [] };

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<Product>) {
      const idx = state.items.findIndex(p => p.id === action.payload.id);
      if (idx >= 0) state.items.splice(idx, 1);
      else state.items.push(action.payload);
    },
  },
});

export const selectFavorites = (state: RootState) => state.favorites.items;
export const selectIsFavorite = (productId: number) =>
  createSelector(selectFavorites, (items: Product[]) => items.some(p => p.id === productId));
export const selectFavoritesCount = createSelector(selectFavorites, items => items.length);

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;