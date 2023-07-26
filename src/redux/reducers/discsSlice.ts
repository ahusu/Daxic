// userSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { Disc } from '../../../types'; // Import the Disc type from types.ts

// Define the initial state with correct types
const initialState = {
  discs: [{} as Disc], // Initialize with an empty Disc object
  bag: [] as String[], // Initialize as an empty array of Disc objects
};

const discsSlice = createSlice({
  name: 'discs',
  initialState,
  reducers: {
    updateDiscs: (state, action) => {
      state.discs = action.payload;
      state.bag = state.discs.map((disc: Disc) => disc.name);
    }
  },
});

export const { updateDiscs } = discsSlice.actions;
export default discsSlice.reducer;
