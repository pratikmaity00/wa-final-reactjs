import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import toast from 'react-hot-toast';
import type { CartState, Product, CartItem } from '../utils/interfaces';
import { coupons } from '../data/products';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      appliedCoupon: null,
      previousCartState: null,

      addToCart: (product: Product) => {
        const currentItems = get().cartItems;
        // Take a deep snapshot for undo
        const snapshot = currentItems.map((item) => ({ ...item }));

        const existingIndex = currentItems.findIndex((item) => item.id === product.id);

        let updatedItems: CartItem[];
        if (existingIndex > -1) {
          updatedItems = currentItems.map((item, index) =>
            index === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          updatedItems = [...currentItems, { ...product, quantity: 1 }];
        }

        set({
          cartItems: updatedItems,
          previousCartState: snapshot,
        });

        toast.success(`Added ${product.name} to cart`);
      },

      removeFromCart: (productId: number) => {
        const currentItems = get().cartItems;
        const itemToRemove = currentItems.find((item) => item.id === productId);
        const snapshot = currentItems.map((item) => ({ ...item }));

        const updatedItems = currentItems.filter((item) => item.id !== productId);

        set({
          cartItems: updatedItems,
          previousCartState: snapshot,
          appliedCoupon: updatedItems.length === 0 ? null : get().appliedCoupon,
        });

        if (itemToRemove) {
          toast.success(`Removed ${itemToRemove.name} from cart`);
        }
      },

      increaseQuantity: (productId: number) => {
        const currentItems = get().cartItems;
        const snapshot = currentItems.map((item) => ({ ...item }));

        const updatedItems = currentItems.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );

        set({
          cartItems: updatedItems,
          previousCartState: snapshot,
        });
      },

      decreaseQuantity: (productId: number) => {
        const currentItems = get().cartItems;
        const snapshot = currentItems.map((item) => ({ ...item }));

        const targetItem = currentItems.find((item) => item.id === productId);
        if (!targetItem) return;

        let updatedItems: CartItem[];
        if (targetItem.quantity <= 1) {
          updatedItems = currentItems.filter((item) => item.id !== productId);
        } else {
          updatedItems = currentItems.map((item) =>
            item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
          );
        }

        set({
          cartItems: updatedItems,
          previousCartState: snapshot,
          appliedCoupon: updatedItems.length === 0 ? null : get().appliedCoupon,
        });
      },

      clearCart: () => {
        set({
          cartItems: [],
          appliedCoupon: null,
          previousCartState: null,
        });

        toast.success('Cart cleared');
      },

      applyCoupon: (code: string): boolean => {
        const trimmedCode = code.trim().toUpperCase();

        if (!trimmedCode) {
          toast.error('Please enter a coupon code');
          return false;
        }

        const foundCoupon = coupons.find((c) => c.code === trimmedCode);

        if (!foundCoupon) {
          toast.error('Invalid coupon code. Try SAVE10 or SAVE20');
          return false;
        }

        set({ appliedCoupon: foundCoupon });
        toast.success(`Coupon ${foundCoupon.code} applied! (${foundCoupon.percentage}% OFF)`);
        return true;
      },

      removeCoupon: () => {
        set({ appliedCoupon: null });
        toast.success('Coupon removed');
      },

      undoLastAction: () => {
        const { previousCartState } = get();

        if (!previousCartState) {
          return;
        }

        set({
          cartItems: previousCartState,
          previousCartState: null,
          appliedCoupon: previousCartState.length === 0 ? null : get().appliedCoupon,
        });

        toast.success('Last cart action undone!');
      },
    }),
    {
      name: 'grocery-cart-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist cartItems and appliedCoupon, do not persist derived state or undo snapshot
      partialize: (state) => ({
        cartItems: state.cartItems,
        appliedCoupon: state.appliedCoupon,
      }),
    }
  )
);
