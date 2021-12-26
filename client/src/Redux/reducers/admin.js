import {
  GET_ALL_ORDERS_ERR,
  GET_ALL_ORDERS_REQ,
  GET_ALL_ORDERS_SUCC,
  RESET,
  USERS_DETAIL_ERR,
  USERS_DETAIL_REQ,
  USERS_DETAIL_SUCC,
  USERS_LIST_ERR,
  USERS_LIST_REQ,
  USERS_LIST_SUCC,
  USERS_UPDATE_BY_ADMIN_ERR,
  USERS_UPDATE_BY_ADMIN_REQ,
  USERS_UPDATE_BY_ADMIN_SUCC,
  USER_DEL_ERR,
  USER_DEL_REQ,
  USER_DEL_SUCC,
  USER_ORDERS_BY_ADMIN_ERR,
  USER_ORDERS_BY_ADMIN_REQ,
  USER_ORDERS_BY_ADMIN_SUCC,
} from "../actions/types";

export const userReducer = (state = { users: [], orders: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case USERS_LIST_REQ:
      return {
        loading: true,
      };
    case USERS_LIST_SUCC:
      return {
        loading: false,
        users: payload,
      };
    case USERS_LIST_ERR:
      return {
        loading: false,
        error: payload,
      };
    case RESET:
      return {
        users: [],
        orders: [],
      };
    case USER_DEL_REQ:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case USER_DEL_SUCC:
      return {
        loading: false,
        users: state.users.filter((u) => u._id !== payload),
      };
    case GET_ALL_ORDERS_ERR:
    case USER_ORDERS_BY_ADMIN_ERR:
    case USERS_UPDATE_BY_ADMIN_ERR:
    case USERS_DETAIL_ERR:
    case USER_DEL_ERR:
      return {
        ...state,
        loading: false,
        error: payload,
        profileLoading: false,
        orderLoading: false,
      };
    case USERS_UPDATE_BY_ADMIN_SUCC:
    case USERS_DETAIL_SUCC:
      return {
        ...state,
        loading: false,
        user: payload,
        profileLoading: false,
        error: null,
      };
    case GET_ALL_ORDERS_SUCC:
    case USER_ORDERS_BY_ADMIN_SUCC:
      return {
        ...state,
        orders: payload,
        orderLoading: false,
        error: null,
      };
    case GET_ALL_ORDERS_REQ:
    case USER_ORDERS_BY_ADMIN_REQ:
      return {
        ...state,
        orderLoading: true,
      };
    case USERS_UPDATE_BY_ADMIN_REQ:
    case USERS_DETAIL_REQ:
      return {
        ...state,
        profileLoading: true,
      };

    default:
      return state;
  }
};
