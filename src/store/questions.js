import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questions: [],
};

const questions = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    addQuestions: (state, action) => {
      state.questions = state.questions.push(action.payload);
    },
  },
});

export const { setQuestions, addQuestions } = questions.actions;
export default questions.reducer;
