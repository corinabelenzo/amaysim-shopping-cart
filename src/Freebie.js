const CartItem = require('./CartItem');

const self = {
  get(cartItems, freebie) {
    const { required, free } = freebie;
    const item = cartItems.find((item) => item.code === required.product);
    if (item) {
      const freeQuantity = (item.quantity / required.count) * free.count;
      const freeItem = new CartItem(free.product, freeQuantity);
      return freeItem;
    } 
    return null;
  }
}
  
module.exports = self;