import { createAsyncThunk } from '@reduxjs/toolkit';
import { Category, Item } from '../../types.ts';
import axiosApi from '../../axiosApi.ts';

export const getAllCategories = createAsyncThunk<Category[], void>(
  'categories/getAllCategories',
  async() => {
    try {
      const response = await axiosApi.get('/categories');
      if(!response.data) return [];
      return response.data
    } catch(e) {
      console.error(e)
    }
  }
)

export const getItemsByCategory = createAsyncThunk<Item[], string>(
  'categories/getItemsByCategory',
  async(categoryId) => {
    const response = await axiosApi.get(`/items/${categoryId}`);
    if (!response.data) return null;
    return response.data;
  }
)