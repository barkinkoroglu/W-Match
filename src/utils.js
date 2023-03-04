import store from "./store";
import { setUser } from "./store/auth";

export const userHandle = (data) => {
  store.dispatch(setUser(data));
};

export const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}