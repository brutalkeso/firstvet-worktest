import {AnswerHolder} from './AnswerHolder';

export type AppScreens = {
  Questionare: undefined;
  Summary: {
    answers: AnswerHolder[];
  };
};
