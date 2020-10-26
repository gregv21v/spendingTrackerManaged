import React, { Component } from 'react';
import { TouchableOpacity, Text, View,
  SafeAreaView, Picker } from 'react-native';
import AutoCompleteField from "./AutoCompleteField.js"
import CustomButton from "./CustomButton.js"




class TestComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      wordSuggestions: [
        "leeks",
        "legumes",
        "lettuce",
        "lemons",
        "lentils"
      ],
      numberSuggestions: [
        0,
        1,
        3,
        4
      ],
      quantity: 0,
      name: "",
      price: 0.0
    }

    // bind functions
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangePrice = this.handleChangePrice.bind(this)
    this.addValueToList = this.addValueToList.bind(this)
  }

  handleChangeName(name) {
    this.setState({
      name: name
    })
  }

  handleChangeQuantity(quantity) {
    this.setState({
      quantity: quantity
    })
  }

  handleChangePrice(price) {
    this.setState({
      price: price
    })
  }

  addValueToList() {
    var suggestions = this.state.suggestions;

    suggestions.push(this.state.value);

    this.setState({
      suggestions: suggestions
    })
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: .1, flexDirection: "row", height: 50, zIndex: 1}}>
          <AutoCompleteField
            style={{flex: .3, height: 30}}
            handleChange={this.handleChangeQuantity}
            suggestions={this.state.numberSuggestions}
            value={this.state.quantity}
          />
          <AutoCompleteField
            style={{flex: .3, height: 30}}
            handleChange={this.handleChangeName}
            suggestions={this.state.wordSuggestions}
            value={this.state.name}
          />
          <AutoCompleteField
            style={{flex: .3, height: 30}}
            handleChange={this.handleChangePrice}
            suggestions={this.state.numberSuggestions}
            value={this.state.price}
          />
          <CustomButton
            onPress={this.addValueToList}
            buttonStyle={{flex: .1, height: 30}}
            text="Add Entry to Suggestions"/>
        </View>
        <View style={
          {
            backgroundColor: "black",
            borderWidth: 20,
            borderColor: "white",
            height: 50,
            flex: 1
          }
        }></View>
      </SafeAreaView>
    )
  }
}



export default TestComponent;
