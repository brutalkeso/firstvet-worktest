import {AnswerHolder} from '../../../AnswerHolder';
import {View, TextInput, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {borderRadius: 8},
  textInput: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    minHeight: 200,
    maxHeight: 200,
    justifyContent: 'flex-start',
  },
});

type Props = {answer: AnswerHolder; answerUpdated: () => void};
const inputAccessoryViewID = 'QuestionareInputAccessoryId';

function QuestionareSheetFreetext({answer, answerUpdated}: Props) {
  return (
    <View style={styles.wrapper}>
      <TextInput
        textAlignVertical="top"
        placeholder="Input answer"
        inputAccessoryViewID={inputAccessoryViewID}
        multiline={true}
        style={styles.textInput}
        onChangeText={t => {
          answer.freeTextAnswer = t;
          answerUpdated();
        }}
      />
    </View>
  );
}

export default QuestionareSheetFreetext;
