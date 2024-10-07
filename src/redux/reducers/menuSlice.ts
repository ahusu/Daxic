import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Bag, User } from '../../../types';
import axios from 'axios';

const initialState: {
  bag: Bag;  // Assuming bag is initialized with default values
  menu: Bag[];
  user: User;
  users: User[];
} = {
  bag: {} as Bag,  // Assuming bag is initialized with a type assertion
  menu: [],
  user: {} as User,
  users: [],
};
//Async Model functions
export const fetchMenu = createAsyncThunk('/fetchMenu', async () => {
  const response = await axios.get('/menu');
  return response.data;
});
export const logBag = createAsyncThunk('/logBag', async (bag: Bag) => {
  const response = await axios.post('/logBag', bag);
  return response.data;
});
export const editBag = createAsyncThunk('/editBag', async (bag: Bag) => {
  const response = await axios.put('/alterBag', bag);
  return response.data;
});
export const closeOutBag = createAsyncThunk('/closeOutBag', async (bag_id: String) => {
  const response = await axios.put(`/closeOutBag/${bag_id}`);
  return response.data;
});
export const newUser = createAsyncThunk('/newUser', async (user: User) =>{
  const response = await axios.post(`/newUser/${user}`);
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
