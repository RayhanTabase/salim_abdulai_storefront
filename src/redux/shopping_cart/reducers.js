import { ADD_TO_CART, REMOVE_FROM_CART , ADD_QUANTITY, DECREASE_QUANTITY } from './constants';

const initialState = {
  cart: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = state.cart.find((product) => (product.id === action.payload.id))
      if (item !== undefined) {
        return {
          ...state,
          cart: [...state.cart.map((product) => {
            if (product.id === action.payload.id) {
              product = action.payload;
            }
            return product;
          })
          ],
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, action.payload]
        };
      }

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
            product.quantity += 1;
          }
          return product;
        }),
      };
    
    case DECREASE_QUANTITY:
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product.id === action.payload.id) {
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