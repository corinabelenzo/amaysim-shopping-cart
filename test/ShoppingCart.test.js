const { expect } = require('chai');
const sinon = require('sinon');
const ShoppingCart = require('../src/ShoppingCart');
const PromoCode = require('../src/pricing-rules/PromoCode');

describe('ShoppingCart', () => {
  let cart;
  let pricingRules;
  let products;

  beforeEach(() => {
    products = {
      P001: {
        code: 'P001',
        name: 'Product 1',
        price: 10.00,
      },
      P002: {
        code: 'P002',
        name: 'Product 2',
        price: 20.00,
      },
      P003: {
        code: 'P003',
        name: 'Product 3',
        price: 15.00,
      },
      P004: {
        code: 'P004',
        name: 'Product 4',
        price: 30.00,
      }
    };
    pricingRules = {
      mForNRules: [],
      bulkPriceRules: [],
      freebieRules: []
    };
    cart = new ShoppingCart(pricingRules);
    cart.products = products;
  });

  describe('add()', () => {
    it('should add a product to the cart if it is not already present', () => {
      cart.add('P001');
      expect(cart._items).to.have.lengthOf(1);
      expect(cart._items[0].code).to.equal('P001');
    });

    it('should increment the quantity of an existing product in the cart', () => {
      cart.add('P001');
      cart.add('P001');
      expect(cart._items[0].quantity).to.equal(2);
    });

    it('should add a promo code if it is valid', () => {
      const promoCode = 'DISCOUNT10';
      const validPromoCodeStub = sinon.stub(PromoCode, 'isValid').returns(true);
      cart.add('P001', promoCode);
      expect(cart.promoCodes).to.include(promoCode);
      validPromoCodeStub.restore();
    });

    it('should not add an invalid promo code', () => {
      const promoCode = 'INVALIDCODE';
      const validPromoCodeStub = sinon.stub(PromoCode, 'isValid').returns(false);
      cart.add('P001', promoCode);
      expect(cart.promoCodes).to.not.include(promoCode);
      validPromoCodeStub.restore();
    });
  });

  describe('total()', () => {
    it('should calculate the correct total without any discounts', () => {
      cart.add('P001');
      cart.add('P002');
      const total = cart.total();
      expect(total).to.equal('30.00');
    });

    it('should apply bulk price discounts correctly', () => {
      pricingRules.bulkPriceRules = [{ product: 'P001', minimum: 2, price: 8 }];
      cart.add('P001');
      cart.add('P001');
      cart.add('P002');
      const total = cart.total();
      expect(total).to.equal('36.00');
    });

    it('should apply M-for-N discounts correctly', () => {
      pricingRules.mForNRules = [{ product: 'P001', m: 2, n: 1 }];
      cart.add('P001');
      cart.add('P001');
      cart.add('P002');
      const total = cart.total();
      expect(total).to.equal('30.00');
    });

    it('should apply promo codes correctly', () => {
      const promoCode = 'DISCOUNT10';
      const promoCodeStub = sinon.stub(PromoCode, 'apply').returns(18);
      cart.add('P001');
      cart.add('P002');
      cart.promoCodes.push(promoCode);
      const total = cart.total();
      expect(total).to.equal('18.00');
      promoCodeStub.restore();
    });
  });

  describe('items()', () => {
    it('should list all items in the cart with quantity and name', () => {
      const consoleLogStub = sinon.stub(console, 'log');
      cart.add('P001');
      cart.add('P002');
      cart.items();
      expect(consoleLogStub.calledWith('1 x Product 1')).to.be.true;
      expect(consoleLogStub.calledWith('1 x Product 2')).to.be.true;
      consoleLogStub.restore();
    });

    it('should list freebies correctly', () => {
      pricingRules.freebieRules = [
        { required: { product: 'P001', count: 1 }, free: { product: 'P003', count: 1 }}
      ]
      const consoleLogStub = sinon.stub(console, 'log');
      cart.add('P001');
      cart.add('P002');
      cart.items();
      expect(consoleLogStub.calledWith('1 x Product 1')).to.be.true;
      expect(consoleLogStub.calledWith('1 x Product 2')).to.be.true;
      expect(consoleLogStub.calledWith('1 x Product 3')).to.be.true;
      consoleLogStub.restore();
    });
  });
});
