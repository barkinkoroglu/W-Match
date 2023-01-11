import * as Yup from "yup";

Yup.setLocale({
  mixed: {
    required: "*This field is required!",
  },
  string: {
    email: "*Enter a valid email address!",
  },
});

export default Yup;
