import Yup from './validate';

export const CompanyjobSchema = Yup.object().shape({
  job: Yup.string().required(),
  information: Yup.string().required(),
  testvalue: Yup.string(),
  mintestvalue: Yup.number(),
  testvaluescore: Yup.number(),
  wtestvalue: Yup.string(),
  wmintestvalue: Yup.number(),
  wtestvaluescore: Yup.number(),
  data: Yup.date(),
  recomnumber: Yup.number(),
  salary: Yup.string().required(),
  experience: Yup.number().required(),
  major: Yup.string().required(),
  gender: Yup.string().required(),
  isMilitaryServiceCompleted: Yup.boolean().when('gender', {
    is: 'Male',
    then: Yup.boolean().required(),
    otherwise: Yup.boolean(),
  }),
});
