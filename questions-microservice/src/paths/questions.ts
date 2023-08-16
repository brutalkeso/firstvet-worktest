import {ServerRequest, ServerResponse} from '../WebServerInterfaces';
import {sendSuccess} from '../ResponseTypesafety';
import {mockQuestions} from './QuestionsData';

const questions = (req: ServerRequest, res: ServerResponse) => {
  return sendSuccess(mockQuestions, res);
};

export default questions;
