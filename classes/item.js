

class Item {

  constructor(quantity, name, price, id) {
    this.quantity = quantity
    this.name = name
    this.pricePerUnit = price
    this.id = id;
  }

  toArray() {
    return [
      this.quantity,
      this.name,
      this.pricePerUnit
    ]
  }

  calculateTotalCost() {
    return this.quantity * this.pricePerUnit
  }

}

export default Item
