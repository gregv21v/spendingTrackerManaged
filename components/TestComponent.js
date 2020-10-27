import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Dimensions,
  StyleSheet, SafeAreaView, Picker } from 'react-native';

import AutoCompleteField from "./AutoCompleteField.js"
import CustomButton from "./CustomButton.js"
import AppleStyleSwipeableRow from "./AppleStyleSwipeableRow.js"

import { FlatList, RectButton } from 'react-native-gesture-handler';


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
      <SafeAreaView style={{flex: 1, width: Dimensions.get("window").width}}>

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
          <AppleStyleSwipeableRow>
            <RectButton style={styles.rectButton} onPress={() => alert("item.from")}>
              <Text style={styles.fromText}>Test</Text>
              <Text numberOfLines={2} style={styles.messageText}>
                Test1
              </Text>
              <Text style={styles.dateText}>
                Test2 {'❭'}
              </Text>
            </RectButton>
          </AppleStyleSwipeableRow>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
  fromText: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  messageText: {
    color: '#999',
    backgroundColor: 'transparent',
  },
  dateText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 20,
    top: 10,
    color: '#999',
    fontWeight: 'bold',
  },
});



export default TestComponent;
