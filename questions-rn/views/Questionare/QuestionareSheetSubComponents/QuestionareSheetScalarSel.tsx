import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {Theme} from '../../../injection/Injection';
import {AnswerHolder} from '../../../AnswerHolder';
import {Question} from '@/shared-types/QuestionsResponse';

const styles = StyleSheet.create({
  scalarSelectionWrapper: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scalarSelectionTitle: {
    fontSize: 40,
  },
  horizontalSeperator: {width: Theme.Paddings.B},
  flatlistContainer: {alignItems: 'center'},
});

function ScalarSelection({
  title,
  selected,
  onPress,
}: {
  title: number;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[
          {
            backgroundColor: selected
              ? Theme.Colors.primary
              : Theme.Colors.ctaDisabled,
          },
          styles.scalarSelectionWrapper,
        ]}
      >
        <Text style={styles.scalarSelectionTitle}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

function HorizontalSeperator() {
  return <View style={styles.horizontalSeperator} />;
}

type Props = {
  answer: AnswerHolder;
  questionPage: Question;
  answerUpdated: () => void;
};

function QuestionareSheetScalarSel({
  answer,
  questionPage,
  answerUpdated,
}: Props) {
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      renderItem={info => (
        <ScalarSelection
          selected={answer.scalar === info.item}
          title={info.item}
          onPress={() => {
            answer.scalar = info.item;
            answerUpdated();
          }}
        />
      )}
      ItemSeparatorComponent={HorizontalSeperator}
      data={questionPage.scalarAlternatives!}
      contentContainerStyle={styles.flatlistContainer}
    />
  );
}

export default QuestionareSheetScalarSel;
