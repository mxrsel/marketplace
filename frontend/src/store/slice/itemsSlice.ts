import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../../types.ts';
import { createNewItem, deleteItem, getAllItems, getItemById } from '../thunk/itemsThunk.ts';

interface ItemsSliceProps {
  items: Item[];
  oneItem: Item | null
  itemsLoading: boolean;
  itemsError: boolean;
}

const initialState: ItemsSliceProps = {
  items: [],
  oneItem: null,
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
      .addCase(
        getItemById.pending, (state) => {
          state.itemsLoading = true;
          state.itemsError = false;
        }
      )
      .addCase(
        getItemById.fulfilled, (state, action:PayloadAction<Item | null>) => {
          state.itemsLoading = false;
          state.oneItem = action.payload
          state.itemsError = false
        }
      )
      .addCase(
        getItemById.rejected, (state) => {
          state.itemsLoading = false;
          state.itemsError = true;
        }
      )
      .addCase(
        deleteItem.fulfilled, (state, action) => {
          state.itemsLoading = false;
          state.items = state.items.filter((item) => item._id !== action.meta.arg)
        }
      )
  }
})

export const itemsReducer = itemsSlice.reducer