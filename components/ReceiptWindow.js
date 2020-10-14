import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text, TextInput } from 'react-native';
import DataTable from "./DataTable.js";

class ReceiptWindow extends Component {
  render() {
    return (
      <DataTable
          title={this.props.route.params.receiptId}
          headers={["Quantity", "Name", "Price"]}
          rows={[
            {
              name: "2% Milk",
              quantity: 1,
              price: 2.95
            },
            {
              name: "Apple",
              quantity: 2.5,
              price: .99
            },
            {
              name: "Apple",
              quantity: 2.5,
              price: .99
            },
            {
              name: "Apple",
              quantity: 2.5,
              price: .99
            }
          ]}/>



    );
  }
}

export default ReceiptWindow;
