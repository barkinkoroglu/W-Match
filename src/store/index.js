import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';
import widget from './widget';
import questions from './questions';

const store = configureStore({
  reducer: {
    auth,
    widget,
    questions,
  },
});
export default store;
