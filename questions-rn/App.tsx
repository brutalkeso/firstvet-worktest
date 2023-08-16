import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Questionare from './views/Questionare';

export default function App() {
  return (
    <SafeAreaProvider>
      <Questionare />
    </SafeAreaProvider>
  );
}

