import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppRegistry } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ReceiptWindow from "./components/ReceiptWindow.js"
import UploadTest from "./components/UploadTest.js"
import ReceiptManager from "./components/ReceiptManager.js"


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Receipt Manager"
          component={ReceiptManager}
          options={{title: "Receipt Manager"}}
        />
        <Stack.Screen
          name="Receipt Editor"
          component={ReceiptWindow}
          options={{title: "Receipt Editor"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
