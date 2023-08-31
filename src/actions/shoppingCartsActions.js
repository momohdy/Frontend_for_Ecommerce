import axios from "axios";

import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  SAVE_SHIPPING_ADDRESS ,
  SAVE_PAYMENT_METHOD
} from "../constants/shoppingCartsConstants";

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    const dataOfProduct = await axios.get(`/products/${id}`);
    const getDataOfProduct = dataOfProduct.data;
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        id: getDataOfProduct._id,
        name: getDataOfProduct.name,
        brand : getDataOfProduct.brand,
        image: getDataOfProduct.image,
        price: getDataOfProduct.price,
        quantity: quantity,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().shoppingCarts.cartItems)
    );
  } catch (err) {
    // dispatch({
    //   // type: PRODUCT_LIST_FAIL,
    //   payload:
    //     err.response && err.response.data.message
    //       ? err.response.data.message
    //       : err.message,
    // });
  }
};


export const removeFromCart = (id) => (dispatch, getState) => {
  try {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id ,
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().shoppingCarts.cartItems)
    );
  } catch (err) {
    dispatch({
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const saveShippingInformation = (data) => (dispatch) => {
  try {
    dispatch({
      type: SAVE_SHIPPING_ADDRESS,
      payload: data ,
    });

    localStorage.setItem(
      "shippingInformation",
      JSON.stringify(data)
    );

    console.log("dispatch works well");

  } catch (err) {
    dispatch({
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
}


export const savePaymentMethod = (data) => (dispatch) => {
  try {
    dispatch({
      type: SAVE_PAYMENT_METHOD,
      payload: data ,
    });

    console.log("suiii");

    localStorage.setItem(
      "paymentMethod",
      JSON.stringify(data)
    );

    console.log("paymentMethod had set");

  } catch (err) {
    dispatch({
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
}
