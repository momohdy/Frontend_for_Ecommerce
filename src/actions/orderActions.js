import axios from "axios";

import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from "../constants/orderConstants";
// Note , you might nedd to write .js for orderActions

export const createOrderAction = (data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const userInformation = getState().userLoginAndLogout.userInformation;

    // const   { userLoginAndLogout:  { userInformation } } = getState()
    const postedData = await axios.post(`/orders`, data , {
      // to be in json format
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInformation.token}`,
      },
    });

    // console.log(userInformation);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: postedData.data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};


export const getOrderDeatailsAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const userInformation = getState().userLoginAndLogout.userInformation;

    // const   { userLoginAndLogout:  { userInformation } } = getState()
    const postedData = await axios.get(`/orders/${id}` , {
      // to be in json format
      headers: {
        Authorization: `Bearer ${userInformation.token}`,
      },
    });

    
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: postedData.data,
    });
    // console.log(postedData.data);
    
  } catch (err) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};


export const payUbdateAction = (id , paymentResult) => async (dispatch, getState) => {
  try {
    
    dispatch({
      type: ORDER_PAY_REQUEST,
    });
    
    const userInformation = getState().userLoginAndLogout.userInformation;
    
    const postedData = await axios.put(`/orders/${id}/pay`, paymentResult , {
      // to be in json format
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInformation.token}`,
      },
    });
    
    // console.log("suii");

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: postedData.data,
    });

    // console.log(postedData.data);

  } catch (err) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
