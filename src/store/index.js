import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';
import widget from './widget';
import questions from './questions';
import post from './post';
const store = configureStore({
  reducer: {
    auth,
    widget,
    questions,
    post,
  },
});
export default store;
