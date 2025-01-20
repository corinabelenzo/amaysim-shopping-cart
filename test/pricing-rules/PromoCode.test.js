const { expect } = require('chai');
const PromoCode = require('../../src/pricing-rules/PromoCode');

describe('PromoCode', () => {
  describe('isValid', () => {
    it('should return true when the promo code exists in pricingRules', () => {
      const promoCode = 'SAVE20';
      const pricingRules = {
        promoCodeRules: [
          { code: 'SAVE20', discount: 0.2 },
          { code: 'FREESHIP', discount: 0 }
        ]
      };
      const result = PromoCode.isValid(promoCode, pricingRules);
      expect(result).to.be.true;
    });

    it('should return false when the promo code does not exist in pricingRules', () => {
      const promoCode = 'INVALID';
      const pricingRules = {
        promoCodeRules: [
          { code: 'SAVE20', discount: 0.2 },
          { code: 'FREESHIP', discount: 0 }
        ]
      };
      const result = PromoCode.isValid(promoCode, pricingRules);
      expect(result).to.be.false;
    });

    it('should return false when promoCodeRules is empty', () => {
      const promoCode = 'SAVE20';
      const pricingRules = { promoCodeRules: [] };
      const result = PromoCode.isValid(promoCode, pricingRules);
      expect(result).to.be.false;
    });

    it('should return false when promoCodeRules is undefined', () => {
      const promoCode = 'SAVE20';
      const pricingRules = {};
      const result = PromoCode.isValid(promoCode, pricingRules);
      expect(result).to.be.false;
    });
  });

  describe('apply', () => {
    it('should apply the correct discount when a valid promo code is provided', () => {
      const total = 100;
      const promoCode = 'SAVE20';
      const pricingRules = {
        promoCodeRules: [
          { code: 'SAVE20', discount: 0.2 },
          { code: 'FREESHIP', discount: 0 }
        ]
      };
      const result = PromoCode.apply(total, promoCode, pricingRules);
      expect(result).to.equal(80);
    });

    it('should return the original total when the promo code has no discount', () => {
      const total = 100;
      const promoCode = 'FREESHIP';
      const pricingRules = {
        promoCodeRules: [
          { code: 'SAVE20', discount: 0.2 },
          { code: 'FREESHIP', discount: 0 }
        ]
      };
      const result = PromoCode.apply(total, promoCode, pricingRules);
      expect(result).to.equal(100);
    });
  });
});
