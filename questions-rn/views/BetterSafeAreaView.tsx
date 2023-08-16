import {StyleProp, View, ViewStyle} from 'react-native';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Theme} from '../injection/Injection';

const EdgeInsetsToViewStyle = (insets: EdgeInsets): ViewStyle => {
  // add some standard padding bottom padding for devices without lip
  return {
    paddingTop: insets.top,
    paddingBottom: insets.bottom > 0 ? insets.bottom : Theme.Paddings.B,
    paddingRight: insets.right,
    paddingLeft: insets.left,
    flex: 1,
  };
};

type Props = {
  children: JSX.Element | JSX.Element[];
  style?: StyleProp<ViewStyle>;
};
function BetterSafeAreaView({style, children}: Props) {
  const insets = useSafeAreaInsets();
  return <View style={[EdgeInsetsToViewStyle(insets), style]}>{children}</View>;
}

export default BetterSafeAreaView;
