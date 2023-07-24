import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Import the slice, not the traditional reducer function
import openModalReducer from './openModalSlice'


const rootReducer = combineReducers({
  user: userReducer,
  openModal: openModalReducer,
  // Other reducers from different slices can be combined here...
});

export default rootReducer;
