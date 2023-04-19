import Yup from "./validate";

export const UpdateCompanySchema = Yup.object().shape({
  companyname: Yup.string("String").required().max(50, "Maximum 50 Characters"),
  about: Yup.string().required().max(80, "Maximum 120 Characters"),
  longabout: Yup.string().required(),
  email: Yup.string().required().email(),
  adressline1: Yup.string().required(),
  adressline2: Yup.string(),
});
