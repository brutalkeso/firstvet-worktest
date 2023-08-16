import {Question} from '@/shared-types/QuestionsResponse';
import {AnswerHolder} from '../../../AnswerHolder';
import {View, Text, FlatList, TouchableWithoutFeedback} from 'react-native';
import {Theme} from '../../../injection/Injection';

type Props = {
  answer: AnswerHolder;
  questionPage: Question;
  updateCheckboxes: (
    alternatives: string[],
    answer: AnswerHolder,
    index: number
  ) => void;
  answerUpdated: () => void;
};

function Seperator() {
  return <View style={{height: Theme.Paddings.B}} />;
}

function Checkbox({
  title,
  selected,
  onPress,
}: {
  title: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          backgroundColor: selected
            ? Theme.Colors.cta
            : Theme.Colors.ctaDisabled,
          flex: 1,
        }}
      >
        <Text style={{paddingVertical: Theme.Paddings.D, fontSize: 16}}>
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

function QuestionareSheetCheckboxes({
  answer,
  questionPage,
  updateCheckboxes,
  answerUpdated,
}: Props) {
  return (
    <FlatList
      renderItem={info => (
        <Checkbox
          onPress={() => {
            updateCheckboxes(questionPage.alternatives!, answer, info.index);
            answerUpdated();
          }}
          title={info.item}
          selected={
            answer.choiceAnswers ? answer.choiceAnswers[info.index] : false
          }
        />
      )}
      ItemSeparatorComponent={Seperator}
      data={questionPage.alternatives!}
    />
  );
}

export default QuestionareSheetCheckboxes;
