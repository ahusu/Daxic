// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Import the slice, not the traditional reducer function

const rootReducer = combineReducers({
  user: userReducer, // Use the slice's reducer here
  // Other reducers from different slices can be combined here...
});

export default rootReducer;
