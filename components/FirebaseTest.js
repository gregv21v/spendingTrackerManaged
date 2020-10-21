import React, { Component } from 'react';
import { View } from 'react-native';

import CustomButton from "./CustomButton.js"

class FirebaseTest extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <View style={{justifyContent: "center", alignItems: "center"}}>
        <CustomButton
          text="Parse Image"
          buttonStyle={{width: 100, height: 50}}
          onPress={this.parseImage}/>
      </View>

    )
  }
}

export default FirebaseTest;
