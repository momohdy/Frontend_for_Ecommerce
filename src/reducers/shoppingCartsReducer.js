import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING_ADDRESS,
} from "../constants/shoppingCartsConstants";

export const shoppingCartsReducer = (
  state = { cartItems: [], shippingInformation: {}, paymentMethod: "" },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const alreadyExist = state.cartItems.find(
        (x) => x.id === action.payload.id
      );

      if (alreadyExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.id === alreadyExist.id ? action.payload : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, action.payload] };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.id !== action.payload),
      };

    case SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingInformation: action.payload,
      };

    case SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    default:
      return state;
  }
};
