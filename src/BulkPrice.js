const self = {
  get(cartItems, bulkPriceRule) {
    const { product, minimum, price } = bulkPriceRule;
    const item = cartItems.find((item) => item.code === product);
    if (item) {
      const { code, quantity } = item;
      if (quantity >= minimum) {
        return { product: code, price: price };
      }
    }
    return null;
  }
}

module.exports = self;