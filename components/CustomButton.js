import React, { Component } from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native'


class CustomButton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.buttonDefault, this.props.buttonStyle]}
        onPress={this.props.onPress}>
        <Text style={[styles.textDefault, this.props.textStyle]}>
          {this.props.text}
        </Text>
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
  buttonDefault: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    fontWeight: "bold",
    color: "white",
    margin: 5,
    padding: 0,
    height: 40,
    width: 70,
    borderRadius: 3
  },
  textDefault: {
    color: "white"
  }
})

export default CustomButton;
