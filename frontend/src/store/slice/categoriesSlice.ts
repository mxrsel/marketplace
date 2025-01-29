import { createSlice } from '@reduxjs/toolkit';
import { Category } from '../../types.ts';
import { fetchCategories, getAllCategories } from '../thunk/categoriesThunk.ts';

interface CategoriesSliceProps {
  categories: Category[];
  categoriesLoading: boolean;
  categoriesError: boolean;
}

const initialState: CategoriesSliceProps = {
  categories: [],
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
        }
      )
      .addCase(
        getAllCategories.rejected, (state) => {
          state.categoriesLoading = false;
          state.categoriesError = true
        }
      )
      .addCase(
        fetchCategories.pending, (state) => {
          state.categoriesLoading = true;
          state.categoriesError = false;
        }
      )
      .addCase(
        fetchCategories.fulfilled, (state, {payload: categories}) => {
          state.categoriesLoading = false;
          state.categories = categories;
        }
      )
      .addCase(
        fetchCategories.rejected, (state) => {
          state.categoriesLoading = false;
          state.categoriesError = true
        }
      )
  }
});

export const categoriesReducer = categoriesSlice.reducer;