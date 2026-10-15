import type { CartItem, Coupon, CartCalculation, Product, SortOption } from './interfaces';
import { discountRules } from '../data/products';

/**
 * Format numeric value to Indian Rupee (INR) currency representation.
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Derive subtotal from cart items.
 */
export const calculateSubtotal = (cartItems: CartItem[]): number => {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
};

/**
 * Derive total units count for the cart badge.
 */
export const calculateTotalUnits = (cartItems: CartItem[]): number => {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

/**
 * Calculate dynamic discounts and final total.
 * Rules:
 * - If coupon is applied: coupon discount applies (SAVE10 = 10%, SAVE20 = 20%).
 * - No stacking with automatic discounts.
 * - If no coupon: eligible automatic discount applies (>= 1000: 10%, >= 500: 5%, else 0%).
 * - Final total cannot be negative.
 */
export const calculateCartTotals = (
  cartItems: CartItem[],
  appliedCoupon: Coupon | null
): CartCalculation => {
  const subtotal = calculateSubtotal(cartItems);

  if (cartItems.length === 0 || subtotal <= 0) {
    return {
      subtotal: 0,
      discountPercentage: 0,
      discountAmount: 0,
      discountType: 'none',
      finalTotal: 0,
    };
  }

  // 1. Coupon discount takes precedence when active
  if (appliedCoupon) {
    const discountAmount = (subtotal * appliedCoupon.percentage) / 100;
    const finalTotal = Math.max(0, subtotal - discountAmount);

    return {
      subtotal,
      discountPercentage: appliedCoupon.percentage,
      discountAmount,
      discountType: 'coupon',
      couponCode: appliedCoupon.code,
      finalTotal,
    };
  }

  // 2. Automatic discount calculation based on highest eligible threshold
  // Sort rules descending by minimumAmount to pick the highest tier
  const sortedRules = [...discountRules].sort((a, b) => b.minimumAmount - a.minimumAmount);
  const eligibleRule = sortedRules.find((rule) => subtotal >= rule.minimumAmount);

  let discountPercentage = 0;
  let discountAmount = 0;
  let discountType: 'automatic' | 'none' = 'none';

  if (eligibleRule) {
    discountPercentage = eligibleRule.percentage;
    discountAmount = (subtotal * discountPercentage) / 100;
    discountType = 'automatic';
  }

  // Calculate incentive for next automatic tier
  let nextTierAmount: number | undefined;
  let nextTierPercentage: number | undefined;

  if (subtotal < 500) {
    nextTierAmount = 500 - subtotal;
    nextTierPercentage = 5;
  } else if (subtotal < 1000) {
    nextTierAmount = 1000 - subtotal;
    nextTierPercentage = 10;
  }

  const finalTotal = Math.max(0, subtotal - discountAmount);

  return {
    subtotal,
    discountPercentage,
    discountAmount,
    discountType,
    finalTotal,
    nextTierAmount,
    nextTierPercentage,
  };
};

/**
 * Sort products without mutating the original array.
 */
export const sortProducts = (
  productsList: Product[],
  sortOption: SortOption
): Product[] => {
  const copied = [...productsList];

  switch (sortOption) {
    case 'price-low-to-high':
      return copied.sort((a, b) => a.price - b.price);
    case 'price-high-to-low':
      return copied.sort((a, b) => b.price - a.price);
    case 'name-a-to-z':
      return copied.sort((a, b) => a.name.localeCompare(b.name));
    case 'default':
    default:
      return copied;
  }
};
