import AsyncStorage from '@react-native-community/async-storage';
import Receipt from "./receipt.js"
import firebase from "firebase"

class ReceiptList {

  constructor(lastId = 0) {
    this.receipts = {}
    this.lastId = lastId

    // this function is called every time one of
    // the values of this class changes
    this.onChangeFunction = function(event) {
      // do nothing
    }
  }

  // setter functions
  incrementLastId() {
    this.lastId++
    this.onChangeFunction("incrementLastId")
  }

  // add a new receipt to the receipt list
  addNew(date, storeName) {
    var nextId = this.lastId + 1
    this.add(new Receipt(date, storeName, nextId));
    this.incrementLastId()
  }

  // add a receipt that has been already created
  add(receipt) {
    this.receipts[receipt.id] = receipt;
    this.onChangeFunction("add")
  }

  delete(receipt) {
    delete this.receipts[receipt.id]
    this.onChangeFunction("delete")
  }

  getReceiptsArray() {
    return Object.values(this.receipts);
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

  // removes the item from
  // memory and local storag
  async removeFromLocalStorage(receipt) {
    try {
      // remove the item from local storage
      await AsyncStorage.removeItem("@receipt_" + receipt.id)

      // update the ids
      await AsyncStorage.setItem("@receiptIds", JSON.stringify(this.getIds()))

      this.onChangeFunction("remove")
    } catch(e) {
      throw new Error(e)
      console.log(e);
    }
  }

  // save receipt array to local storage
  async saveToLocalStorage() {
    // save the list of ids to @receiptIds
    // save the array of receipts to local storage
    try {
      var jsonString = JSON.stringify(this.getIds())
      await AsyncStorage.setItem("@receiptIds", jsonString)
      await AsyncStorage.setItem("@receiptLastId", JSON.stringify(this.lastId))

      // save each individual receipt
      for (var receipt of Object.values(this.receipts)) {
        await receipt.saveToLocalStorage();
      }

      this.onChangeFunction("save")
    } catch (e) {
      console.log(e);
    }

  }

  // load receipt array from local storage
  static async loadFromLocalStorage() {
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
        }

        this.onChangeFunction("load")
        return newReceiptList;
      } else {
        return new ReceiptList();
      }
    } catch(e) {
      // error reading value
      throw new Error(e)
      console.log(e);
    }


  }


  removeFromFirebase(receipt) {
    // Listen for authentication state to change.
    firebase.auth().onAuthStateChanged(user => {
      if(user != null) {
        firebase
          .database()
          .ref("users/" + user.uid + "/receipts")
          .remove()
      }
    })
  }

  saveToFirebase(receipt) {
    var self = this;

    firebase.auth().onAuthStateChanged(user => {
      if(user != null) {
        firebase
          .database()
          .ref("users/" + user.uid + "/lastId")
          .set(self.lastId)
      }
    })

    // save each individual receipt
    for (var receipt of Object.values(this.receipts)) {
      receipt.saveToFirebase();
    }
  }






  /**
    setupListeners()
    @description sets up data listeners for keeping track of changes to the firebase
      database
  */
  setupListeners() {
    var self = this;

    // setup listeners for the existing receipts
    for (var id of self.getIds()) {
      this.receipts[id].setupListener()
    }

    // setup a listener for the ids, lastId,
    // and for each receipt
    firebase.auth().onAuthStateChanged(user => {
      // update receipts and ids
      firebase
        .database()
        .ref("users/" + user.uid + "/receipts")
        .on('value', (snapshot) => {

          console.log(snapshot.val());
          const receipts = snapshot.val();

          if(receipts) {
            var ids = Object.keys(receipts);
            // remove receipts that are no longer there.
            for (var id of self.getIds()) {
              if(!ids.includes(id)) {
                // remove it
                firebase
                  .database()
                  .ref("users/" + user.uid + "/receipts/" + id)
                  .set(null)

                self.delete(self.receipts[id])
              }
            }

            // when a new receipt is added that wasn't
            // already there.
            for (var id of ids) {
              if(self.receipts[id] === undefined) {
                /// add the receipt
                var receipt = new Receipt("", "", id)
                self.add(receipt)
                receipt.setupListener()
              }
            }
          }
        });

      // update last id
      firebase
        .database()
        .ref("users/" + user.uid + "/receipts/lastId")
        .on('value', (snapshot) => {
          const lastId = snapshot.val();
          this.lastId = lastId;
        });
    })
  }



  getIds() {
    return Object.keys(this.receipts)
  }

}

export default ReceiptList;
