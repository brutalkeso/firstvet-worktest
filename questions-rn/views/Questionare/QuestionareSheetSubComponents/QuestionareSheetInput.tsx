import {Question} from '@/shared-types/QuestionsResponse';
import {AnswerHolder} from '../../../AnswerHolder';
import QuestionareSheetFreetext from './QuestionareSheetFreetext';
import QuestionareSheetScalarSel from './QuestionareSheetScalarSel';
import QuestionareSheetCheckboxes from './QuestionareSheetCheckboxes';

type Props = {
  questionPage: Question;
  answer: AnswerHolder;
  answerUpdated: () => void;
};

function QuestionareSheetInput({questionPage, answer, answerUpdated}: Props) {
  switch (questionPage.input) {
    case 'freetext':
      return (
        <QuestionareSheetFreetext
          answer={answer}
          answerUpdated={answerUpdated}
        />
      );
    case 'radio':
      return (
        <QuestionareSheetCheckboxes
          answer={answer}
          questionPage={questionPage}
          updateCheckboxes={updateAnswerRadioCheckboxes}
          answerUpdated={answerUpdated}
        />
      );
    case 'checkbox':
      return (
        <QuestionareSheetCheckboxes
          answer={answer}
          questionPage={questionPage}
          updateCheckboxes={updateAnswerMultiCheckboxes}
          answerUpdated={answerUpdated}
        />
      );
    case 'scalar':
      return (
        <QuestionareSheetScalarSel
          answer={answer}
          questionPage={questionPage}
          answerUpdated={answerUpdated}
        />
      );
    default:
      // Probably show an error view and allow user to continue to next question
      return null;
  }
}

const updateAnswerMultiCheckboxes = (
  alternatives: string[],
  answer: AnswerHolder,
  index: number
) => {
  if (!answer.choiceAnswers) {
    answer.choiceAnswers = alternatives.map(() => false);
  }
  answer.choiceAnswers[index] = !answer.choiceAnswers[index];
};

const updateAnswerRadioCheckboxes = (
  alternatives: string[],
  answer: AnswerHolder,
  index: number
) => {
  answer.choiceAnswers = alternatives.map(() => false);
  answer.choiceAnswers[index] = true;
};

export default QuestionareSheetInput;
