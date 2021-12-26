import {
  EMPTY_CART,
  GET_ALL_ORDERS_ERR,
  GET_ALL_ORDERS_REQ,
  GET_ALL_ORDERS_SUCC,
  MY_ORDERS_ERR,
  MY_ORDERS_REQ,
  MY_ORDERS_SUCC,
  ORDER_CREATE_ERR,
  ORDER_CREATE_REQ,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCC,
  ORDER_DELIVER_ERR,
  ORDER_DELIVER_REQ,
  ORDER_DELIVER_SUCC,
  ORDER_DETAILS_ERR,
  ORDER_DETAILS_REQ,
  ORDER_DETAILS_SUCC,
  PAYMENT_ERR,
  PAYMENT_REQ,
  PAYMENT_SUCC,
  REMOVE_NOTIF_ORDER,
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";

export const createOrder =
  (paymentResult, formData, navigate) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_CREATE_REQ,
      });

      let token;
      if (
        getState().auth &&
        getState().auth.user &&
        getState().auth.user.token
      ) {
        token = getState().auth.user.token;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        "/api/orders",
        { formData, paymentResult },
        config
      );

      dispatch({
        type: ORDER_CREATE_SUCC,
      });

      dispatch(setAlert("Order Placed succesfully", "success", 8000));
      dispatch({
        type: EMPTY_CART,
      });
      navigate(`/order/${data._id}`);

      setTimeout(() => {
        dispatch({
          type: ORDER_CREATE_RESET,
        });
      }, 5000);
    } catch (err) {
      dispatch({
        type: ORDER_CREATE_ERR,
        payload:
          err.response && err.response.data.msg
            ? err.response.data.msg
            : err.message,
      });
    }
  };

export const getOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQ,
    });

    let token;
    if (getState().auth && getState().auth.user && getState().auth.user.token) {
      token = getState().auth.user.token;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCC,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_DETAILS_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });
  }
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAYMENT_REQ,
    });

    let token;
    if (getState().auth && getState().auth.user && getState().auth.user.token) {
      token = getState().auth.user.token;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.put(`/api/orders/${id}/pay`, paymentResult, config);

    dispatch({
      type: PAYMENT_SUCC,
    });
  } catch (err) {
    dispatch({
      type: PAYMENT_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });
  }
};

export const getMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MY_ORDERS_REQ,
    });

    let token;
    if (getState().auth && getState().auth.user && getState().auth.user.token) {
      token = getState().auth.user.token;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`/api/orders`, config);

    dispatch({
      type: MY_ORDERS_SUCC,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: MY_ORDERS_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });
  }
};

export const getAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_ORDERS_REQ,
    });

    let token;
    if (getState().auth && getState().auth.user && getState().auth.user.token) {
      token = getState().auth.user.token;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/all`, config);

    dispatch({
      type: GET_ALL_ORDERS_SUCC,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_ORDERS_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });
  }
};

export const deliverOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQ,
    });

    let token;
    if (getState().auth && getState().auth.user && getState().auth.user.token) {
      token = getState().auth.user.token;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.put(`/api/orders/${id}/delivery`, {}, config);

    dispatch({
      type: ORDER_DELIVER_SUCC,
    });
  } catch (err) {
    dispatch({
      type: ORDER_DELIVER_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });
  }
};
