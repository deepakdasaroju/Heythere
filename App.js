import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MapComponent from "./components/MapComponent";
import ChatComponent from "./components/ChatComponent";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MapComponent"
          component={MapComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatComponent"
          component={ChatComponent}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
