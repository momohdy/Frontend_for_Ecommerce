import {
  USER_GET_PROFILE_FAIL,
  USER_GET_PROFILE_REQUEST,
  USER_GET_PROFILE_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UBDATE_FAIL,
  USER_UBDATE_REQUEST,
  USER_UBDATE_SUCCESS,
} from "../constants/userConstants";

export const userLoginAndLogoutReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
      return { loading: false, success : true , userInformation: action.payload };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCCESS:
      return { loading: false, userInformation: action.payload };

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};



export const userGetProfileReducer = (state = { user : {} }, action) => {
  switch (action.type) {
    case USER_GET_PROFILE_REQUEST:
      return { loading: true , ...state };

    case USER_GET_PROFILE_SUCCESS:
      return { loading: false, user: action.payload  };

    case USER_GET_PROFILE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userUbdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UBDATE_REQUEST:
      return { loading: true };

    case USER_UBDATE_SUCCESS:
      return { loading: false, userInformation: action.payload };

    case USER_UBDATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

