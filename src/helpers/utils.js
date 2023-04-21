import { addQuestionsToFirestore } from '../firebase';
import questions from '../questions/examquestion.json';

export const addQuestionsBySection = async (chosenSection, chosenLevel) => {
  const sectionFilteredQuestions = questions.filter(
    (section) => section.section === chosenSection
  )[0].questions;

  const easyQuestions = sectionFilteredQuestions.filter(
    (question) => question.level === 'easy'
  );
  const normalQuestions = sectionFilteredQuestions.filter(
    (question) => question.level === 'normal'
  );
  const difficultQuestions = sectionFilteredQuestions.filter(
    (question) => question.level === 'difficult'
  );

  let selectedQuestions = [];

  if (chosenLevel === 'normal') {
    selectedQuestions = normalQuestions
      .slice(0, 5)
      .concat(easyQuestions.slice(0, 5), difficultQuestions.slice(0, 5));
  }

  if (chosenLevel === 'difficult') {
    selectedQuestions = difficultQuestions
      .slice(0, 5)
      .concat(normalQuestions.slice(0, 5), easyQuestions.slice(0, 5));
  }
  if (chosenLevel === 'easy') {
    selectedQuestions = easyQuestions
      .slice(0, 5)
      .concat(normalQuestions.slice(0, 5), difficultQuestions.slice(0, 5));
  }
  return await addQuestionsToFirestore(selectedQuestions);
};
