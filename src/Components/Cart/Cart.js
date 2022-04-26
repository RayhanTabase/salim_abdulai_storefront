import React, { Component} from 'react';
import store from '../../redux/configureStore';
import './cart.css';
import CartContent from './CartContent';

class Cart extends Component {

  render() {
    const { cartReducer } = store.getState();
    const { cart } = cartReducer;
    const { page } = this.props;

    if (cart.length < 1) {
      return (
        <div
          className={`cart-is-empty ${page === 'full' && 'cart-is-empty-fullscreen'}`}
        >
          Cart Empty
        </div>
      )
    }else {
      return (
        <CartContent page={page} />
      )
    }
  }
}

export default Cart;
