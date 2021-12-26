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
} from "../actions/types";

const initialState = {
  products: [],
  top: [],
};

export const productReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_CREATE_REQ:
    case PRODUCT_DEL_REQ:
    case GET_PRODUCTS_REQ:
      return {
        ...state,
        loading: true,
        error: null,
        errorcu: null,
      };
    case GET_PRODUCTS_SUCC:
      return {
        ...state,
        products: payload.products,
        pages: payload.pages,
        page: payload.page,
        loading: false,
        error: null,
      };
    case PRODUCT_DEL_ERR:
    case GET_PRODUCTS_ERR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case PRODUCT_DEL_SUCC:
      return {
        ...state,
        loading: false,
        products: state.products.filter((el) => el._id !== payload),
        error: null,
      };
    case TOP_PRODUCTS_REQ:
      return {
        ...state,
        toploading: true,
        toperr: null,
        error: null,
      };
    case TOP_PRODUCTS_SUCC:
      return {
        ...state,
        toploading: false,
        top: payload,
        toperr: null,
        error: null,
      };
    case TOP_PRODUCTS_ERR:
      return {
        ...state,
        toploading: false,
        toperr: payload,
      };
    case PRODUCT_UPDATE_ERR:
    case PRODUCT_CREATE_ERR:
      return {
        ...state,
        loading: false,
        errorcu: payload,
      };
    default:
      return state;
  }
};

export const productDetailReducer = (
  state = {
    loading: true,
    product: { reviews: [] },
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCT_REQ:
      return {
        ...state,
        loading: true,
      };
    case GET_PRODUCT_SUCC:
      return {
        loading: false,
        product: payload,
      };
    case GET_PRODUCT_ERR:
      return {
        loading: false,
        error: payload,
      };
    case ADD_REVIEW_REQ:
      return {
        ...state,
        reviewLoading: true,
        reviewError: null,
      };
    case ADD_REVIEW_SUCC:
      return {
        product: {
          ...state.product,
          reviews: payload.reviews,
          numReviews: payload.numReviews,
          rating: payload.rating,
          reviewLoading: false,
          reviewError: null,
        },
      };
    case ADD_REVIEW_ERR:
      return {
        ...state,
        reviewError: payload,
        reviewLoading: false,
      };
    default:
      return state;
  }
};
