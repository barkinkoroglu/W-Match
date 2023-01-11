import Yup from "./validate";

export const RegisterSchema = Yup.object().shape({
  firstname: Yup.string("String dedik")
    .required()
    .test({
      message: "Enter a valid name",
      test: (str) => /^[a-z\.\_]+$/i.test(str),
    }),
  lastname: Yup.string().required(),
  email: Yup.string().required().email(),
  adressline1: Yup.string().required(),
  adressline2: Yup.string(),
  jobfunct: Yup.string().required(),

  password: Yup.string()
    .required()
    .min(6, "Minimum 6 Characters")
    .max(20, "Maximum 20 Characters"),
  confirmpassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
