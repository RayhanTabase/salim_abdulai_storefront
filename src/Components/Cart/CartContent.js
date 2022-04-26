import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';
import store from '../../redux/configureStore';
import { show_minicart } from '../../redux/navigation/actions';
import CartProduct from './CartProduct';

class CartPage extends Component {
  constructor(props){
    super(props)
    this.state={
      selectedCurrency: null,
      recordedAmounts: {},
    };
  }

  addToTotal = (id, value) => {
    this.setState((prevState) => ({
      ...prevState,
      recordedAmounts : {
        ...prevState.recordedAmounts,
        [id] : value,
      }
    }));
  }

  removeFromCart = (id) => {
    this.setState((prevState) => ({
      ...prevState,
      recordedAmounts : {
        ...prevState.recordedAmounts,
        [id] : 0,
      }
    }));
  }

  getToTalCart = () => {
    const total = Object.values(this.state.recordedAmounts).reduce((a,b) => parseFloat(a) + parseFloat(b), 0);
    return total.toFixed(2);
  }

  getCartTotalQuantity = () => {
    let count = 0;
    const { cartReducer } = store.getState();
    const { cart } = cartReducer;
    cart.forEach((product) => {
      count += product.quantity;
    });
    return count;
  }

  displayCartProducts = () => {
    const { cartReducer } = store.getState();
    const { cart } = cartReducer;
    return cart.map((product) => 
      <CartProduct
        key={`${product.id} ${JSON.stringify(product)}`}
        product={product}
        addToTotal={this.addToTotal}
        removeFromCart={this.removeFromCart}
      />
    )
  }
 
  render() {
    const { page } = this.props;
    const { currencyReducer } = store.getState();
    const { currencyType:selectedCurrency } = currencyReducer;

    return (
      <>
        {
          page === 'mini' ?
          <>
            <p className="header">
              <span className="title">My Bag,</span>
              <span className="count">{this.getCartTotalQuantity()} items</span>
            </p>
            {this.displayCartProducts()}
          </>
          :
          <div className="cart-page-full">
            <h2 className="page-header2">
              Cart
            </h2>
            <hr/>
            {this.displayCartProducts()}
          </div>
        }
        <div className="cart-extra-details">
          <>
          <p className="tax">
            <span className="text">
              Tax:
            </span>
            <span className="amount">
              {selectedCurrency && selectedCurrency.symbol}
              0
            </span>
          </p>
        
          <p className="quantity">
            <span className="text">
              Qty:
            </span>
            <span className="amount">
              {this.getCartTotalQuantity()}
            </span>
          </p>
          </>
          
          <p className="cart-total">
            <span className="text">
              Total
              { page === 'full' &&
                ':'
              }
            </span>
            <span className="amount">
              {selectedCurrency && selectedCurrency.symbol}
              {this.getToTalCart()}
            </span>
          </p>
          <div className="cart-buttons">
            { page === 'mini' &&
              <div className="d-flex-col view-bag-link">
                <NavLink
                  to = {`/cart`}
                  onClick={() => store.dispatch(show_minicart())}
                >
                  View Bag
                </NavLink>
              </div>
            }
            <button type="button" className="checkout-btn">
              {
              page === 'mini' ?
                'CHECK OUT'
              :
                'ORDER'
              }
            </button>
          </div>
        </div>
      </>
    )
  }
}

export default CartPage;
