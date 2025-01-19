const ShoppingCart = require('./src/ShoppingCart');

const pricingRules = {
  mForNRules: [
    { product: 'ult_small', m: 3, n: 2 }
  ],
  bulkPriceRules: [
    { product: 'ult_large', minimum: 4, price: 39.90 }
  ],
  promoCodeRules: [
    { code: 'I<3AMAYSIM', discount: 0.10 }
  ],
  freebieRules: [
    { required: { product: 'ult_medium', count: 1 }, free: { product: '1gb', count: 1 }}
  ]
}

// Scenario 1
// const cart = new ShoppingCart(pricingRules); 
// cart.add('ult_small');
// cart.add('ult_small');
// cart.add('ult_small');
// cart.add('ult_large');
// cart.items();
// cart.total();

// Scenario 2
// const cart = new ShoppingCart(pricingRules); 
// cart.add('ult_small');
// cart.add('ult_small');
// cart.add('ult_large');
// cart.add('ult_large');
// cart.add('ult_large');
// cart.add('ult_large');
// cart.items();
// cart.total();

// Scenario 3
// const cart = new ShoppingCart(pricingRules); 
// cart.add('ult_small');
// cart.add('ult_medium');
// cart.add('ult_medium');
// cart.items();
// cart.total();

// Scenario 4
const cart = new ShoppingCart(pricingRules); 
cart.add('ult_small');
cart.add('1gb', 'I<3AMAYSIM');
cart.items();
cart.total();