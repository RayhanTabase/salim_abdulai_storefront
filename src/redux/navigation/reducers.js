import { CHANGE_PRODUCT } from './constants';

const initialState = {
  productId: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PRODUCT:
      return {
        ...state,
        productId: action.payload
      };
    default:
      return state;
  }
};

export default reducer;