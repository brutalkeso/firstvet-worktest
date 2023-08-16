import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import QuestionareView from './views/Questionare/QuestionareView';

export default function App() {
  return (
    <SafeAreaProvider>
      <QuestionareView />
    </SafeAreaProvider>
  );
}

