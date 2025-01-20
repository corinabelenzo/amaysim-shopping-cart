const CartItem = require('./CartItem');
const BulkPrice = require('./pricing-rules/BulkPrice');
const Freebie = require('./pricing-rules/Freebie');
const MForN = require('./pricing-rules/MForN');
const PromoCode = require('./pricing-rules/PromoCode');
const { products } = require('./constants');

class ShoppingCart {
  constructor(pricingRules = {}) {
    this._items = [];
    this.pricingRules = pricingRules;
    this.promoCodes = [];
    this.products = products;
  }

  add(productCode, promoCode) {
    const cartItem = this._items.find((item) => item.code === productCode);
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      if (this.products[`${productCode}`]) {
        this._items.push(new CartItem(productCode));
      } 
    }

    if (promoCode && !this.promoCodes.includes(promoCode)) {
      if (PromoCode.isValid(promoCode, this.pricingRules)) {
        this.promoCodes.push(promoCode);
      }
    }
  }

  #getDiscounts() {
    let discounts = {};
    const { mForNRules, bulkPriceRules } = this.pricingRules;

    mForNRules.forEach((mForNRule) => {
      const discountedItem = MForN.apply(this._items, this.products, mForNRule);
      if (discountedItem) {
        discounts[`${discountedItem.product}`] = { price: discountedItem.price };
      }
    });

    bulkPriceRules.forEach((bulkPriceRule) => {
      const discountedItem = BulkPrice.apply(this._items, bulkPriceRule);
      if (discountedItem) {
        discounts[`${discountedItem.product}`] = { price: discountedItem.price };
      }
    });

    // console.log(discounts);
    return discounts;
  }

  #getPrice(item, discounts) {
    return discounts[`${item.code}`]
      ? discounts[`${item.code}`].price
      : this.products[`${item.code}`].price;
  }

  total() {
    let total = 0;
    const discounts = this.#getDiscounts();
    
    this._items.forEach((item) => {
      const price = this.#getPrice(item, discounts);
      const itemTotal = price * item.quantity;
      total = total + itemTotal;
    });

    this.promoCodes.forEach((promoCode) => {
      total = PromoCode.apply(total, promoCode, this.pricingRules)
    });

    console.log(`$ ${total.toFixed(2)}`);
  }

  #getFreebies() {
    let freebies = [];
    const { freebieRules } = this.pricingRules;
    freebieRules.forEach((freebieRule) => {
      const freebie = Freebie.get(this._items, freebieRule);
      if (freebie) {
        freebies.push(freebie);
      }
    });
    return freebies;
  }

  items() {
    const freebies = this.#getFreebies();
    [...this._items, ...freebies].forEach((item) => {
      console.log(`${item.quantity} x ${this.products[`${item.code}`].name}`);
    });
  }
}

module.exports = ShoppingCart;