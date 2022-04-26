import { CHANGE_PRODUCT, SHOW_MINICART } from './constants';

export const change_product = (payload) => ({
  type: CHANGE_PRODUCT,
  payload,
});

export const show_minicart = () => ({
  type: SHOW_MINICART,
});
