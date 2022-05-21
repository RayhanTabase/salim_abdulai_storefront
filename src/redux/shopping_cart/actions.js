import { ADD_TO_CART, REMOVE_FROM_CART, ADD_QUANTITY, DECREASE_QUANTITY, CHANGE_ATTRIBUTE } from './constants';

export const add_to_cart = (payload) => ({
  type: ADD_TO_CART,
  payload,
});

export const remove_from_cart = (payload) => ({
  type: REMOVE_FROM_CART,
  payload,
});

export const add_quantity = (payload) => ({
  type: ADD_QUANTITY,
  payload,
});

export const decrease_quantity = (payload) => ({
  type: DECREASE_QUANTITY,
  payload,
});

export const change_attribute = (payload) => ({
  type: CHANGE_ATTRIBUTE,
  payload,
});