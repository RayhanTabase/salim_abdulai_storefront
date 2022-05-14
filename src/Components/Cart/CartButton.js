import React, { Component} from 'react';
import store from '../../redux/configureStore';
import { show_minicart } from '../../redux/showMiniCart/actions';
import emptyCart from '../../assets/empty_cart.svg';
import Cart from './Cart';
import './mini_cart.css';
import MiniCart from './MiniCart';

class CartButton extends Component {
  
  showMiniCart = () => {
    store.dispatch(show_minicart());
  }

  render() {
    const { showMiniCartReducer } = store.getState();
    const { showMiniCart } = showMiniCartReducer;
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
            <MiniCart>
              <Cart page="mini" />
            </MiniCart>
        }
      </>
    )
  }
}

export default CartButton;