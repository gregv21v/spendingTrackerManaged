import React, { Component } from 'react';
import { AppRegistry, TouchableOpacity, Button, SafeAreaView,
  StyleSheet, View, Text, TextInput } from 'react-native';

import DataTable from "./DataTable.js";
import Receipt from "../classes/receipt.js";
import AsyncStorage from '@react-native-community/async-storage';


class ReceiptManager extends Component {


  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      newReceiptDate: "Date",
      newReceiptStoreName: "Store Name",
      receipts: [],
      image: undefined
    }

    this.addReceipt = this.addReceipt.bind(this)
    this.addReceiptOnPress = this.addReceiptOnPress.bind(this)
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
  actionButtons(receipt) {
    return (
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => this.props.navigation.navigate("Receipt Editor", {
            receiptId: receipt.getId()
          })}>
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => this.props.navigation.navigate("Receipt Editor", {
            receiptId: receipt.getId()
          })}>
          <Text>-</Text>
        </TouchableOpacity>
      </View>
    )
  }

  /*
    Deletes a receipt from the
  */
  deleteReceipt() {

  }

  async pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };



  addReceipt(date, storeName) {
    var newRows = this.state.rows;

    // add new receipt to list of receipts
    var newReceipt = new Receipt(date, storeName)
    var newReceiptList = this.state.receipts
    newReceiptList.push(newReceipt)

    var newReceiptRow = newReceipt.toArray()

    this.saveReceipts(newReceiptList)

    newReceiptRow.push(
      this.actionButtons(newReceipt)
    )

    newRows.push(newReceiptRow)

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

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Button title="Pick an image from camera roll" onPress={this.pickImage} />
              {this.state.image && <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />}
            </View>
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
