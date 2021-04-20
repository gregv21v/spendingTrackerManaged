import React, {Component} from 'react'
import {Button, SafeAreaView, Text} from "react-native"
import firebase from "firebase"
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';



WebBrowser.maybeCompleteAuthSession();

/**
  LoginScreen
  @description the screen to login
*/
export default function LoginScreen({ navigation }) {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    //expoClientId: "698777274925-vkv3tvunj7hlds85lcq1uiap36suumvj.apps.googleusercontent.com",
    //iosClientId: "698777274925-6baogi1phucb4tcqid452rlge7hgvbd8.apps.googleusercontent.com",
    clientId: "698777274925-2lup1b1654tsjrtbmfm0lb79ei9hkt4n.apps.googleusercontent.com"
    //androidClientId: "698777274925-l7kkrc588b35qaepvmkahrsvkjr3hvd6.apps.googleusercontent.com",
    //scopes: ['profile']
  });


  React.useEffect(() => {
    if (response?.type === 'success') {
      // Build Firebase credential with the Google access token.
      const { id_token } = response.params;
      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);

      // Sign in with credential from the Google user.
      firebase
        .auth()
        .signInWithCredential(credential)

    }
  }, [response])


  return (
    <SafeAreaView>
      <Button
        onPress={() => {
          promptAsync();
          navigation.navigate("Receipt Manager")
        }}
        title="Google Login"
         />

      <Button
        onPress={() => navigation.navigate("Receipt Manager")}
        title="Receipt Manager" />
    </SafeAreaView>
  )
}
