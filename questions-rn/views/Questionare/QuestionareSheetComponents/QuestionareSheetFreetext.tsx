import {AnswerHolder} from '../../../AnswerHolder';
import {View, TextInput} from 'react-native';

type Props = {answer: AnswerHolder; answerUpdated: () => void};
const inputAccessoryViewID = 'QuestionareInputAccessoryId';

function QuestionareSheetFreetext({answer, answerUpdated}: Props) {
  return (
    <View style={{borderRadius: 8}}>
      <TextInput
        textAlignVertical="top"
        placeholder="Input answer"
        inputAccessoryViewID={inputAccessoryViewID}
        multiline={true}
        style={{
          backgroundColor: '#f9f9f9',
          borderRadius: 8,
          minHeight: 200,
          maxHeight: 200,
          justifyContent: 'flex-start',
        }}
        onChangeText={t => {
          answer.freeTextAnswer = t;
          answerUpdated();
        }}
      />
    </View>
  );
}

export default QuestionareSheetFreetext;
