export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  limits: {
    returns: number;
    storage: number;
    users: number;
  };
}

export const PRICING_PLANS: Record<string, PricingPlan> = {
  BASIC: {
    id: 'price_basic',
    name: 'Basic',
    description: 'Perfect for individual tax preparers',
    price: 199,
    interval: 'year',
    features: [
      'T1 Personal Returns',
      'Basic E-filing',
      'Document Storage',
      'Email Support',
      'Basic Analytics',
    ],
    limits: {
      returns: 50,
      storage: 5, // GB
      users: 1,
    },
  },
  PROFESSIONAL: {
    id: 'price_professional',
    name: 'Professional',
    description: 'Ideal for small accounting firms',
    price: 499,
    interval: 'year',
    features: [
      'All Basic Features',
      'T1, T2, T3 Returns',
      'Priority E-filing',
      'Advanced Analytics',
      'Priority Support',
      'Client Portal',
      'Team Management',
      'Document OCR',
    ],
    limits: {
      returns: 200,
      storage: 20, // GB
      users: 5,
    },
  },
  ENTERPRISE: {
    id: 'price_enterprise',
    name: 'Enterprise',
    description: 'For large accounting firms',
    price: 999,
    interval: 'year',
    features: [
      'All Professional Features',
      'Unlimited Returns',
      'Custom Integrations',
      'Dedicated Support',
      'API Access',
      'Custom Branding',
      'Advanced Security',
      'Audit Trail',
      'Custom Reports',
    ],
    limits: {
      returns: -1, // Unlimited
      storage: 100, // GB
      users: 20,
    },
  },
};

export const ADDON_PRICES = {
  ADDITIONAL_RETURN: 5,
  ADDITIONAL_STORAGE_GB: 2,
  ADDITIONAL_USER: 20,
};

export const EARLY_BIRD_DISCOUNT = 0.2; // 20% off
export const REFERRAL_DISCOUNT = 0.1; // 10% off

export const calculatePrice = (
  plan: PricingPlan,
  additionalReturns: number = 0,
  additionalStorage: number = 0,
  additionalUsers: number = 0,
  discountCode?: string
): number => {
  let totalPrice = plan.price;

  // Add additional returns
  if (additionalReturns > 0) {
    totalPrice += additionalReturns * ADDON_PRICES.ADDITIONAL_RETURN;
  }

  // Add additional storage
  if (additionalStorage > 0) {
    totalPrice += additionalStorage * ADDON_PRICES.ADDITIONAL_STORAGE_GB;
  }

  // Add additional users
  if (additionalUsers > 0) {
    totalPrice += additionalUsers * ADDON_PRICES.ADDITIONAL_USER;
  }

  // Apply discounts
  if (discountCode) {
    switch (discountCode.toUpperCase()) {
      case 'EARLYBIRD':
        totalPrice *= 1 - EARLY_BIRD_DISCOUNT;
        break;
      case 'REFERRAL':
        totalPrice *= 1 - REFERRAL_DISCOUNT;
        break;
    }
  }

  return Math.round(totalPrice * 100) / 100; // Round to 2 decimal places
};
