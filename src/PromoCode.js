const self = {
  isValid(promoCode, pricingRules) {
    const { promoCodeRules = [] } = pricingRules;
    return promoCodeRules.some((pc) => pc.code === promoCode);
  },

  apply(total, promoCode, pricingRules) {
    const { promoCodeRules = [] } = pricingRules;
    const { discount } = promoCodeRules.find((pc) => pc.code === promoCode);
    return total - (total * discount);
  }
}

module.exports = self;