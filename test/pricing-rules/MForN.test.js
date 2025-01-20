const { expect } = require('chai');
const MForN = require('../../src/pricing-rules/MForN');

describe('MForN.apply', () => {
  let catalogue;

  beforeEach(() => {
    catalogue = {
      A: { price: 50 },
      B: { price: 30 },
      C: { price: 20 },
    }
  });

  it('should calculate the new price correctly when the quantity satisfies the m-for-n rule', () => {
    const cartItems = [
      { code: 'A', quantity: 5 },
    ];
    const mForNRule = { product: 'A', m: 3, n: 2 };
    const result = MForN.apply(cartItems, catalogue, mForNRule);
    expect(result).to.deep.equal({ product: 'A', price: '40.00' });
  });

  it('should calculate the new price correctly when quantity is exactly a multiple of m', () => {
    const cartItems = [
      { code: 'B', quantity: 6 },
    ];
    const mForNRule = { product: 'B', m: 2, n: 1 };
    const result = MForN.apply(cartItems, catalogue, mForNRule);
    expect(result).to.deep.equal({ product: 'B', price: '15.00' });
  });

  it('should return null if the product is not found in the cart', () => {
    const cartItems = [
      { code: 'A', quantity: 5 },
    ];
    const mForNRule = { product: 'C', m: 3, n: 2 };
    const result = MForN.apply(cartItems, catalogue, mForNRule);
    expect(result).to.be.null;
  });

  it('should return null if cartItems is empty', () => {
    const cartItems = [];
    const mForNRule = { product: 'A', m: 3, n: 2 };
    const result = MForN.apply(cartItems, catalogue, mForNRule);
    expect(result).to.be.null;
  });

  it('should calculate correctly when quantity is less than m', () => {
    const cartItems = [
      { code: 'C', quantity: 2 },
    ];
    const mForNRule = { product: 'C', m: 3, n: 2 };
    const result = MForN.apply(cartItems, catalogue, mForNRule);
    expect(result).to.deep.equal({ product: 'C', price: '20.00' });
  });
});
