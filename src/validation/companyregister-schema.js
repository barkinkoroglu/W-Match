import Yup from "./validate";

export const CompanyRegisterSchema = Yup.object().shape({
  companyname: Yup.string("String dedik")
    .required()
    .max(50, "Maximum 50 Characters"),
  username: Yup.string().required(),
  about: Yup.string().required().max(80, "Maximum 120 Characters"),
  longabout: Yup.string().required(),
  email: Yup.string().required().email(),
  adressline1: Yup.string().required(),
  adressline2: Yup.string(),
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
