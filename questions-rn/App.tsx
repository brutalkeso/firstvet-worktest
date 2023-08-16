import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native"
import QuestionareView from './views/Questionare/QuestionareView';
import SummaryView from "./views/Summary/SummaryView";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppScreens } from "./AppScreens";

const Stack=createNativeStackNavigator<AppScreens>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator initialRouteName="Questionare">
          <Stack.Screen
            name="Questionare"
            component={QuestionareView}
            options={{ headerShown: false, animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="Summary"
            component={SummaryView}
            options={{ headerShown: false, animation: "slide_from_left" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

