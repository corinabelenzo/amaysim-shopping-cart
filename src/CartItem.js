class CartItem {
  constructor(code, quantity) {
    this.code = code;
    this.quantity = quantity ? quantity : 1;
  }
}

module.exports = CartItem;