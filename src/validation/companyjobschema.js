import Yup from "./validate";

export const CompanyjobSchema = Yup.object().shape({
  job: Yup.string().required(),
  information: Yup.string().required(),
  salary: Yup.string().required(),
});
