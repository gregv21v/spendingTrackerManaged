import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity,
  FlatList, Text, TextInput } from 'react-native';
import DataTable from "./DataTable.js";

class ReceiptWindow extends Component {

  constructor(props) {
    super(props)

    this.state = {
      receipt: this.props.route.params.receipt,
      newItemName: "Name",
      newItemQuantity: 0,
      newItemPrice: 0.0
    }
  }

  // save the receipt to local storage

  // load the receipt from local storage 


  // add an item to the receipt
  addItem() {


  }


  render() {
    return (
      <View>
        <DataTable
            title={this.state.receipt.getId()}
            headers={["Quantity", "Name", "Price"]}
            rows={this.state.receipt.getItems()}/>

        <View style={styles.fields}>
          <TextInput
            style={styles.field}
            onChangeText={text => this.setState({
              newItemQuantity: text
            })}
            value={this.state.newItemQuantity}
          />
          <TextInput
            style={styles.field}
            onChangeText={text => this.setState(
              {
                newItemName: text
              })
            }
            value={this.state.newItemName}
          />
          <TextInput
            style={styles.field}
            onChangeText={text => this.setState(
              {
                newItemPrice: text
              })
            }
            value={this.state.newItemPrice}
          />
          <TouchableOpacity
            style={styles.addItemBtn}
            onPress={this.addReceiptOnPress} >
            <Text>Add Receipt</Text>
          </TouchableOpacity>
          </View>
      </View>

    );
  }
}


const styles = StyleSheet.create({
  addItemBtn: {
    alignItems: "center",
    backgroundColor: "blue",
    fontWeight: "bold",
    color: "white",
    margin: 5,
    padding: 10
  },
  fields: {
    flex: 1,
    flexDirection: "row",
    margin: 40,
    justifyContent: "center"
  },
  field: {
    flex: .3,
    height: 40,
    borderColor: "grey",
    borderWidth: 1
  }
})

export default ReceiptWindow;
