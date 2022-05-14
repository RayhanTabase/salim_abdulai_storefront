import { SHOW_MINICART } from './constants';

const initialState = {
  productId: '',
  showMiniCart: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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