import Yup from "./validate";

export const CompanyjobSchema = Yup.object().shape({
  job: Yup.string().required(),
  information: Yup.string().required(),
  testvalue: Yup.string(),
  mintestvalue: Yup.number(),
  testvaluescore: Yup.number(),
  wtestvalue: Yup.string(),
  wmintestvalue: Yup.number(),
  wtestvaluescore: Yup.number(),

  salary: Yup.string().required(),
});
