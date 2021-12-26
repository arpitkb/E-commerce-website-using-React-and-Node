import {
  ADD_TO_CART,
  CART_UPDATING,
  REMOVE_FROM_CART,
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING_ADDRESS,
  EMPTY_CART,
} from "../actions/types";

export const cartReducer = (
  state = {
    cartItems: [],
    loading: true,
    shippingAddress: {},
    paymentMethod: {},
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case CART_UPDATING:
      return {
        ...state,
        loading: true,
      };
    case EMPTY_CART:
      return {
        ...state,
        cartItems: [],
      };
    case ADD_TO_CART:
      const itemExist = state.cartItems.find(
        (el) => el.product === payload.product
      );
      if (itemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((el) =>
            el.product === payload.product ? payload : el
          ),
          loading: false,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, payload],
          loading: false,
        };
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((el) => el.product !== payload),
        loading: false,
      };
    case SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: payload,
        loading: false,
      };
    case SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: payload,
        loading: false,
      };
    default:
      return state;
  }
};
