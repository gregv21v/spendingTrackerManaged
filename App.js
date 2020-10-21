import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppRegistry } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ReceiptWindow from "./components/ReceiptWindow.js"
import UploadTest from "./components/UploadTest.js"
import ReceiptManager from "./components/ReceiptManager.js"
import FirebaseTest from "./components/FirebaseTest.js"
import IPhoneTest from "./components/IPhoneTest.js"

import * as Sentry from 'sentry-expo';

//import * as firebase from 'firebase';

Sentry.init({
  dsn: 'https://fb1dc871450c4f9a85831b1d1da9e80b@o463964.ingest.sentry.io/5469670',
  enableInExpoDevelopment: true,
  debug: true, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
});

// Access any @sentry/react-native exports via:
//Sentry.Native.*

// Access any @sentry/browser exports via:
//Sentry.Browser.*

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBMCXiRtINeTJPynfdqbm3nl1aVCE4Tu9s",
  authDomain: "spending-tracker-app-b761d.firebaseapp.com",
  databaseURL: "https://spending-tracker-app-b761d.firebaseio.com",
  projectId: "spending-tracker-app-b761d",
  storageBucket: "spending-tracker-app-b761d.appspot.com",
  messagingSenderId: "418916633859",
  appId: "1:418916633859:web:fb7e9ca09ab72408e32d36",
  measurementId: "G-GX2Q2JDS8P"
};

//firebase.initializeApp(firebaseConfig);

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
        <Stack.Screen
          name="Firebase Test"
          component={FirebaseTest}
          options={{title: "Firebase "}}
        />
        <Stack.Screen
          name="IPhone Test"
          component={IPhoneTest}
          options={{title: "IPhone Test"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
