import Yup from "./validate";

export const RegisterSchema = Yup.object().shape({
  firstname: Yup.string("String dedik")
    .required()
    .max(20, "Maximum 20 Characters")
    .matches(/^(?=.*[a-z])|(?=.*[A-Z])/, "Please use string "),

  lastname: Yup.string()
    .required()
    .max(20, "Maximum 20 Characters")
    .matches(/^(?=.*[a-z])|(?=.*[A-Z])/, "Please use string "),
  username: Yup.string().required(),
  email: Yup.string().required().email(),
  adressline1: Yup.string().required(),
  adressline2: Yup.string(),
  jobfunct: Yup.string().required().max(80, "Maximum 80 Characters"),
  longabout: Yup.string().required(),
  JobCategory: Yup.string().required(),
  password: Yup.string()
    .required("Please Enter your password")
    .min(6, "Minimum 6 Characters")
    .max(20, "Maximum 20 Characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
      "One Uppercase, One Lowercase, One Number and One Special Case Character(!,@,#,$,%,&,^,&,*)"
    ),
  confirmpassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
