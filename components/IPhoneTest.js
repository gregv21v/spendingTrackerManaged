import React, { Component } from 'react';
import { SafeAreaView, Text } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import CustomButton from "./CustomButton.js"

class IPhoneTest extends Component {
  constructor(props) {
    super(props)

    this.state = {
      testState: ""
    }

    this.testOnPress = this.testOnPress.bind(this)
    this.goToReceiptManager = this.goToReceiptManager.bind(this)
    this.storeSomething1 = this.storeSomething1.bind(this)
    this.storeSomething2 = this.storeSomething2.bind(this)
    this.storeSomething3 = this.storeSomething3.bind(this)
  }


  testOnPress() {
    this.setState({
      testState: "Testing 1 2 3..."
    })
  }

  goToReceiptManager() {
    this.props.navigation.navigate("Receipt Manager");
  }


  async storeSomething1() {
    var value = "test string 1"

    try {
      await AsyncStorage.setItem("@test1", value)
    } catch (e) {
      throw Error(e);
    }
  }

  async storeSomething2() {
    var value = JSON.stringify({val1: 0, val2: 1})

    try {
      await AsyncStorage.setItem("@test2", value)
    } catch (e) {
      throw Error(e);
    }
  }

  async storeSomething3() {
    var value = 0

    try {
      await AsyncStorage.setItem("@test3", value)
    } catch (e) {
      throw Error(e);
    }
  }

  async storeSomething4() {
    var value = JSON.stringify(0)

    try {
      await AsyncStorage.setItem("@test4", value)
    } catch (e) {
      throw Error(e);
    }
  }




  render() {
    return (
      <SafeAreaView style={{justifyContent: "center", alignItems: "center"}}>
        <CustomButton
          text="Test"
          buttonStyle={{width: 300, height: 50}}
          onPress={this.testOnPress}/>

        <CustomButton
          text="Go to Receipt Manager Page"
          buttonStyle={{width: 300, height: 50}}
          onPress={this.goToReceiptManager}/>


        <CustomButton
          text="Store Something 1"
          buttonStyle={{width: 300, height: 50}}
          onPress={this.storeSomething1}/>

        <CustomButton
          text="Store Something 2"
          buttonStyle={{width: 300, height: 50}}
          onPress={this.storeSomething2}/>

        <CustomButton
          text="Store Something 3 (this should crash)"
          buttonStyle={{width: 300, height: 50}}
          onPress={this.storeSomething3}/>

        <CustomButton
          text="Store Something 3 (this on the other hand shouldn't crash)"
          buttonStyle={{width: 400, height: 50}}
          onPress={this.storeSomething4}/>


        <Text style={{color:"black"}}>{this.state.testState}</Text>
      </SafeAreaView>

    )
  }
}

export default IPhoneTest;
