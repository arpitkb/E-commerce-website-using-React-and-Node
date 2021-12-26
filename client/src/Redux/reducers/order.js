import {
  MY_ORDERS_ERR,
  MY_ORDERS_REQ,
  MY_ORDERS_SUCC,
  ORDER_CREATE_ERR,
  ORDER_CREATE_REQ,
  ORDER_CREATE_SUCC,
  ORDER_CREATE_RESET,
  ORDER_DETAILS_ERR,
  ORDER_DETAILS_REQ,
  ORDER_DETAILS_SUCC,
  PAYMENT_ERR,
  PAYMENT_SUCC,
  REMOVE_NOTIF_ORDER,
  RESET,
  ORDER_DELIVER_ERR,
  ORDER_DELIVER_SUCC,
  GET_ALL_ORDERS_REQ,
} from "../actions/types";

export const orderReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_CREATE_REQ:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCC:
      return {
        loading: false,
      };
    case ORDER_CREATE_ERR:
      return {
        loading: false,
        error: payload,
      };
    case ORDER_CREATE_RESET:
      return {};
    case REMOVE_NOTIF_ORDER:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const orderDetailReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case ORDER_DETAILS_REQ:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ORDER_DETAILS_SUCC:
      return {
        loading: false,
        order: payload,
      };
    case PAYMENT_ERR:
    case ORDER_DELIVER_ERR:
    case ORDER_DETAILS_ERR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case PAYMENT_SUCC:
      return {
        ...state,
        order: {
          ...state.order,
          isPaid: true,
          paidAt: new Date(Date.now()).toDateString(),
        },
        error: null,
      };
    case ORDER_DELIVER_SUCC:
      return {
        ...state,
        order: {
          ...state.order,
          isDelivered: true,
          deliveredAt: new Date(Date.now()).toDateString(),
        },
        error: null,
      };
    default:
      return state;
  }
};

export const allOrdersReducer = (state = { orders: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case MY_ORDERS_REQ:
      return {
        loading: true,
      };
    case MY_ORDERS_SUCC:
      return {
        loading: false,
        orders: payload,
      };
    case MY_ORDERS_ERR:
      return {
        loading: false,
        error: payload,
      };
    case RESET:
      return {
        orders: [],
      };
    default:
      return state;
  }
};
