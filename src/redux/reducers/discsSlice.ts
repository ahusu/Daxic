// userSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { Disc } from '../../../types'; // Import the Disc type from types.ts
import axios from 'axios';

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
    },
    addDisc: (state,action) => {
       let add = async (disc:Disc)=> {
          await axios.post('/discs', action.payload)}
      try {
        add(action.payload)
      } catch (err) {
        console.log(err)
      }

    }
  },
});

export const { updateDiscs, addDisc } = discsSlice.actions;
export default discsSlice.reducer;
