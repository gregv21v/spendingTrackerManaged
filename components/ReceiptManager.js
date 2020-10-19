import React, { Component } from 'react';
import { AppRegistry, TouchableOpacity, Button, SafeAreaView,
  Image,
  StyleSheet, View, Text, TextInput } from 'react-native';

import DataTable from "./DataTable.js";
import Receipt from "../classes/receipt.js";
import ReceiptList from "../classes/receiptList.js"
import * as ImagePicker from 'expo-image-picker';


class ReceiptManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      dateFieldValue: "Date",
      storeNameFieldValue: "Store Name",
      receipts: new ReceiptList(),
      image: {}
    }

    this.addReceiptOnPress = this.addReceiptOnPress.bind(this)
    //this.pickImage = this.pickImage.bind(this)
  }

  componentWillMount() {
    ReceiptList.load().then(
      (receiptList) => {
        console.log(receiptList);
        this.setState({
          rows: this.receiptListToRows(receiptList),
          receipts: receiptList
        })
      }
    )
  }


  receiptListToRows(receiptList) {
    //console.log(receiptList.receipts[0].getItemCount());
    if(receiptList.receipts !== undefined) {
      var rows = Object.values(receiptList.receipts).map(
        receipt =>
          receipt.toArray()
            .concat(this.actionButtons(receipt))
      )
      return rows
    } else {
      return []
    }
  }


  // the action buttons for the table of receipts
  actionButtons(receipt) {
    return (
      <SafeAreaView style={styles.actions}>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => this.props.navigation.navigate("Receipt Editor", {
            receipt: receipt
          })}>
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => this.deleteReceipt(receipt)}>
          <Text>-</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }

  /*
    Deletes a receipt from the
  */
  async deleteReceipt(receipt) {
    var receiptList = this.state.receipts
    receiptList.remove(receipt)
      .then(
        (resp) => {
          this.setState({
            receipts: receiptList,
            rows: this.receiptListToRows(receiptList)
          })
          console.log(receiptList);

        }
      )
  }

  /*async pickImage() {
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

      1. remove the s from headers
      2. remove the headers all together, which gets rid of the boundry error
        but makes the file on the server side undefined.
      3. I removed the accept application/json line to no avail
      4. I have used the axios library instead of the fetch call.





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

  };*/

  addReceiptOnPress() {
    // add new receipt to list of receipts

    var newReceiptList = this.state.receipts
    newReceiptList.addNew(this.state.dateFieldValue, this.state.storeNameFieldValue)

    console.log(newReceiptList);

    // save receipts
    newReceiptList.save()
      .then(result => {
        // update the receipts and rows states
        this.setState({
            rows: this.receiptListToRows(newReceiptList),
            receipts: newReceiptList
        })
      })
  }

  render() {
    return (
      <SafeAreaView>
        <DataTable
          title="Receipts"
          headers={["Date", "Store", "Item Count", "Actions"]}
          rows={this.state.rows} />
          <SafeAreaView style={styles.newReceiptFields}>
            <TextInput
              style={styles.field}
              onChangeText={text => this.setState({ dateFieldValue: text })}
              value={this.state.dateFieldValue}
            />
            <TextInput
              style={styles.field}
              onChangeText={text => this.setState({ storeNameFieldValue: text })}
              value={this.state.storeNameFieldValue}
            />
            <TouchableOpacity
              style={styles.addReceiptBtn}
              onPress={this.addReceiptOnPress} >
              <Text>Add Receipt</Text>
            </TouchableOpacity>
        </SafeAreaView>
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
    justifyContent: "center",
    backgroundColor: "green",
    fontWeight: "bold",
    color: "white",
    margin: 5,
    padding: 0,
    height: 40,
    width: 50,
    flex: .5
  },
  deleteBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    fontWeight: "bold",
    color: "white",
    margin: 5,
    padding: 0,
    height: 40,
    width: 50,
    flex: .5
  },
  addReceiptBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    fontWeight: "bold",
    color: "white",
    height: 40,
    width: 100,
    margin: 5,
    padding: 0
  },
  actions: {
    flexDirection: "row",
    flex: 1
  },
  newReceiptFields: {
    flex: 1,
    flexDirection: "row",
    margin: 0,
    justifyContent: "center"
  },
  field: {
    flex: .3,
    height: 40,
    width: 100,
    borderColor: "grey",
    borderWidth: 1
  }
})


export default ReceiptManager;
