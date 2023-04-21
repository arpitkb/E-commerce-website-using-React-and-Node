import {
  ADD_REVIEW_ERR,
  ADD_REVIEW_REQ,
  ADD_REVIEW_SUCC,
  GET_PRODUCTS_ERR,
  GET_PRODUCTS_REQ,
  GET_PRODUCTS_SUCC,
  GET_PRODUCT_ERR,
  GET_PRODUCT_REQ,
  GET_PRODUCT_SUCC,
  PRODUCT_CREATE_ERR,
  PRODUCT_CREATE_REQ,
  PRODUCT_DEL_ERR,
  PRODUCT_DEL_REQ,
  PRODUCT_DEL_SUCC,
  PRODUCT_UPDATE_ERR,
  TOP_PRODUCTS_ERR,
  TOP_PRODUCTS_REQ,
  TOP_PRODUCTS_SUCC,
} from "./types";
import axios from "../../axios";
import { setAlert } from "./alert";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import "../../firebase";

export const getProducts =
  (qs = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_PRODUCTS_REQ,
      });
      const { data } = await axios.get(`/api/products${qs}`);
      dispatch({
        type: GET_PRODUCTS_SUCC,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: GET_PRODUCTS_ERR,
        payload:
          err.response && err.response.data.msg
            ? err.response.data.msg
            : err.message,
      });
    }
  };

export const getTopProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: TOP_PRODUCTS_REQ,
    });
    const { data } = await axios.get(`/api/products/top`);
    dispatch({
      type: TOP_PRODUCTS_SUCC,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: TOP_PRODUCTS_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });
  }
};

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCT_REQ,
    });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: GET_PRODUCT_SUCC,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_PRODUCT_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DEL_REQ,
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

    await axios.delete(`/api/products/${id}`, config);

    dispatch({
      type: PRODUCT_DEL_SUCC,
      payload: id,
    });

    dispatch(setAlert("Product deleted succesfully", "success"));
  } catch (err) {
    dispatch({
      type: PRODUCT_DEL_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });
  }
};

export const createProduct =
  (formData, navigate) => async (dispatch, getState) => {
    try {
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
      const { image, price, category } = formData;
      if (!category || category === "") {
        dispatch({
          type: PRODUCT_CREATE_ERR,
          payload: "please add a category",
        });
      } else if (!Number(price)) {
        dispatch({
          type: PRODUCT_CREATE_ERR,
          payload: "price should be numeric ",
        });
      } else if (!image || !image.type) {
        dispatch({
          type: PRODUCT_CREATE_ERR,
          payload: "Please remove and attach image again",
        });
      } else if (image.type.split("/")[0] !== "image") {
        dispatch({
          type: PRODUCT_CREATE_ERR,
          payload: "Please add a valid image",
        });
      } else if (image.size > 2097152) {
        dispatch({
          type: PRODUCT_CREATE_ERR,
          payload: "File size exceeded. Max size allowed is 2mb",
        });
      } else {
        dispatch({
          type: PRODUCT_CREATE_REQ,
        });
        await storeImage(formData.image)
          .then(async (url) => {
            await axios.post(
              `/api/products`,
              { ...formData, image: url },
              config
            );

            dispatch(setAlert("Product created succesfully", "success"));

            navigate("/admin/products");
          })
          .catch((err) =>
            dispatch({
              type: PRODUCT_CREATE_ERR,
              payload:
                err.response && err.response.data.msg
                  ? err.response.data.msg
                  : err.message,
            })
          );
      }
    } catch (err) {
      dispatch({
        type: PRODUCT_CREATE_ERR,
        payload:
          err.response && err.response.data.msg
            ? err.response.data.msg
            : err.message,
      });
    }
  };

export const updateProduct =
  (id, formData, navigate) => async (dispatch, getState) => {
    try {
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

      await axios.put(`/api/products/${id}`, formData, config);

      dispatch(setAlert("Product updated succesfully", "success"));

      navigate("/admin/products");
    } catch (err) {
      dispatch({
        type: PRODUCT_UPDATE_ERR,
        payload:
          err.response && err.response.data.msg
            ? err.response.data.msg
            : err.message,
      });
    }
  };

export const addReview = (id, formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_REVIEW_REQ,
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

    const { data } = await axios.post(
      `/api/products/${id}/review`,
      formData,
      config
    );

    dispatch({
      type: ADD_REVIEW_SUCC,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: ADD_REVIEW_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });
  }
};

// store image in firebase function
const storeImage = async (image) => {
  return new Promise((resolve, reject) => {
    const storage = getStorage();
    const fileName = `${image.name}-${uuidv4()}`;

    const storageRef = ref(storage, "shopzoneimages/" + fileName);

    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};
