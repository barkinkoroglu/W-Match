import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: null,
};

const post = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { getPosts } = post.actions;
export default post.reducer;
