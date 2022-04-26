import { CHANGE_PRODUCT, SHOW_MINICART } from './constants';

const initialState = {
  productId: '',
  showMiniCart: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PRODUCT:
      return {
        ...state,
        productId: action.payload
      };
    case SHOW_MINICART:
      return {
        ...state,
        showMiniCart: !state.showMiniCart
      };
    default:
      return state;
  }
};

export default reducer;