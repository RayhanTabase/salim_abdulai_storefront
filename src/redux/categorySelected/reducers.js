import { CHANGE_CATEGORY_TYPE } from './constants';

const initialState = {
  categoryName: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CATEGORY_TYPE:
      return {
        ...state,
        categoryName: action.payload
      };

    default:
      return state;
  }
};

export default reducer;