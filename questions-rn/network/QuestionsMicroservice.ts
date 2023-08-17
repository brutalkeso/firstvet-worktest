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
        return new Promise(res => {
          setTimeout(() => {
            res(r);
          }, 1000);
        });
      })
      .then(r => this.verifyQuestionsResponse(r));
  };

  verifyQuestionsResponse = (result: unknown) => {
    const questionPages = result as QuestionPages;
    for (const page of questionPages.pages) {
      switch (page.input) {
        case 'checkbox':
        case 'radio':
          if ((page.alternatives?.length ?? 0) === 0) {
            throw new Error('No alternatives in checkbox response');
          }
          break;
        case 'scalar':
          if ((page.scalarAlternatives?.length ?? 0) === 0) {
            throw new Error('No scalar alternatives in scalar response');
          }
          break;
        default:
          break;
      }
    }
    return questionPages;
  };
}

export default QuestionsMicroservice;
