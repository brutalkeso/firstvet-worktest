import {QuestionPages} from '@/shared-types/QuestionsResponse';

class QuestionsMicroservice {
  private paths: {
    questions: string;
  };

  constructor(baseUrl: string) {
    this.paths = {
      questions: `${baseUrl}/questions`,
    };
  }

  questions = () => {
    return fetch(this.paths.questions)
      .then(result => {
        if (!result.ok) {
          throw new Error('Failed to fetch questions');
        }
        return result.json();
      })
      .then(r => {
        // added this just so loading is shown when running against local server
        return new Promise((res, _) => {
          setTimeout(() => {
            res(r);
          }, 1000);
        });
      })
      .then(j => j as QuestionPages);
  };
}

export default QuestionsMicroservice;
