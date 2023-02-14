import store from "./store";
import { setUser } from "./store/auth";
import country from './utils/country'
export const userHandle = (data) => {
  store.dispatch(setUser(data));
};
export const getCountryCode = (countryCode) => country.find(ct => ct.code === countryCode).dial_code
