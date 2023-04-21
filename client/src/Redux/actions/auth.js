import {
  LOGIN_ERR,
  LOGIN_REQ,
  LOGIN_SUCC,
  LOGOUT_SUCC,
  REGISTER_ERR,
  REGISTER_REQ,
  REGISTER_SUCC,
  REMOVE_NOTIF,
  RESET,
  UPDATE_USER_ERR,
  UPDATE_USER_REQ,
  UPDATE_USER_SUCC,
} from "./types";

import axios from "../../axios";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQ,
    });

    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/auth/login",
      { email, password },
      options
    );

    dispatch({
      type: LOGIN_SUCC,
      payload: data,
    });

    localStorage.setItem("user", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: LOGIN_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });
    setTimeout(() => {
      dispatch({
        type: REMOVE_NOTIF,
      });
    }, 2000);
  }
};

export const userLogout = () => async (dispatch) => {
  localStorage.removeItem("user");
  dispatch({
    type: LOGOUT_SUCC,
  });
  dispatch({
    type: RESET,
  });
};

export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_REQ,
    });

    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/auth/register",
      { email, password, name },
      options
    );

    dispatch({
      type: REGISTER_SUCC,
      payload: data,
    });

    localStorage.setItem("user", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: REGISTER_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_NOTIF,
      });
    }, 2000);
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_USER_REQ,
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

    const { data } = await axios.put("/api/user", user, config);

    dispatch({
      type: UPDATE_USER_SUCC,
      payload: data,
    });

    localStorage.setItem("user", JSON.stringify(data));

    setTimeout(() => {
      dispatch({
        type: REMOVE_NOTIF,
      });
    }, 2000);
  } catch (err) {
    dispatch({
      type: UPDATE_USER_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });

    setTimeout(() => {
      dispatch({
        type: REMOVE_NOTIF,
      });
    }, 2000);
  }
};
