import React, { Component } from 'react';
import { AppRegistry, TouchableOpacity, Button, SafeAreaView,
  Image,
  StyleSheet, View, Text, TextInput } from 'react-native';

import DataTable from "./DataTable.js";
import Receipt from "../classes/receipt.js";
import AsyncStorage from '@react-native-community/async-storage';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'


class ReceiptManager extends Component {


  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      newReceiptDate: "Date",
      newReceiptStoreName: "Store Name",
      receipts: [],
      image: {}
    }

    this.addReceipt = this.addReceipt.bind(this)
    this.addReceiptOnPress = this.addReceiptOnPress.bind(this)
    this.pickImage = this.pickImage.bind(this)
  }

  componentWillMount() {
    this.createRows().then(
      (rows) => {
        this.setState({
          rows: rows
        })
      }
    )
  }

  async loadReceipts() {
    try {
      var receiptArray = await AsyncStorage.getItem('@receipts')
      //await AsyncStorage.removeItem("@receipts")

      console.log(receiptArray);

      if(receiptArray != null) {
        receiptArray = JSON.parse(receiptArray)
        return receiptArray.map(
          (receiptStr) => Receipt.fromObject(receiptStr)
        )
      } else {
        return []
      }
    } catch(e) {
      // error reading value
      console.log(e);
    }
  }

  async saveReceipts(newReceiptList) {
    // save the array of receipts to local storage
    try {
      var jsonString = JSON.stringify(newReceiptList)
      await AsyncStorage.setItem('@receipts', jsonString)
    } catch (e) {
      console.log(e);
    }
  }

  async createRows() {
    // load receipts from AsyncStorage
    var receipts = await this.loadReceipts()

    console.log(receipts);

    // map the receipts to an array of buttons
    return receipts.map(
      (receipt) => [
        receipt.getDate(),
        receipt.getStoreName(),
        receipt.getItemCount(),
        this.actionButtons(receipt)
      ]
    )
  }


  // the action buttons for the table of receipts
  actionButtons(receipt, indexOfReceipt) {
    return (
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => this.props.navigation.navigate("Receipt Editor", {
            receipt: receipt
          })}>
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => this.deleteReceipt(indexOfReceipt)}>
          <Text>-</Text>
        </TouchableOpacity>
      </View>
    )
  }

  /*
    Deletes a receipt from the
  */
  async deleteReceipt(index) {
    // update local storage
    loadReceipts().then(
      (receipts) => {
        // remove the desired receipt
        var tempReceipts = receipts
        tempReceipts.splice(index)
      }
    )



  }

  async pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    // upload to server
    let uriParts = result.uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append('image', {
      uri: result.uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    console.log(JSON.stringify(formData));

    // Tests I've tried:
    /*
      1. remove the s from headers
      2. remove the headers all together, which gets rid of the boundry error
        but makes the file on the server side undefined.
      3. I removed the accept application/json line to no avail
      4. I have used the axios library instead of the fetch call.


    */


    let options = {
      method: 'POST',
      body: formData,
      header: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      },
    };

    if (!result.cancelled) {
      this.setState({
        image: result.uri
      });
    }

    fetch("http://localhost:8080/upload_receipt_img", options)
      .then(result => console.log(result))

  };



  addReceipt(date, storeName) {
    var newRows = this.state.rows;

    // add new receipt to list of receipts
    var newReceipt = new Receipt(date, storeName)
    var newReceiptList = this.state.receipts
    newReceiptList.push(newReceipt)

    // convert the new receipt to an array
    var newReceiptRow = newReceipt.toArray()

    // save receipts to local storage
    this.saveReceipts(newReceiptList)

    // add the action buttons to the new row
    newReceiptRow.push(
      this.actionButtons(newReceipt, this.state.rows.length)
    )

    newRows.push(newReceiptRow)

    // update the receipts and rows states
    this.setState({
        rows: newRows,
        receipts: newReceiptList
    })
  }

  addReceiptOnPress() {
    this.addReceipt(this.state.newReceiptDate, this.state.newReceiptStoreName)
  }


  render() {
    return (
      <SafeAreaView>
        <DataTable
          title="Receipts"
          headers={["Date", "Store", "Item Count", "Actions"]}
          rows={this.state.rows} />
          <View style={styles.newReceiptFields}>
            <TextInput
              style={styles.field}
              onChangeText={text => this.setState({
                newReceiptDate: text
              })}
              value={this.state.newReceiptDate}
            />
            <TextInput
              style={styles.field}
              onChangeText={text => this.setState(
                {
                  newReceiptStoreName: text
                })
              }
              value={this.state.newReceiptStoreName}
            />
            <TouchableOpacity
              style={styles.addReceiptBtn}
              onPress={this.addReceiptOnPress} >
              <Text>Add Receipt</Text>
            </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button title="Pick an image from camera roll" onPress={this.pickImage} />
          {this.state.image && <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  editBtn: {
    alignItems: "center",
    backgroundColor: "green",
    fontWeight: "bold",
    color: "white",
    margin: 5,
    padding: 10,
    flex: .5
  },
  deleteBtn: {
    alignItems: "center",
    backgroundColor: "red",
    fontWeight: "bold",
    color: "white",
    margin: 5,
    padding: 10,
    flex: .5
  },
  addReceiptBtn: {
    alignItems: "center",
    backgroundColor: "blue",
    fontWeight: "bold",
    color: "white",
    margin: 5,
    padding: 10
  },
  actions: {
    flexDirection: "row",
    flex: 1
  },
  newReceiptFields: {
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


export default ReceiptManager;
