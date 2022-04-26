import { CHANGE_CURRENCY_TYPE } from './constants';

const change_currency_type = (payload) => ({
  type: CHANGE_CURRENCY_TYPE,
  payload,
});

export default change_currency_type;
