import React, { Component} from 'react';
import store from '../../redux/configureStore';
import { show_minicart } from '../../redux/navigation/actions';
import emptyCart from '../../assets/empty_cart.svg';
import Cart from './Cart';
import './mini_cart.css';

class CartButton extends Component {
  
  showMiniCart = () => {
    store.dispatch(show_minicart());
  }

  render() {
    const { navigationReducer } = store.getState();
    const { showMiniCart } = navigationReducer;
    return (
      <>
        <button
          type="button"
          className="btn-colorless cartMenuBtn"
          onClick={this.showMiniCart}
          >
          <img className="cartMenuBtn" src={emptyCart} alt="empty cart"/>
        </button>
        {
          showMiniCart &&
            <div className="display-mini-cart">
              <Cart page="mini" />
            </div>
        }
      </>
    )
  }
}

export default CartButton;