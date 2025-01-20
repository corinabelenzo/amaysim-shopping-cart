const { expect } = require('chai');
const CartItem = require('../src/CartItem');

describe('CartItem', () => {
  it('should correctly initialize with a code and valid quantity', () => {
    const item = new CartItem('A', 5);
    expect(item).to.be.an.instanceOf(CartItem);
    expect(item.code).to.equal('A');
    expect(item.quantity).to.equal(5);
  });

  it('should set the quantity to 1 if no quantity is provided', () => {
    const item = new CartItem('B');
    expect(item).to.be.an.instanceOf(CartItem);
    expect(item.code).to.equal('B');
    expect(item.quantity).to.equal(1);
  });

  it('should round down the quantity to an integer if a floating point value is provided', () => {
    const item = new CartItem('C', 2.9);
    expect(item).to.be.an.instanceOf(CartItem);
    expect(item.code).to.equal('C');
    expect(item.quantity).to.equal(2);
  });

  it('should set the quantity to 1 if the quantity is less than or equal to 1', () => {
    const item1 = new CartItem('D', 0);
    const item2 = new CartItem('E', -2);
    expect(item1).to.be.an.instanceOf(CartItem);
    expect(item1.code).to.equal('D');
    expect(item1.quantity).to.equal(1);
    expect(item2).to.be.an.instanceOf(CartItem);
    expect(item2.code).to.equal('E');
    expect(item2.quantity).to.equal(1);
  });

  it('should handle non-numeric quantities correctly', () => {
    const item = new CartItem('F', '10');
    expect(item).to.be.an.instanceOf(CartItem);
    expect(item.code).to.equal('F');
    expect(item.quantity).to.equal(10);
  });
});
