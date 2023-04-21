import {
  ADD_TO_CART,
  CART_UPDATING,
  ORDER_CREATE_RESET,
  REMOVE_FROM_CART,
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING_ADDRESS,
} from "./types";
import axios from "../../axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_UPDATING,
    });
    const { data } = await axios.get(`/api/products/${id}`);

    const item = {
      name: data.name,
      product: data._id,
      image: data.image,
      qty,
      price: data.price,
      countInStock: data.countInStock,
    };

    dispatch({
      type: ADD_TO_CART,
      payload: item,
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (err) {
    console.log(err);
  }
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_UPDATING,
  });
  dispatch({
    type: REMOVE_FROM_CART,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveAddress = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_PAYMENT_METHOD,
    payload: data,
  });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

export const resetOrder = () => async (dispatch) => {
  dispatch({
    type: ORDER_CREATE_RESET,
  });
};
