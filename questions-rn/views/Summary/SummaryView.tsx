import {
  StyleSheet,
  Button,
  FlatList,
  ListRenderItemInfo,
  Text,
  View,
} from 'react-native';
import BetterSafeAreaView from '../BetterSafeAreaView';
import {AnswerHolder} from '../../AnswerHolder';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppScreens} from '../../AppScreens';
import {Theme} from '../../injection/Injection';

const styles = StyleSheet.create({
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: Theme.Paddings.A,
  },
  flatlistContainer: {paddingHorizontal: Theme.Paddings.column},
});

const renderItem = (info: ListRenderItemInfo<AnswerHolder>) => {
  switch (info.item.question.input) {
    case 'checkbox':
    case 'radio':
      return <CheckboxComponent info={info} />;
    case 'freetext':
      return (
        <View>
          <Text
            style={styles.titleText}
          >{`Answers for ${info.item.question.title}`}</Text>
          <Text>{info.item.freeTextAnswer}</Text>
        </View>
      );
    case 'scalar':
      return <ScalarComponent info={info} />;
    default:
      // just dont show if we have something unexpected
      return null;
  }
};

function CheckboxComponent({info}: {info: ListRenderItemInfo<AnswerHolder>}) {
  // not very smart to do this every render, but i dont feel like fixing it
  const answeredIndexes = info.item.choiceAnswers!.reduce(
    (aggr, nextV, index) => {
      if (nextV) {
        aggr.push(index);
      }
      return aggr;
    },
    [] as number[]
  );
  return (
    <View>
      <Text
        style={styles.titleText}
      >{`Answers for ${info.item.question.title}`}</Text>
      {answeredIndexes.map(i => (
        <Text key={i}>{info.item.question.alternatives![i]}</Text>
      ))}
    </View>
  );
}

function ScalarComponent({info}: {info: ListRenderItemInfo<AnswerHolder>}) {
  const lastScalarIndex = info.item.question.scalarAlternatives!.length - 1;
  const scalarStart = info.item.question.scalarAlternatives![0];
  const scalarEnd = info.item.question.scalarAlternatives![lastScalarIndex];
  return (
    <View>
      <Text
        style={styles.titleText}
      >{`Answers for ${info.item.question.title}`}</Text>
      <Text>{`${info.item.scalar} from range ${scalarStart} - ${scalarEnd}`}</Text>
    </View>
  );
}

type NavProps = NativeStackScreenProps<AppScreens, 'Summary'>;

function SummaryView({navigation, route}: NavProps) {
  return (
    <BetterSafeAreaView>
      <FlatList
        contentContainerStyle={styles.flatlistContainer}
        data={route.params.answers}
        renderItem={renderItem}
        ListHeaderComponent={
          <Header
            retry={() => {
              navigation.replace('Questionare');
            }}
          />
        }
      />
    </BetterSafeAreaView>
  );
}

function Header({retry}: {retry: () => void}) {
  return (
    <View>
      <Text>Questionare complete</Text>
      <Text>Tap retry to take it again</Text>
      <Button onPress={retry} title="Retry" />
    </View>
  );
}

export default SummaryView;
