import { combineReducers } from '@reduxjs/toolkit';
import openModalReducer from './openModalSlice'
import pageReducer from './pageSlice'

const rootReducer = combineReducers({
  page: pageReducer,
  openModal: openModalReducer,
  // Other reducers from different slices can be combined here...
});

export default rootReducer;
