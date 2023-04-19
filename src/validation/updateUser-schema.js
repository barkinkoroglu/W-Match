import Yup from "./validate";

export const UpdateUserSchema = Yup.object().shape({
  jobfunct: Yup.string().required().max(80, "Maximum 120 Characters"),
  longabout: Yup.string().required(),
  email: Yup.string().required().email(),
  adressline1: Yup.string().required(),
  adressline2: Yup.string(),
});
