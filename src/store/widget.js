import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  widget: null,
};

const widget = createSlice({
  name: "widget",
  initialState,
  reducers: {
    setCompanies: (state, action) => {
      state.widget = action.payload;
    },
  },
});

export const { setCompanies } = widget.actions;
export default widget.reducer;
