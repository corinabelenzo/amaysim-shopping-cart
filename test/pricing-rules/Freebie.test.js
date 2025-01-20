const { expect } = require('chai');
const sinon = require('sinon');
const CartItem = require('../../src/CartItem');
const Freebie = require('../../src/pricing-rules/Freebie');

describe('Freebie.get', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('should return a CartItem with the correct free product and quantity when conditions are met', () => {
    const cartItems = [
      { code: 'A', quantity: 6 },
      { code: 'B', quantity: 2 }
    ];
    const freebie = {
      required: { product: 'A', count: 3 },
      free: { product: 'C', count: 1 }
    };
    const result = Freebie.get(cartItems, freebie);
    expect(result).to.be.an.instanceOf(CartItem);
    expect(result.code).to.equal('C');
    expect(result.quantity).to.equal(2);
  });

  it('should return null if the required product is not in the cart', () => {
    const cartItems = [
      { code: 'B', quantity: 2 }
    ];
    const freebie = {
      required: { product: 'A', count: 3 },
      free: { product: 'C', count: 1 }
    };
    const result = Freebie.get(cartItems, freebie);
    expect(result).to.be.null;
  });

  it('should return null if the quantity of the required product is less than the required count', () => {
    const cartItems = [
      { code: 'A', quantity: 2 }
    ];
    const freebie = {
      required: { product: 'A', count: 3 },
      free: { product: 'C', count: 1 }
    };
    const result = Freebie.get(cartItems, freebie);
    expect(result).to.be.null;
  });

  it('should return null if `cartItems` is an empty array', () => {
    const cartItems = [];
    const freebie = {
      required: { product: 'A', count: 3 },
      free: { product: 'C', count: 1 }
    };
    const result = Freebie.get(cartItems, freebie);
    expect(result).to.be.null;
  });

  it('should calculate freeQuantity correctly when it results in a decimal', () => {
    const cartItems = [
      { code: 'A', quantity: 5 }
    ];
    const freebie = {
      required: { product: 'A', count: 2 },
      free: { product: 'C', count: 1 }
    };
    const result = Freebie.get(cartItems, freebie);
    expect(result).to.be.an.instanceOf(CartItem);
    expect(result.code).to.equal('C');
    expect(result.quantity).to.equal(2);
  });
});
