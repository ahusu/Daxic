import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Bag } from '../../../types';
import axios from 'axios';

const initialState: {
  bag: Bag;  // Assuming bag is initialized with default values
  menu: Bag[];
} = {
  bag: {} as Bag,  // Assuming bag is initialized with a type assertion
  menu: [],
};
//Async Model functions
export const fetchMenu = createAsyncThunk('stock/fetchMenu', async () => {
  const response = await axios.get('/menu');
  return response.data;
});
export const logBag = createAsyncThunk('stock/logBag', async (bag: Bag) => {
  const response = await axios.post('/logBag', bag);
  return response.data;
});
export const editBag = createAsyncThunk('stock/editBag', async (bag: Bag) => {
  const response = await axios.put('/alterBag', bag);
  return response.data;
});
export const closeOutBag = createAsyncThunk('stock/deleteBag', async (bag_id: String) => {
  const response = await axios.put('/closeOutBag', bag_id);
  return response.data;
});

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMenu.fulfilled, (state, action) => {
      state.menu = action.payload;
    });
    builder.addCase(logBag.fulfilled, (state, action) => {
      state.menu.push(action.payload);
    });
  },
});

export default menuSlice.reducer;
