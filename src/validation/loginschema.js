import Yup from "./validate";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().required().email(),
  password: Yup.string().required("Please Enter your password"),
});
