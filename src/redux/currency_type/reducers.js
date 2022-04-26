import { CHANGE_CURRENCY_TYPE } from './constants';

const initialState = {
  currencyType: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CURRENCY_TYPE:
      return {
        ...state,
        currencyType: action.payload
      };

    default:
      return state;
  }
};

export default reducer;