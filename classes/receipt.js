import AsyncStorage from '@react-native-community/async-storage';

class Receipt {

  constructor(date, storeName, id) {
    this.storeName = storeName;
    this.date = date,
    this.itemList = []
    this.id = id
  }

  static fromJSONString(objectString) {
    var obj = JSON.parse(objectString)
    var newReceipt = new Receipt(obj.date, obj.storeName, obj.id)
    newReceipt.itemList = obj.itemList
    return newReceipt;
  }

  static fromObject(obj) {
    var newReceipt = new Receipt(obj.date, obj.storeName)
    newReceipt.itemList = obj.itemList
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


  getItems() {
    return this.itemList;
  }

  getItemCount() {
    return this.itemList.length;
  }

  getStoreName() {
    return this.storeName;
  }

  getDate() {
    return this.date;
  }

  getId() {
    return this.storeName + " " + this.date;
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
