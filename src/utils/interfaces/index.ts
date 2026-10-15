export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Coupon {
  code: string;
  percentage: number;
}

export interface DiscountRule {
  minimumAmount: number;
  percentage: number;
}

export type SortOption =
  | 'default'
  | 'price-low-to-high'
  | 'price-high-to-low'
  | 'name-a-to-z';

export interface CartCalculation {
  subtotal: number;
  discountPercentage: number;
  discountAmount: number;
  discountType: 'coupon' | 'automatic' | 'none';
  couponCode?: string;
  finalTotal: number;
  nextTierAmount?: number;
  nextTierPercentage?: number;
}

export interface CartState {
  cartItems: CartItem[];
  appliedCoupon: Coupon | null;
  previousCartState: CartItem[] | null;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  undoLastAction: () => void;
}
