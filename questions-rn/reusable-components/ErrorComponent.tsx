import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {Theme} from '../injection/Injection';

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Theme.Colors.primary,
    paddingVertical: Theme.Paddings.C,
    paddingHorizontal: Theme.Paddings.C,
    borderRadius: 8,
  },
  title: {
    textAlign: 'left',
    color: Theme.Colors.text,
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: Theme.Paddings.A,
  },
  description: {
    textAlign: 'left',
    fontWeight: 'normal',
    fontSize: 14,
    color: Theme.Colors.text,
  },
  retryButtonWrapper: {
    backgroundColor: Theme.Colors.primary,
    marginTop: Theme.Paddings.B,
    paddingVertical: Theme.Paddings.A,
    borderRadius: 8,
  },
  retryButtonText: {
    textAlign: 'center',
    fontSize: 14,
    paddingVertical: Theme.Paddings.A,
    paddingHorizontal: Theme.Paddings.D,
    color: 'white',
  },
});

function ErrorComponent({
  retry,
  style,
}: {
  retry: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View>
      <View style={[styles.wrapper, style]}>
        <Text style={styles.title}>Something went wrong</Text>
        <Text style={styles.description}>
          Unable to fetch questions, please try again later.
        </Text>
      </View>
      <TouchableOpacity onPress={retry}>
        <View style={styles.retryButtonWrapper}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default ErrorComponent;
