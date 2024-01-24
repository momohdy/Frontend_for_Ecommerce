import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UBDATE_FAIL,
  USER_UBDATE_REQUEST,
  USER_UBDATE_SUCCESS,
  USER_GET_PROFILE_FAIL,
  USER_GET_PROFILE_REQUEST,
  USER_GET_PROFILE_SUCCESS,
} from "../constants/userConstants";

import axios from "axios";

export const userLoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const postedData = await axios.post(
      "https://frontend-for-ecommerce-api.onrender.com/users/login",
      { email, password },
      {
        // to be in json format
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: postedData.data,
    });

    localStorage.setItem("userInformation", JSON.stringify(postedData.data));
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const userLogoutAction = () => async (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });

  localStorage.removeItem("userInformation");
};

export const userRegisterAction =
  (name, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const postedData = await axios.post(
        "https://frontend-for-ecommerce-api.onrender.com/users",
        { name, email, password },
        {
          // to be in json format
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: postedData.data,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: postedData.data,
      });

      localStorage.setItem("userInformation", JSON.stringify(postedData.data));
    } catch (err) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const userUbdateAction = (id,name, email, password) => async (dispatch,getState) => {
  try {
    dispatch({
      type: USER_UBDATE_REQUEST,
    });

    const userInformation = getState().userLoginAndLogout.userInformation

    // const   { userLoginAndLogout:  { userInformation } } = getState() 
    console.log(name , email );
    const postedData = await axios.put(
      "https://frontend-for-ecommerce-api.onrender.com/users/profile",
      { id , name, email, password },
      {
        // to be in json format
        headers: {
          "Content-Type": "application/json",
          Authorization : `Bearer ${userInformation.token}`

        },
      }
    );
    // console.log(postedData.data);
    
    dispatch({
      type: USER_UBDATE_SUCCESS,
      payload: postedData.data,
    });

    

    localStorage.setItem("userInformation", JSON.stringify(postedData.data));
    // console.log(localStorage.getItem("userInformation"));

  } catch (err) {
    dispatch({
      type: USER_UBDATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};


export const userGetProfileAction = () => async (dispatch ,getState) => {
  try {
    
    dispatch({
      type: USER_GET_PROFILE_REQUEST,
    });

    const userInformation = getState().userLoginAndLogout.userInformation

    // const   { userLoginAndLogout:  { userInformation } } = getState() 
    const postedData = await axios.get(`https://frontend-for-ecommerce-api.onrender.com/users/profile`, {
      // to be in json format
      headers: {
        "Content-Type": "application/json",
         Authorization : `Bearer ${userInformation.token}`
      },
    });

    console.log(userInformation);

    dispatch({
      type: USER_GET_PROFILE_SUCCESS,
      payload: postedData.data,
    });

  } catch (err) {
    dispatch({
      type: USER_GET_PROFILE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
