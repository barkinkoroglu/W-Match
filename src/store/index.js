import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import widget from "./widget";

const store = configureStore({
  reducer: {
    auth,
    widget,
  },
});
export default store;
