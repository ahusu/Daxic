// userSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: 1,
  // Other user-related state properties...
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Define your action creators and their corresponding reducer logic here...
    // For example:
    updateUser: (state, action) => {
      state.id = action.payload.newId;
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
