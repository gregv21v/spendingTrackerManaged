import AsyncStorage from '@react-native-community/async-storage';
import Receipt from "./receipt.js"

class ReceiptList {

  constructor(lastId = 0) {
    this.receipts = {}
    this.lastId = lastId
  }

  getReceiptsArray() {
    return Object.values(this.receipts);
  }


  // add a new receipt to the receipt list
  addNew(date, storeName) {
    var id = this.lastId + 1
    this.receipts[id] = new Receipt(date, storeName, id);
    this.lastId++
  }

  // add a receipt that has been already created
  add(receipt) {
    this.receipts[receipt.id] = receipt;
  }

  // removes the item from
  // memory and local storage
  async remove(receipt) {
    delete this.receipts[receipt.id]

    try {
      // remove the item from local storage
      await AsyncStorage.removeItem("@receipt_" + receipt.id)

      // update the ids
      await AsyncStorage.setItem("@receiptIds", JSON.stringify(this.getIds()))

    } catch(e) {
      console.log(e);
    }

  }


  toArray(actionButtons) {
    return Object.values(this.receipts).map(
      (receipt) => [
        receipt.getDate(),
        receipt.getStoreName(),
        receipt.getItemCount()
      ]
    )
  }

  getIds() {
    return Object.keys(this.receipts)
  }

  // remove receipt


  // save receipt array to local storage
  async save() {
    // save the list of ids to @receiptIds
    // save the array of receipts to local storage
    try {
      var jsonString = JSON.stringify(this.getIds())
      await AsyncStorage.setItem("@receiptIds", jsonString)
      await AsyncStorage.setItem("@receiptLastId", this.lastId)


      // save each individual receipt
      for (var receipt of Object.values(this.receipts)) {
        await receipt.save();
      }
    } catch (e) {
      console.log(e);
    }
  }

  // load receipt array from local storage
  static async load() {
    try {

      //await AsyncStorage.clear()
      var newReceiptList = new ReceiptList()
      // load the list of ids
      var idsString = await AsyncStorage.getItem("@receiptIds")
      var ids = JSON.parse(idsString)
      var lastId = await AsyncStorage.getItem("@receiptLastId")




      if(ids != null) {
        newReceiptList.lastId = JSON.parse(lastId);
        // load each individual receipt
        for (var i = 0; i < ids.length; i++) {
          var receipt = await Receipt.load(ids[i])
          newReceiptList.add(receipt)

          //console.log(receipt);
        }
        return newReceiptList;
      } else {
        return new ReceiptList();
      }
    } catch(e) {
      // error reading value
      console.log(e);
    }
  }

}

export default ReceiptList;
