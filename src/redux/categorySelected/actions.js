import { CHANGE_CATEGORY_TYPE } from './constants';

const change_category_type = (payload) => ({
  type: CHANGE_CATEGORY_TYPE,
  payload,
});

export default change_category_type;
