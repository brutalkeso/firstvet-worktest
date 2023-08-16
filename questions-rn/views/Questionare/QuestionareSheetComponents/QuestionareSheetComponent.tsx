import {Question} from '@/shared-types/QuestionsResponse';
import {AnswerHolder} from '../../../AnswerHolder';
import {View, Text, KeyboardAvoidingView, Platform} from 'react-native';
import BasicButton from '../../../reusable-components/BasicButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import QuestionareSheetInput from '../QuestionareSheetInput';

type Props = {
  questionPage: Question;
  answer: AnswerHolder;
  answerUpdated: () => void;
  continueToNextQuestion: () => void;
};

function QuestionareSheetComponent({
  questionPage,
  answer,
  answerUpdated,
  continueToNextQuestion,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{flex: 1, alignContent: 'flex-end'}}>
      <View style={{flex: 1}}>
        <Text style={{fontWeight: 'bold', fontSize: 24}}>
          {questionPage.title}
        </Text>
        <Text>{questionPage.description}</Text>
        <QuestionareSheetInput
          questionPage={questionPage}
          answer={answer}
          answerUpdated={answerUpdated}
        />
      </View>
      <KeyboardAvoidingView
        keyboardVerticalOffset={insets.top}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <BasicButton
          disabled={!answer.acceptable}
          onPress={continueToNextQuestion}
          title="Continue"
        />
      </KeyboardAvoidingView>
    </View>
  );
}

export default QuestionareSheetComponent;
