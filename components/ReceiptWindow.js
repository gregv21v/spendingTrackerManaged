import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView, Dimensions,
  FlatList, Text, TextInput } from 'react-native';

import ReceiptItemsTable from "./ReceiptItemsTable.js"
import CustomButton from "./CustomButton.js"

import firebase from "firebase"
import * as Sentry from "sentry-expo"


class ReceiptWindow extends Component {

  constructor(props) {
    super(props)
    this.state = {
      receipt: this.props.route.params.receipt,
      nameFieldValue: "",
      quantityFieldValue: "",
      pricePerUnitFieldValue: "",
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
      <SafeAreaView style={styles.container}>
        <ReceiptItemsTable
            deleteFunction={this.deleteBtnOnPress}
            handleChange={this.handleChange}
            receipt={this.state.receipt}/>

        <View style={styles.fields}>
          <TextInput
            style={styles.field}
            onChangeText={text => this.setState({ quantityFieldValue: text })}
            value={this.state.quantityFieldValue}
            placeholder="Quantity"
          />
          <TextInput
            style={styles.field}
            onChangeText={text => this.setState({ nameFieldValue: text })}
            value={this.state.nameFieldValue}
            placeholder="Name"
          />
        </View>

        <View style={styles.fields}>
          <TextInput
            style={styles.field}
            onChangeText={text => this.setState({ pricePerUnitFieldValue: text })}
            value={this.state.pricePerUnitFieldValue}
            placeholder="Price per unit"
          />
          <CustomButton
            buttonStyle={styles.addItemBtn}
            text="Add Item"
            onPress={this.addItemOnPress} >
          </CustomButton>
        </View>
      </SafeAreaView>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  addItemBtn: {
    backgroundColor: "blue",
    margin: 5,
    flex: .5
  },
  fields: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
    padding: 5
  },
  field: {
    flex: .5,
    height: 40,
    padding: 5,
    borderColor: "grey",
    borderWidth: 1
  }
})

export default ReceiptWindow;
