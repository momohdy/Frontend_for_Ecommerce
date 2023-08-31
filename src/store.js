import { combineReducers, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducer";
import {
  userLoginAndLogoutReducer,
  userRegisterReducer,
  userUbdateReducer,
  userGetProfileReducer,
} from "./reducers/userReducers";
import { shoppingCartsReducer } from "./reducers/shoppingCartsReducer";
import {
  createOrderReducer,
  getOrderDeatilsReducer,
  payUbdateReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  shoppingCarts: shoppingCartsReducer,
  userLoginAndLogout: userLoginAndLogoutReducer,
  userRegister: userRegisterReducer,
  userUbdate: userUbdateReducer,
  userGetProfile: userGetProfileReducer,
  createOrder: createOrderReducer,
  getOrderDeatils: getOrderDeatilsReducer,
  payUbdate: payUbdateReducer,
});

// first time used local storage
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInformationFromStorage = localStorage.getItem("userInformation")
  ? JSON.parse(localStorage.getItem("userInformation"))
  : null;

const shippingInformationFromStorage = localStorage.getItem(
  "shippingInformation"
)
  ? JSON.parse(localStorage.getItem("shippingInformation"))
  : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : null;

const initialState = {
  // first time used initialState
  shoppingCarts: {
    cartItems: cartItemsFromStorage,
    shippingInformation: shippingInformationFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLoginAndLogout: { userInformation: userInformationFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
