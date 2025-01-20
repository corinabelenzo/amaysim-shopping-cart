const self = {
  apply(cartItems, catalogue, mForNRule) {
    const { product, m, n } = mForNRule;
    const item = cartItems.find((item) => item.code === product);
    if (item) {
      const { code, quantity } = item;
      const price = catalogue[`${code}`].price;
      const count = (Math.floor(quantity / m) * (n)) + (quantity % m);
      const newPrice = (count * price) / quantity;
      return { product: code, price: newPrice.toFixed(2) };
    }
    return null;
  }
}

module.exports = self;