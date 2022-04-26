import { ADD_TO_CART, REMOVE_FROM_CART , ADD_QUANTITY, DECREASE_QUANTITY } from './constants';

const initialState = {
  cart: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart.filter((product) =>
          (product.id !== action.payload.id ||  JSON.stringify(product.attributes) !== JSON.stringify(action.payload.attributes)))
        , action.payload],
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: [...state.cart.filter((product) =>
          (product.id !== action.payload.id ||  JSON.stringify(product.attributes) !== JSON.stringify(action.payload.attributes)))
        ],
      };

    case ADD_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (JSON.stringify(product) === JSON.stringify(action.payload)) {
            product.quantity += 1;
          }
          return product;
        }),
      };
    
    case DECREASE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (JSON.stringify(product) === JSON.stringify(action.payload)) {
            product.quantity -= 1;
          }
          return product;
        }),
      };

    default:
      return state;
  }
};

export default reducer;