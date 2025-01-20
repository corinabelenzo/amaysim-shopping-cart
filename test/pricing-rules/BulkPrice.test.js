const { expect } = require('chai');
const BulkPrice = require('../../src/pricing-rules/BulkPrice');

describe('BulkPrice.apply', () => {
  it('should return the discounted product if the product exists and quantity is greater than or equal to the minimum', () => {
    const cartItems = [
      { code: 'A', quantity: 5 },
      { code: 'B', quantity: 2 }
    ];
    const bulkPriceRule = { product: 'A', minimum: 3, price: 100 };
    const result = BulkPrice.apply(cartItems, bulkPriceRule);
    expect(result).to.deep.equal({ product: 'A', price: 100 });
  });

  it('should return null if the product does not exist in the cart', () => {
    const cartItems = [
      { code: 'A', quantity: 5 },
      { code: 'B', quantity: 2 }
    ];
    const bulkPriceRule = { product: 'C', minimum: 3, price: 100 };
    const result = BulkPrice.apply(cartItems, bulkPriceRule);
    expect(result).to.be.null;
  });

  it('should return null if the product exists but the quantity is less than the minimum', () => {
    const cartItems = [
      { code: 'A', quantity: 2 },
      { code: 'B', quantity: 1 }
    ];
    const bulkPriceRule = { product: 'A', minimum: 3, price: 100 };
    const result = BulkPrice.apply(cartItems, bulkPriceRule);
    expect(result).to.be.null;
  });

  it('should handle an empty cart and return null', () => {
    const cartItems = [];
    const bulkPriceRule = { product: 'A', minimum: 3, price: 100 };
    const result = BulkPrice.apply(cartItems, bulkPriceRule);
    expect(result).to.be.null;
  });
});
