import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = [];

export const alert = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((al) => al.id !== payload);
    default:
      return state;
  }
};
