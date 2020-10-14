class Receipt {

  constructor(date, storeName) {
    this.storeName = storeName;
    this.date = date,
    this.itemList = []
  }

  static fromJSONString(objectString) {
    var obj = JSON.parse(objectString)
    var newReceipt = new Receipt(obj.date, obj.storeName)
    newReceipt.itemList = obj.itemList
    return newReceipt;
  }

  static fromObject(obj) {
    var newReceipt = new Receipt(obj.date, obj.storeName)
    newReceipt.itemList = obj.itemList
    return newReceipt;
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
