import { CHANGE_PRODUCT } from './constants';

const initialState = {
  productData: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PRODUCT:
      return {
        ...state,
        productData: action.payload
      };
    default:
      return state;
  }
};

export default reducer;