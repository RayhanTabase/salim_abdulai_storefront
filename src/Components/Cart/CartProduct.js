import React, { Component} from 'react';
import store from '../../redux/configureStore';
import DisplayText from '../PDP/DisplayText';
import DisplaySwatch from '../PDP/DisplaySwatch';
import { add_quantity, decrease_quantity, remove_from_cart } from '../../redux/shopping_cart/actions';

class CartProduct extends Component {
  constructor(props){
    super(props)  
    this.state={
      total: 0,
      imageSourceNumber:0,
      productData: null
    };
  }

  getTotalPrice = () => {
    const { productData:product } = this.state;
    if (product === null) return

    if (!product.inStock) return 0;
    const { currencyReducer } = store.getState();
    const { currencyType:selectedCurrency } = currencyReducer;
    let price = product.prices[0];
    if (selectedCurrency) {
      price = product.prices.find((price) => (price.currency.label === selectedCurrency.label));
    }
    const total = price.amount * this.props.product.data.quantity;
    return total.toFixed(2);
  }

  updateTotal = () => {
    const newTotal = this.getTotalPrice();
    if (newTotal === this.state.total) return;
    this.props.addToTotal(this.props.product.id ,newTotal);
    this.setState((prevState) => ({
      ...prevState,
      total: newTotal
    }));
  }

  componentDidMount = async() => {
    this.updateTotal();
    const productData = await this.props.productData
    this.setState((prevState) => ({
      ...prevState,
      productData: productData
    }));
  }

  addAttribute = () => {
    return
  }

  componentWillUnmount = () => {
    this.props.removeFromCart(this.props.product.id);
  }

  componentDidUpdate = () => {
    this.updateTotal();
  }

  addQuantity = () => {
    store.dispatch(add_quantity({id: this.props.product.id}));
  }

  reduceQuantity = () => {
    if (this.props.product.data.quantity === 1) {
      store.dispatch(remove_from_cart({id: this.props.product.id}));
    } else {
      store.dispatch(decrease_quantity({id: this.props.product.id}));
    }
  }

  changeImage = (num) => {
    const images = this.state.productData.gallery;
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
    const { productData:product } = this.state;
    if (product === null) return
    const { currencyReducer } = store.getState();
    const { currencyType:selectedCurrency } = currencyReducer;
    let price = product.prices[0];
    if (selectedCurrency) {
      price = product.prices.find((price) => (price.currency.label === selectedCurrency.label));
    }
    const { name, brand, gallery, attributes, inStock } = product;
    const imageSource = gallery[this.state.imageSourceNumber];
    const selectedAttributes = this.props.product.data.attributes;
    const { quantity } = this.props.product.data;

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
                    addAttribute={this.addAttribute}
                    cartPage={true}
                  />
                )
              }else if (attribute.type === "swatch") {
                return (
                  <DisplaySwatch
                    key={attribute.name}
                    attribute={attribute}
                    selectedAttributes={selectedAttributes}
                    addAttribute={this.addAttribute}
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
              ???
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
            {
              gallery.length > 1 &&

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
            }
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

export default CartProduct;
