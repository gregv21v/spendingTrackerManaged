import React, {Component} from 'react'
import {Button, SafeAreaView} from "react-native"
import firebase from "firebase"
import * as Google from 'expo-google-app-auth';

/**
  LoginScreen
  @description the screen to login
*/
export default class LoginScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false
    }
  }

  async loginWithGoogle() {
    try {
      const { type, accessToken, user } = await Google.logInAsync({
        iosClientId: "650995880874-lc5kn515p21qsjnqo77vkg8ds0i8fkn2.apps.googleusercontent.com",
        webClientId: "650995880874-577q6155j0tesir5fob1mp0dclfqqub1.apps.googleusercontent.com",
        scopes: ['profile'],
      });

      if (type === 'success') {
        // Build Firebase credential with the Facebook access token.
        const credential = firebase.auth.GoogleAuthProvider.credential(accessToken);

        // Sign in with credential from the Facebook user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .catch(error => {
            // Handle Errors here.
          });

        this.setState({
          loggedIn: true
        })
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  render() {
    return (
      <SafeAreaView>
        <Button
          onPress={() => this.loginWithGoogle()}
          title="Login"
          disabled={this.state.loggedIn} />

        <Button
          onPress={() => this.props.navigation.navigate("Receipt Manager")}
          title="Receipt Manager" />
      </SafeAreaView>
    )
  }
}
