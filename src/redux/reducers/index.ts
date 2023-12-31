import { combineReducers } from '@reduxjs/toolkit';
import openModalReducer from './openModalSlice';
import pageReducer from './pageSlice';
import discsReducer from './discsSlice';
import recsReducer from './recsSlice';

const rootReducer = combineReducers({
  page: pageReducer,
  openModal: openModalReducer,
  discs: discsReducer,
  recs:recsReducer,
});

export default rootReducer;
