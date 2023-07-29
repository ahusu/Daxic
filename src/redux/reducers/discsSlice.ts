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
export const editDisc = createAsyncThunk('discs/editDisc', async (disc: Disc) => {
  const response = await axios.put('/discs', disc);
  return response.data;
});
export const deleteDisc = createAsyncThunk('discs/deleteDisc', async (disc_id: String) => {
  let config = {
    method: 'delete',
    url: `http://localhost:3000/discs/${disc_id}`,
    headers: {
      'Content-Type': 'application/json'
    },
  };

  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
  })
  .catch((error) => {
    console.log(error);
  });

  return
});

const discsSlice = createSlice({
  name: 'discs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDiscsData.fulfilled, (state, action) => {
      state.discs = action.payload;
      state.bag = state.discs.map((disc)=>disc.name)
    });
    builder.addCase(addDisc.fulfilled, (state, action) => {
      state.discs.push(action.payload);
    });
  },
});

export default discsSlice.reducer;
