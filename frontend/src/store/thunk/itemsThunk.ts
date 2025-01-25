import { createAsyncThunk } from '@reduxjs/toolkit';
import {  Item, ItemMutation } from '../../types.ts';
import axiosApi from '../../axiosApi.ts';
import { RootState } from '../../app/store.ts';

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

export const createNewItem = createAsyncThunk<void, ItemMutation, { state: RootState }>(
  'items/createNewItem',
  async(item, {getState}) => {
    try {
      const token = getState().users.user?.token;
      const data = new FormData();

      const itemKeys = Object.keys(item) as (keyof ItemMutation)[];

      itemKeys.forEach((itemKey) => {
        const itemValue = item[itemKey];

        if(itemValue !== null) {
          data.append(itemKey, itemValue);
        }
      });

      await axiosApi.post('/items', data, {
        headers: { Authorization: token }, })
    } catch (e) {
      console.error(e)
    }
  }
);

export const getItemById = createAsyncThunk<Item | null, string>(
  'albums/getAlbumById',
  async(itemId) => {
    const response = await axiosApi.get<Item | null>(`/items/${itemId}`);
    if(!response.data) return null;

    return response.data;
  }
);

export const deleteItem = createAsyncThunk<void, string, { state: RootState }>(
  'items/deleteItem',
  async (itemId, { getState }) => {
    try {
      const token = getState().users.user?.token;

      await axiosApi.delete(`/items/${itemId}`, {
        headers: { Authorization: token },
      });
    } catch (e) {
      console.error(e);
    }
  }
);

