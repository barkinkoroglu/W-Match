import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobpost: null,
};

const jobpost = createSlice({
  name: 'jobpost',
  initialState,
  reducers: {
    setJobPost: (state, action) => {
      state.jobpost = action.payload;
    },
  },
});

export const { setJobPost } = jobpost.actions;
export default jobpost.reducer;
