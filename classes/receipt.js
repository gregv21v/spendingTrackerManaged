import AsyncStorage from '@react-native-community/async-storage';
import firebase from "firebase"
import Item from "./item.js"

class Receipt {

  constructor(date, storeName, id) {
    this.storeName = storeName;
    this.date = date,
    this.itemList = {}
    this.id = id
    this.lastId = 0;

    this.onChangeFunction = function(event) {
      // do nothing
    }
  }

  static fromJSONString(objectString) {
    var obj = JSON.parse(objectString)
    var newReceipt = new Receipt(obj.date, obj.storeName, obj.id)

    for(var item of Object.values(obj.itemList)) {
      newReceipt.addItem(new Item(item.quantity, item.name, item.pricePerUnit, item.id))
    }

    this.onChangeFunction("create")
    return newReceipt;
  }

  static fromObject(obj) {
    var newReceipt = new Receipt(obj.date, obj.storeName)

    for(var item of Object.values(obj.itemList)) {
      newReceipt.addItem(new Item(item.quantity, item.name, item.pricePerUnit, item.id))
    }

    this.onChangeFunction("create")
    return newReceipt;
  }


  setupListener() {
    var self = this;
    firebase.auth().onAuthStateChanged(user => {
      firebase
        .database()
        .ref("users/" + user.uid + "/receipts/" + self.id)
        .on('value', (snapshot) => {
          let receipt = null;
          if(snapshot.val() !== null) {
            receipt = snapshot.val().receipt;
            self.lastId = receipt.lastId;
            self.date = receipt.date;
            self.storeName = receipt.storeName;

            // save the receipt locally
            //self.save().then(resp => {})
          }
        });
    })
  }

  removeListener() {
    firebase.auth().onAuthStateChanged(user => {
      firebase
        .database()
        .ref("users/" + user.uid + "/receipts/" + this.id)
        .off('value');
    })
  }

  removeFromFirebase() {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        firebase
          .database()
          .ref("users/" + user.uid + "/receipts/" + this.id)
          .remove()
      }
    });
  }

  saveToFirebase() {
    var self = this;
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        firebase
          .database()
          .ref("users/" + user.uid + "/receipts/" + self.id)
          .set({
            receipt: {
              storeName: self.storeName,
              date: self.date,
              itemList: self.itemList,
              lastId: self.lastId
            }
          })
      }
    });
  }


  // load the receipt from local storage
  // according to its id
  static async loadFromLocalStorage(id) {
    try {
      var receipt = await AsyncStorage.getItem('@receipt_' + id)

      if(receipt != null) {
        return Receipt.fromJSONString(receipt);
      } else {
        return {}
      }
    } catch(e) {
      // error reading value
      console.log(e);
    }
  }

  // save the receipt to local storage according
  // to its id.
  async saveToLocalStorage() {
    // save the array of receipts to local storage
    try {
      var jsonString = JSON.stringify(this)
      await AsyncStorage.setItem('@receipt_' + this.id, jsonString)

      this.onChangeFunction("saveToLocalStorage")

    } catch (e) {
      console.log(e);
    }
  }

  incrementLastId() {
    this.lastId++;
    this.onChangeFunction("incrementLastId")
  }

  addNewItem(quantity, name, price) {
    var item = new Item(quantity, name, price, this.lastId)
    this.incrementLastId()
    this.addItem(item)
  }

  addItem(item) {
    this.itemList[item.id] = item
    this.onChangeFunction("addItem")
  }

  deleteItem(item) {
    delete this.itemList[item.id];
    this.onChangeFunction("deleteItem")
  }

  getItems() {
    return Object.values(this.itemList);
  }

  getItemCount() {
    if(this.itemList != null)
      return Object.values(this.itemList).length;
    else
      return 0;
  }


  getStoreName() {
    return this.storeName;
  }

    getDate() {
    return this.date;
  }

  getId() {
    return this.id;
  }

  JSONStringify() {
    return JSON.stringify({
      storeName: this.storeName,
      date: this.date,
      itemList: this.itemList
    })
  }



  toArray() {
    return [
      this.date,
      this.storeName,
      this.getItemCount()
    ]
  }
}

export default Receipt;
