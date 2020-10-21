import React, { Component } from 'react';
import { StyleSheet, View,
  FlatList, Text, TextInput } from 'react-native';


import DataTable from "./DataTable.js";
import CustomButton from "./CustomButton.js"
import Item from "../classes/item.js"


class ReceiptWindow extends Component {

  constructor(props) {
    super(props)
    this.state = {
      receipt: this.props.route.params.receipt,
      rows: [],
      nameFieldValue: "Name",
      quantityFieldValue: 0,
      pricePerUnitFieldValue: 0.0
    }

    this.addItemOnPress = this.addItemOnPress.bind(this)
    this.editBtnOnPress = this.editBtnOnPress.bind(this)
    this.deleteBtnOnPress = this.deleteBtnOnPress.bind(this)
  }

  componentWillMount() {
    this.setState({
      rows: this.receiptItemsToRows()
    })
  }

  receiptItemsToRows() {
    console.log(this.state.receipt);
    if(this.state.receipt.getItems() !== undefined) {
      var rows = Object.values(this.state.receipt.getItems()).map(
        item =>
          item.toArray()
            .concat(this.actionButtons(item))
      )
      return rows
    } else {
      return []
    }
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
      receipt: receipt,
      rows: this.receiptItemsToRows()
    })

    receipt.save()
  }


  // allows you to edit an item
  editBtnOnPress(item) {
    // change the text that displays the properties of the item into
    // text input fields instead
  }

  // allows you to delete an item
  deleteBtnOnPress(item) {
    this.state.receipt.deleteItem(item);

    this.setState({
      rows: this.receiptItemsToRows()
    })

    this.state.receipt.save();
  }



  // the action buttons for the table of receipts
  actionButtons(item) {
    return (
      <View style={styles.actions}>
        <CustomButton
          buttonStyle={styles.editBtn}
          text="Edit"
          onPress={() => this.editBtnOnPress(item)}>
        </CustomButton>
        <CustomButton
          buttonStyle={styles.deleteBtn}
          text="-"
          onPress={() => this.deleteBtnOnPress(item)}>
        </CustomButton>
      </View>
    )
  }


  render() {
    return (
      <View>
        <DataTable
            title={this.state.receipt.getStoreName()}
            headers={["Quantity", "Name", "Price Per Unit"]}
            rows={this.state.rows}/>

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
  editBtn: {
    backgroundColor: "green",
    flex: .5
  },
  deleteBtn: {
    backgroundColor: "red",
    flex: .5
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
    alignItems: "center"
  },
  field: {
    flex: .3,
    height: 40,
    borderColor: "grey",
    borderWidth: 1
  }
})

export default ReceiptWindow;
