import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem, cartType } from "../types/cartType";
import { MenuItem } from "../types/restaurantType";

const useCartStore = create<cartType>()(
  persist(
    (set, get) => ({
      restaurantId: null,
      cart: [],

      addToCart: (item: MenuItem , restaurant_id : string) => {
        const state = get(); 
         if (state.cart.length === 0 && state.restaurantId) {
                set({ restaurantId: null });
        }
        if (state.restaurantId && (state?.restaurantId !== restaurant_id) ) {
          return false;
        }

        const existingItem = state.cart?.find(
          (cartItem) => cartItem._id === item._id
        );

        if (existingItem) {
          const newCartArray = state.cart.map((cartItem) =>
            cartItem._id === item._id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
          set({ cart: newCartArray });
        } else {
          const newCartArray = [...(state.cart ?? []),{ ...item, quantity: 1 }]
          if(!state.restaurantId)
            set({restaurantId : restaurant_id })
          set({ cart: newCartArray });
        }

        return true;
      },
      removeFromCart: (_id: string) => {
        set((state) => {
          return {
            cart: state.cart.filter((cartItem) => cartItem._id != _id),
          };
        });
      },
      incrementItem: (_id: string) => {
        set((state) => {
          return {
            cart: state.cart.map((cartItem) =>
              cartItem._id == _id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            ),
          };
        });
      },
      decrementItem: (_id: string) => {
        set((state) => {
          return {
            cart: state.cart.map((cartItem) =>
              cartItem._id == _id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
            ),
          };
        });
      },
      resetCart: () => {
        set({ cart: [] });
      },
      findItemInCart: (item: CartItem) => {
        const currentCart = get().cart;
        return currentCart.find((cartItems) => cartItems._id == item._id)
          ? true
          : false;
      },
      setRestaurantId: (_id: string) => {
        set({ restaurantId: _id });
      },
    }),
    {
      name: "user-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export { useCartStore };
