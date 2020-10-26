import AsyncStorage from '@react-native-community/async-storage';
import Item from "./item.js"

class Receipt {

  constructor(date, storeName, id) {
    this.storeName = storeName;
    this.date = date,
    this.itemList = {}
    this.id = id
    this.lastId = 0;
  }

  static fromJSONString(objectString) {
    var obj = JSON.parse(objectString)
    var newReceipt = new Receipt(obj.date, obj.storeName, obj.id)


    for(var item of Object.values(obj.itemList)) {
      newReceipt.addItem(new Item(item.quantity, item.name, item.pricePerUnit, item.id))
    }

    return newReceipt;
  }

  static fromObject(obj) {
    var newReceipt = new Receipt(obj.date, obj.storeName)

    for(var item of Object.values(obj.itemList)) {
      newReceipt.addItem(new Item(item.quantity, item.name, item.pricePerUnit, item.id))
    }

    return newReceipt;
  }

  


  // load the receipt from local storage
  // according to its id
  static async load(id) {
    try {
      var receipt = await AsyncStorage.getItem('@receipt_' + id)

      //console.log(receipt);

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
  async save() {
    // save the array of receipts to local storage
    try {
      var jsonString = JSON.stringify(this)
      await AsyncStorage.setItem('@receipt_' + this.id, jsonString)
    } catch (e) {
      console.log(e);
    }
  }

  addNewItem(quantity, name, price) {
    var item = new Item(quantity, name, price, this.lastId)
    this.lastId++
    this.itemList[item.id] = item
  }

  addItem(item) {
    this.itemList[item.id] = item
  }

  deleteItem(item) {
    delete this.itemList[item.id];
  }

  getItems() {
    return this.itemList;
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
