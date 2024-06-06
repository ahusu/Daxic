import { combineReducers } from '@reduxjs/toolkit';
import openModalReducer from './openModalSlice';
import pageReducer from './pageSlice';
import menuReducer from './menuSlice';
// import recsReducer from './recsSlice';

const rootReducer = combineReducers({
  page: pageReducer,
  openModal: openModalReducer,
  menu: menuReducer,
  // recs:recsReducer,
});

export default rootReducer;
