import { combineReducers } from "redux";
import { productReducer, productDetailReducer } from "./prod";
import { cartReducer } from "./cart";
import { authReducer } from "./auth";
import { userReducer } from "./admin";
import { alert } from "./alert";
import { orderReducer, orderDetailReducer, allOrdersReducer } from "./order";

export default combineReducers({
  products: productReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  auth: authReducer,
  order: orderReducer,
  orderDetails: orderDetailReducer,
  orders: allOrdersReducer,
  admin: userReducer,
  alert,
});
