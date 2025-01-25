import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, Item } from '../../types.ts';
import { getAllCategories, getItemsByCategory } from '../thunk/categoriesThunk.ts';

interface CategoriesSliceProps {
  categories: Category[];
  categoryItems: Item[];
  categoriesLoading: boolean;
  categoriesError: boolean;
}

const initialState: CategoriesSliceProps = {
  categories: [],
  categoryItems: [],
  categoriesLoading: false,
  categoriesError: false,
}

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getAllCategories.pending, (state) => {
          state.categoriesLoading = true;
          state.categoriesError = false;
        }
      )
      .addCase(
        getAllCategories.fulfilled, (state, {payload: categories}) => {
          state.categoriesLoading = false;
          state.categories = categories;
          state.categoriesError = false;
        }
      )
      .addCase(
        getAllCategories.rejected, (state) => {
          state.categoriesLoading = false;
          state.categoriesError = true
        }
      )
      .addCase(
        getItemsByCategory.pending, (state) => {
          state.categoriesLoading = true;
          state.categoriesError = false;
        }
      )
      .addCase(
        getItemsByCategory.fulfilled, (state, action: PayloadAction<Item[]>) => {
          state.categoriesLoading = false;
          state.categoryItems = action.payload;
          state.categoriesError = false;
        }
      )
      .addCase(
        getItemsByCategory.rejected, (state) => {
          state.categoriesLoading = false;
          state.categoriesError = true
        }
      )
  }
});

export const categoriesReducer = categoriesSlice.reducer;