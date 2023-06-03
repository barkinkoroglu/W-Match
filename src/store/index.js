import { configureStore } from '@reduxjs/toolkit';
import auth from './auth';
import widget from './widget';
import questions from './questions';
import jobpost from './jobpost';

const store = configureStore({
  reducer: {
    auth,
    widget,
    questions,
    jobpost,
  },
});
export default store;
