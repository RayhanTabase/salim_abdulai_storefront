import { v4 as uuidv4 } from 'uuid';
import { ADD_TO_CART, REMOVE_FROM_CART , ADD_QUANTITY, DECREASE_QUANTITY, CHANGE_ATTRIBUTE } from './constants';

const initialState = {
  cart: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const product = state.cart.find((item) => item.data.id === action.payload.id && JSON.stringify(item.data.attributes) === JSON.stringify(action.payload.attributes))
      if (product === undefined ) {
        const newCartItem = {
          id: uuidv4(),
          data: action.payload
        };
        return {
          ...state,
          cart: [...state.cart, newCartItem]
        };
      } else {
        return {
          ...state,
          cart: state.cart.map((product) => {
            if (product.data.id === action.payload.id && JSON.stringify(product.data.attributes) === JSON.stringify(action.payload.attributes)) {
              product.data.quantity += 1;
            }
            return product;
          }),
        };
      }

    case CHANGE_ATTRIBUTE:
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product.id === action.payload.id) {
            product.data.attributes = action.payload.attributes
          }
          return product;
        }),
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: [...state.cart.filter((product) =>
          (product.id !== action.payload.id))
        ],
      };

    case ADD_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product.id === action.payload.id) {
            product.data.quantity += 1;
          }
          return product;
        }),
      };
    
    case DECREASE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product.id === action.payload.id && product.data.quantity > 1) {
            product.data.quantity -= 1;
          }
          return product;
        }),
      };
    default:
      return state;
  }
};

export default reducer;
