import React, { Component } from 'react';
import { StyleSheet, View,
  FlatList, Text, TextInput } from 'react-native';

import ReceiptItemsTable from "./ReceiptItemsTable.js"
import CustomButton from "./CustomButton.js"


class ReceiptWindow extends Component {

  constructor(props) {
    super(props)
    this.state = {
      receipt: this.props.route.params.receipt,
      nameFieldValue: "Name",
      quantityFieldValue: 0,
      pricePerUnitFieldValue: 0.0
    }

    this.addItemOnPress = this.addItemOnPress.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.deleteBtnOnPress = this.deleteBtnOnPress.bind(this)
  }

  // add an item to the receipt
  addItemOnPress() {
    var receipt = this.state.receipt;
    receipt.addNewItem(
      this.state.quantityFieldValue,
      this.state.nameFieldValue,
      this.state.pricePerUnitFieldValue
    )

    this.setState({
      receipt: receipt
    })

    receipt.save()
  }

  // allows you to delete an item
  deleteBtnOnPress(item) {
    this.state.receipt.deleteItem(item);

    // update the receipt state
    this.setState({
      receipt: this.state.receipt
    })

    this.state.receipt.save();
  }

  handleChange(item, field, text) {
    var receipt = this.state.receipt

    receipt.itemList[item.id][field] = text;

    // update the receipt state
    this.setState({
      receipt: this.state.receipt
    })

    receipt.save()
  }

  render() {
    return (
      <View style={styles.container}>
        <ReceiptItemsTable
            deleteFunction={this.deleteBtnOnPress}
            handleChange={this.handleChange}
            receipt={this.state.receipt}/>

        <View style={styles.fields}>
          <TextInput
            style={styles.field}
            onChangeText={text => this.setState({ quantityFieldValue: text })}
            value={this.state.quantityFieldValue}
          />
          <TextInput
            style={styles.field}
            onChangeText={text => this.setState({ nameFieldValue: text })}
            value={this.state.nameFieldValue}
          />
          <TextInput
            style={styles.field}
            onChangeText={text => this.setState({ pricePerUnitFieldValue: text })}
            value={this.state.pricePerUnitFieldValue}
          />
          <CustomButton
            buttonStyle={styles.addItemBtn}
            text="Add Item"
            onPress={this.addItemOnPress} >
          </CustomButton>
          </View>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  addItemBtn: {
    backgroundColor: "blue",
    margin: 5,
    flex: .2
  },
  fields: {
    flex: 1,
    flexDirection: "row",
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 700
  },
  field: {
    flex: .3,
    height: 40,
    borderColor: "grey",
    borderWidth: 1
  }
})

export default ReceiptWindow;
