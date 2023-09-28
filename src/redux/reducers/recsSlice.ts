import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recs: '',
};

const recsSlice = createSlice({
  name: 'recs',
  initialState,
  reducers: {
    updateRecs: (state, action) => {
      state.recs= action.payload;
    },
  },
});

export const { updateRecs } = recsSlice.actions;
export default recsSlice.reducer;
