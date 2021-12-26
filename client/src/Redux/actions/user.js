import {
  USERS_LIST_ERR,
  USERS_LIST_REQ,
  USERS_LIST_SUCC,
  RESET,
  USER_DEL_REQ,
  USER_DEL_SUCC,
  USER_DEL_ERR,
  USER_ORDERS_BY_ADMIN_REQ,
  USER_ORDERS_BY_ADMIN_ERR,
  USER_ORDERS_BY_ADMIN_SUCC,
  USERS_DETAIL_REQ,
  USERS_DETAIL_SUCC,
  USERS_DETAIL_ERR,
  USERS_UPDATE_BY_ADMIN_SUCC,
  USERS_UPDATE_BY_ADMIN_ERR,
  USERS_UPDATE_BY_ADMIN_REQ,
  UPDATE_USER_SUCC,
} from "./types";

import axios from "axios";
import { setAlert } from "./alert";
import { updateUser } from "./auth";

export const getAllUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USERS_LIST_REQ,
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

    const { data } = await axios.get("/api/user", config);

    dispatch({
      type: USERS_LIST_SUCC,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: USERS_LIST_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DEL_REQ,
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

    await axios.delete(`/api/user/${id}`, config);

    dispatch({
      type: USER_DEL_SUCC,
      payload: id,
    });

    dispatch(setAlert("User deleted", "success"));
  } catch (err) {
    dispatch({
      type: USER_DEL_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });
  }
};

export const getUserOrders = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ORDERS_BY_ADMIN_REQ,
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

    const { data } = await axios.get(`/api/user/${id}/orders`, config);

    dispatch({
      type: USER_ORDERS_BY_ADMIN_SUCC,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: USER_ORDERS_BY_ADMIN_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USERS_DETAIL_REQ,
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

    const { data } = await axios.get(`/api/user/${id}`, config);

    dispatch({
      type: USERS_DETAIL_SUCC,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: USERS_DETAIL_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });
  }
};

export const updateUserDetails =
  (formData, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USERS_UPDATE_BY_ADMIN_REQ,
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

      const { data } = await axios.put(`/api/user/${id}`, formData, config);

      dispatch({
        type: USERS_UPDATE_BY_ADMIN_SUCC,
        payload: data,
      });

      if (id === getState().auth.user._id) {
        dispatch(updateUser(formData));
      }

      dispatch(setAlert("User updated succesfully", "success"));
    } catch (err) {
      dispatch({
        type: USERS_UPDATE_BY_ADMIN_ERR,
        payload:
          err.response && err.response.data.msg
            ? err.response.data.msg
            : err.message,
      });
    }
  };
