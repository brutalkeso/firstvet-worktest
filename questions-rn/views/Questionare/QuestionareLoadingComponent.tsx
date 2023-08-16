import {View} from 'react-native';
import {StartState} from '../StartState';
import LoadingComponent from '../../reusable-components/LoadingComponent';
import ErrorComponent from '../../reusable-components/ErrorComponent';

type Props = {startState: StartState; retry: () => void};
function QuestionareLoadingComponent({startState, retry}: Props) {
  switch (startState) {
    case 'initial':
    case 'loading':
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <LoadingComponent />
        </View>
      );
    case 'error':
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ErrorComponent retry={retry} />
        </View>
      );
  }
}

export default QuestionareLoadingComponent;
