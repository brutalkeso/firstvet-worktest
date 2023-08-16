import {Question} from '@/shared-types/QuestionsResponse';

export type AnswerHolder = {
  question: Question;
  freeTextAnswer?: string;
  choiceAnswers?: boolean[];
  scalar?: number;
  acceptable: boolean;
};
