const Catalogue = require('./Catalogue');
const CartItem = require('./CartItem');
const BulkPrice = require('./BulkPrice');
const Freebie = require('./Freebie');
const MForN = require('./MForN');
const PromoCode = require('./PromoCode');

class ShoppingCart {
  constructor(pricingRules = {}) {
    this._items = [];
    this.pricingRules = pricingRules;
    this.promoCodes = [];
  }
  
  add(productCode, promoCode) {
    const cartItem = this._items.find((item) => item.code === productCode);
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      this._items.push(new CartItem(productCode));
    }

    if (promoCode && !this.promoCodes.includes(promoCode)) {
      if (PromoCode.isValid(promoCode, this.pricingRules)) {
        this.promoCodes.push(promoCode);
      }
    }
  }

  total() {
    let total = 0;

    let discountCatalogue = {};
    const { mForNRules, bulkPriceRules } = this.pricingRules;

    bulkPriceRules.forEach((bulkPriceRule) => {
      const discountedProduct = BulkPrice.get(this._items, bulkPriceRule);
      if (discountedProduct) {
        discountCatalogue[`${discountedProduct.product}`] = { price: discountedProduct.price };
      }
    });

    mForNRules.forEach((mForNRule) => {
      const discountedProduct = MForN.apply(this._items, mForNRule);
      if (discountedProduct) {
        discountCatalogue[`${discountedProduct.product}`] = { price: discountedProduct.price };
      }
    })

    this._items.forEach((item) => {
      const price = discountCatalogue[`${item.code}`] ? discountCatalogue[`${item.code}`].price : Catalogue[`${item.code}`].price;
      const itemTotal = price * item.quantity;
      total = total + itemTotal;
    });

    this.promoCodes.forEach((promoCode) => {
      total = PromoCode.apply(total, promoCode, this.pricingRules)
    });

    console.log(total.toFixed(2));
  }

  items() {
    let freebies = [];
    const { freebieRules } = this.pricingRules;
    freebieRules.forEach((freebieRule) => {
      const freebie = Freebie.get(this._items, freebieRule);
      freebies.push(freebie);
    });
    console.log([...this._items, ...freebies]);
  }
}

module.exports = ShoppingCart;