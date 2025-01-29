import { createAsyncThunk } from '@reduxjs/toolkit';
import { Category } from '../../types.ts';
import axiosApi from '../../axiosApi.ts';

export const getAllCategories = createAsyncThunk<Category[], void>(
  'categories/getAllCategories',
  async() => {
      const response = await axiosApi<Category[]>('/categories');
      return response.data || []
  }
)

export const fetchCategories = createAsyncThunk<Category[], void>(
  "categories/fetchCategories",
  async () => {
    const productsResponse = await axiosApi<Category[]>("/categories/navigate");
    return productsResponse.data || [];
  },
);


