import Yup from "./validate";

export const QuestionSchema = Yup.object().shape({
  question: Yup.string().required(),
  option1: Yup.string().required(),
  option2: Yup.string().required(),
  option3: Yup.string().required(),
  option4: Yup.string().required(),
});
