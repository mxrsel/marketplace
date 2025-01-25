import { createAsyncThunk } from '@reduxjs/toolkit';
import { Item, ItemMutation } from '../../types.ts';
import axiosApi from '../../axiosApi.ts';

export const getAllItems = createAsyncThunk<Item[], void>(
  'items/getAllItems',
  async() => {
    try {
      const response = await axiosApi.get('/items');
      if(!response.data) return [];

      return response.data
    } catch(e) {
      console.error(e)
    }
  }
);

export const createNewItem = createAsyncThunk<void, ItemMutation>(
  'items/createNewItem',
  async(item) => {
    try {
      const data = new FormData();

      const itemKeys = Object.keys(item) as (keyof ItemMutation)[];

      itemKeys.forEach((itemKey) => {
        const itemValue = item[itemKey];

        if(itemValue !== null) {
          data.append(itemKey, itemValue);
        }
      });

      await axiosApi.post('/items', data)
    } catch (e) {
      console.error(e)
    }
  }
)