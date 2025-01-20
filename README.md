# amaysim-shopping-cart

The Amaysim Shopping Cart implementation in Node.js that supports adding products, applying pricing rules, calculating totals, and retrieving cart items.

### Requirements
- Node.js v22 or higher
- npm (Node Package Manager)

### Installation

To get started, clone the repository and install the required dependencies:
```bash
npm install
```
Note: Dependencies are only for unit testing.

### Usage

#### 1. Create and Use Shopping Cart
To create and use the shopping cart, modify `index.js`:
```javascript
// Define pricing rules
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
};

// Create shopping cart
// Add and retrieve items
// Apply promo code
// Compute total price
const cart = new ShoppingCart(pricingRules); 
cart.add('ult_small');
cart.add('1gb', 'I<3AMAYSIM');
cart.items();
cart.total();
```

#### 2. Run the Program
To run the program:
```bash
npm run start
```

#### 3. Unit Tests
To run unit tests:
```bash
npm run test
```