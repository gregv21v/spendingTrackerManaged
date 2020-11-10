import React, { Component } from 'react';
import { AppRegistry, Button, SafeAreaView,
  Image, Platform, Dimensions,
  StyleSheet, View, Text, TextInput } from 'react-native';

import ReceiptsTable from "./ReceiptsTable.js";
import CustomButton from "./CustomButton.js";
import Receipt from "../classes/receipt.js";
import ReceiptList from "../classes/receiptList.js"
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'


/*
  ReceiptManager
  Description: A screen that manages all the receipts
    a person has.
*/
class ReceiptManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dateFieldValue: "Date",
      storeNameFieldValue: "Store Name",
      receiptList: new ReceiptList(),
      image: {}
    }

    this.addReceiptOnPress = this.addReceiptOnPress.bind(this)
    this.deleteReceipt = this.deleteReceipt.bind(this)
    this.pickImage = this.pickImage.bind(this)
  }

  componentWillMount() {
    ReceiptList.load().then(
      (receiptList) => {
        console.log(receiptList);
        this.setState({
          receiptList: receiptList
        })
      }
    )
  }


  /**
    deleteReceipt()
    @param receipt the receipt to be deleted
    @description deletes a receipt from the list of receipts
  */
  async deleteReceipt(receipt) {
    var receiptList = this.state.receiptList
    receiptList.remove(receipt)
      .then(
        (resp) => {
          this.setState({
            receiptList: receiptList,
          })
          console.log(receiptList);

        }
      )
  }


  /**
    pickImage()
    @description allows you to pick a receipt image to be saved
      with the receipt
  */
  async pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      this.setState({
        image: result.uri
      });
    }

  }

  /*
  pickImage() {
    // Tests I've tried:

      1. remove the s from headers
      2. remove the headers all together, which gets rid of the boundry error
        but makes the file on the server side undefined.
      3. I removed the accept application/json line to no avail
      4. I have used the axios library instead of the fetch call.



    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }).then(result => {
      let options = {
        method: 'POST',
        body: formData,
        header: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        },
      };

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

      if (!result.cancelled) {
        this.setState({
          image: result.uri
        });
      }

      fetch("http://localhost:8080/upload_receipt_img", options)
        .then(result => console.log(result))
    })
  };
  */

  addReceiptOnPress() {
    // add new receipt to list of receipts

    var newReceiptList = this.state.receiptList
    newReceiptList.addNew(this.state.dateFieldValue, this.state.storeNameFieldValue)

    console.log(newReceiptList);

    // save receipts
    newReceiptList.save()
      .then(result => {
        // update the receipts and rows states
        this.setState({
            receiptList: newReceiptList
        })
      })
  }


  exportReceipt(receipt) {
    FileSystem.writeAsStringAsync(
      FileSystem.documentDirectory + "receipt" + receipt.id + ".json",
      JSON.stringify(receipt)
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
          <ReceiptsTable
            title="Receipts"
            headers={["Date", "Store", "Item Count", "Actions"]}
            receiptList={this.state.receiptList}
            deleteReceipt={this.deleteReceipt}
            navigation={this.props.navigation} />
          <View style={styles.newReceiptFields}>
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
            <CustomButton
              buttonStyle={styles.addReceiptBtn}
              text="Add Receipt"
              onPress={this.addReceiptOnPress} >
            </CustomButton>
        </View>
        <View style={{flex: .1}}>
          <CustomButton
            buttonStyle={styles.pickImageBtn}
            text="Pick an image from camera roll"
            onPress={this.pickImage}>
          </CustomButton>
          {this.state.image && <Image source={{ uri: this.state.image }} style={styles.image} />}
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
  pickImageView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: Dimensions.get("window").width,
    height: 250
  },
  image: {
    width: 200,
    height: 200,
    justifyContent: "center"
  },
  pickImageBtn: {
    flex: .3,
    width: Dimensions.get("window").width,
    height: 60,
    padding: 20,
    backgroundColor: "blue"
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    margin: 5,
    padding: 0,
    height: 40,
    width: 50,
    borderRadius: 3,
    flex: .5
  },
  btnText: {
    color: "white"
  },

  exportBtn: {
    backgroundColor: "orange",
    flex: 0.3
  },
  addReceiptBtn: {
    backgroundColor: "blue",
    width: 100,
    flex: .3
  },

  newReceiptFields: {
    flex: .1,
    flexDirection: "row",
    margin: 0,
    justifyContent: "center",
    width: Dimensions.get("window").width
  },
  field: {
    flex: .3,
    margin: 5,
    height: 40,
    width: 100,
    borderColor: "grey",
    borderWidth: 1
  }
})


export default ReceiptManager;
