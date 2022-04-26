import React, { Component} from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { getItem } from '../../Apollo';
import store from '../../redux/configureStore';
import DisplayText from '../PDP/DisplayText';
import DisplaySwatch from '../PDP/DisplaySwatch';
import { add_quantity, decrease_quantity, remove_from_cart } from '../../redux/shopping_cart/actions';

class CartProduct extends Component {
  constructor(props){
    super(props)  
    this.state={
      total: 0,
      selectedAttributes: {},
      imageSourceNumber:0
    };
  }

  getTotalPrice = () => {
    const data = this.props.data;
    if (data.loading) return 0;
    const product = data.product;
    if (!product.inStock) return 0;
    const { currencyReducer } = store.getState();
    const { currencyType:selectedCurrency } = currencyReducer;
    let price = product.prices[0];
    if (selectedCurrency) {
      price = product.prices.find((price) => (price.currency.label === selectedCurrency.label));
    }
    const total = price.amount * this.props.product.quantity;
    return total.toFixed(2);
  }

  updateTotal = () => {
    const newTotal = this.getTotalPrice();
    if (newTotal === this.state.total) return;
    this.props.addToTotal(JSON.stringify(this.props.product.attributes) + `${this.props.product.id}` ,newTotal);
    this.setState((prevState) => ({
      ...prevState,
      total: newTotal
    }));
  }

  componentDidMount = () => {
    this.updateTotal();
  }

  componentWillUnmount = () => {
    this.props.removeFromCart(JSON.stringify(this.props.product.attributes) + `${this.props.product.id}`);
  }

  componentDidUpdate = () => {
    this.updateTotal();
  }

  addQuantity = () => {
    store.dispatch(add_quantity({id: this.props.product.id, attributes: this.props.product.attributes, quantity: this.props.product.quantity}));
  }

  reduceQuantity = () => {
    if (this.props.product.quantity - 1 < 1) {
      if (window.confirm('Are you sure you want to delete item from cart?')) {
        store.dispatch(remove_from_cart({id: this.props.product.id, attributes: this.props.product.attributes, quantity: this.props.product.quantity}));
      }
    } else {
      store.dispatch(decrease_quantity({id: this.props.product.id, attributes: this.props.product.attributes, quantity: this.props.product.quantity}));
    }
  }

  changeImage = (num) => {
    const data = this.props.data;
    if (data.loading) return '';
    const images = data.product.gallery;
    let nextImageNumber = this.state.imageSourceNumber + num;
    if (nextImageNumber >= images.length) {
      this.setState((prevState) => ({
        ...prevState,
        imageSourceNumber: 0
      }));
    }
    else if (nextImageNumber < 0) {
      this.setState((prevState) => ({
        ...prevState,
        imageSourceNumber: images.length - 1
      }));
    }
    else {
      this.setState((prevState) => ({
        ...prevState,
        imageSourceNumber: nextImageNumber
      }));
    }
  }

  displayProduct = () => {
    const data = this.props.data;
    if (data.loading) return '';
    const product = data.product;
    const { currencyReducer } = store.getState();
    const { currencyType:selectedCurrency } = currencyReducer;
    let price = product.prices[0];
    if (selectedCurrency) {
      price = product.prices.find((price) => (price.currency.label === selectedCurrency.label));
    }
    const { name, brand, gallery, attributes, inStock } = product;
    const imageSource = gallery[this.state.imageSourceNumber];
    const selectedAttributes = this.props.product.attributes;
    const { quantity } = this.props.product;

    return (
      <div className="cart-product-card">
        <div className="section1">
          <p className="brand">
            {brand}
          </p>
          <p className="name">
            {name}
          </p>
          <p className={`price ${!inStock && 'strikeThroughText'}`}>
            <span className="symbol">
              {price.currency.symbol}
            </span>
            <span className="amount">
              {price.amount}
            </span>
          </p>
          <div className="attributes d-flex-col">
            {attributes.map((attribute) => {
              if (attribute.type === "text") {
                return (
                  <DisplayText
                    key={attribute.name}
                    attribute={attribute}
                    selectedAttributes={selectedAttributes}
                    cartPage={true}
                  />
                )
              }else if (attribute.type === "swatch") {
                return (
                  <DisplaySwatch
                    key={attribute.name}
                    attribute={attribute}
                    selectedAttributes={selectedAttributes}
                    cartPage={true}
                  />
                )
              } else {return ''}
            })}
          </div>
        </div>
        <div className="section2">
          <div className='qty d-flex-col'>
            <button
              type="button"
              onClick={() => this.addQuantity()}
            >
              +
            </button>
            <p className="text">
              { quantity }
            </p>
            <button
              type="button"
              onClick={() => this.reduceQuantity()}
            >
              –
            </button>
          </div>
          <div className={`${!inStock && 'fade-content'} product-image`}>
            {
              !inStock && 
              <div className="product-outOfStock"> 
                <p>
                  out of stock
                </p>
              </div>
            }
            <img src={imageSource} alt={name} loading="lazy" />
            <div className="changeImageBtns">
              <button
                type="button"
                onClick={() => this.changeImage(-1)}
              >
                {'<'}
              </button>
              <button
                type="button"
                onClick={() => this.changeImage(1)}
              >
                {'>'} 
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <>
        {this.displayProduct()}
        <hr/>
      </>
    )
  }
}

export default graphql(getItem, {
  options: (props) => {
    return {
      variables: {
        id: props.product.id
      },
    }
  }
})(CartProduct);
