import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Disc } from '../../../types';
import axios from 'axios';


const initialState = {
  discs: [] as Disc[],
  bag: [] as string[],
};

// Define async thunks
export const fetchDiscsData = createAsyncThunk('discs/fetchDiscsData', async () => {
  const response = await axios.get('/discs');
  return response.data;
});

export const addDisc = createAsyncThunk('discs/addDisc', async (disc: Disc) => {
  const response = await axios.post('/discs', disc);
  return response.data;
});

const discsSlice = createSlice({
  name: 'discs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDiscsData.fulfilled, (state, action) => {
      state.discs = action.payload;
    });
    builder.addCase(addDisc.fulfilled, (state, action) => {
      state.discs.push(action.payload);
    });
  },
});

export default discsSlice.reducer;
