import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReudcer from "./Redux/reducers";

const cartItemsFromLocal = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userFromLocal = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const addressFromLocal = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromLocal,
    shippingAddress: addressFromLocal,
  },
  auth: {
    user: userFromLocal,
  },
};
const middleware = [thunk];

const store = createStore(
  rootReudcer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
