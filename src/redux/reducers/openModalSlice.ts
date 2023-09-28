import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  type: '',
  edit:{}
};

const openModalSlice = createSlice({
  name: 'openModal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.open = true;
      state.type = action.payload.type
      state.edit = action.payload.edit
    },
    closeModal: (state, action) => {
      state.open = false;
      state.type = ''
    }
  },
});

export const { openModal, closeModal } = openModalSlice.actions;
export default openModalSlice.reducer;
