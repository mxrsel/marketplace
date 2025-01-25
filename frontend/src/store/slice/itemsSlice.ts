import { createSlice } from '@reduxjs/toolkit';
import { Item } from '../../types.ts';
import { createNewItem, getAllItems } from '../thunk/itemsThunk.ts';

interface ItemsSliceProps {
  items: Item[];
  itemsLoading: boolean;
  itemsError: boolean;
}

const initialState: ItemsSliceProps = {
  items: [],
  itemsLoading: false,
  itemsError: false,
}

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
          getAllItems.pending, (state) => {
            state.itemsLoading = true;
            state.itemsError = false;
        }
      )
      .addCase(
        getAllItems.fulfilled, (state, {payload: items}) => {
          state.itemsLoading = false;
          state.items = items;
          state.itemsError = false
        }
      )
      .addCase(
        getAllItems.rejected, (state) => {
          state.itemsLoading = false;
          state.itemsError = true;
        }
      )
      .addCase(
        createNewItem.pending, (state) => {
          state.itemsLoading = true;
          state.itemsError = false;
        }
      )
      .addCase(
        createNewItem.fulfilled, (state) => {
          state.itemsLoading = false;
          state.itemsError = false
        }
      )
      .addCase(
        createNewItem.rejected, (state) => {
          state.itemsLoading = false;
          state.itemsError = true;
        }
      )
  }
})

export const itemsReducer = itemsSlice.reducer