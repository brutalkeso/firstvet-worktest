import {useEffect, useState} from 'react';
import QuestionsMicroservice from '../../network/QuestionsMicroservice';
import {Theme, questionsMicroservice} from '../../injection/Injection';
import BetterSafeAreaView from '../BetterSafeAreaView';
import QuestionareLoadingComponent from './QuestionareLoadingComponent';
import {StartState} from '../StartState';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppScreens} from '../../AppScreens';

import {QuestionPages} from '@/shared-types/QuestionsResponse';
import {AnswerHolder} from '../../AnswerHolder';
import QuestionareSheetComponent from './QuestionareSheetComponent';

const markAsAcceptableIfAnswered = (answer: AnswerHolder) => {
  switch (answer.question.input) {
    case 'freetext':
      // only text with length over one is acceptable
      answer.acceptable = !!answer.freeTextAnswer?.length;
      break;
    case 'radio':
      answer.acceptable = !!answer.choiceAnswers?.find(v => v);
      break;
    case 'scalar':
      answer.acceptable = answer.scalar !== undefined;
      break;
    case 'checkbox':
      answer.acceptable = (answer.choiceAnswers?.length ?? 0) > 0;
      break;
    default:
      break;
  }
};
type ScreenProps = NativeStackScreenProps<AppScreens, 'Questionare'>;
type Props = {questionsMs?: QuestionsMicroservice} & ScreenProps;

type Data = {
  questions: QuestionPages;
  answers: AnswerHolder[];
  pageIndex: number;
};

function QuestionareView({
  questionsMs = questionsMicroservice,
  navigation,
}: Props) {
  const [startState, setStartState] = useState<StartState>('initial');
  const [data, setData] = useState<Data>();
  const [reload, setReload] = useState(0);

  useEffect(() => {
    // Now with React 18 state updates are always batched
    setData(undefined);
    if (startState !== 'loading' && startState !== 'initial') {
      setStartState('loading');
    }

    questionsMs
      .questions()
      .then(result => {
        const answers: AnswerHolder[] = result.pages.map(page => {
          return {
            question: page,
            input: page.input,
            acceptable: false,
          };
        });
        setData({questions: result, answers, pageIndex: 0});
      })
      .catch(e => {
        console.log(e);
        setStartState('error');
      });
  }, [reload]);

  if (data) {
    const answerUpdated = () => {
      const answer = data.answers[data.pageIndex];
      const newData = {...data};
      markAsAcceptableIfAnswered(answer);
      newData.answers[newData.pageIndex] = answer;
      setData(newData);
    };

    const continueToNextQuestion = () => {
      if (!data.answers[data.pageIndex].acceptable) {
        return;
      }

      if (data.pageIndex === data.answers.length - 1) {
        navigation.replace('Summary', {answers: data.answers});
      } else {
        const newData = {...data};
        newData.pageIndex += 1;
        setData(newData);
      }
    };

    return (
      <BetterSafeAreaView style={{marginHorizontal: Theme.Paddings.column}}>
        <QuestionareSheetComponent
          questionPage={data.questions.pages[data.pageIndex]}
          answer={data.answers[data.pageIndex]}
          answerUpdated={answerUpdated}
          continueToNextQuestion={continueToNextQuestion}
        />
      </BetterSafeAreaView>
    );
  }

  return (
    <BetterSafeAreaView style={{marginHorizontal: Theme.Paddings.column}}>
      <QuestionareLoadingComponent
        retry={() => {
          setReload(d => d + 1);
        }}
        startState={startState}
      />
    </BetterSafeAreaView>
  );
}

export default QuestionareView;
