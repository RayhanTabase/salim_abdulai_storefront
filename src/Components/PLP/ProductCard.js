import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';
import addToCartIcon from '../../assets/in_cart.svg';
import store from '../../redux/configureStore';
import { change_product } from '../../redux/navigation/actions';
import DisplaySwatch from '../PDP/DisplaySwatch';
import DisplayText from '../PDP/DisplayText';
import { add_to_cart } from '../../redux/shopping_cart/actions';

class ProductCard extends Component {

  constructor(props){
    super(props)  
    this.state={
      selectedAttributes: {},
      showAttributesPopUp: false
    };
  }

  addAttribute = (id, value) => {
    this.setState((prevState) => ({
      ...prevState,
      selectedAttributes : {
        ...prevState.selectedAttributes,
        [id] : value
      }
    }));
  }

  showAttributesPopUp = () => {
    if (this.state.showAttributesPopUp === false) return;
    const { attributes } = this.props.product;
    return (
      <div className="full-screen-popup">
        <div className="pop-up-card">
          <p className="message">Please specify attributes</p>
          <div className="product-attributes">
            {attributes.map((attribute) => {
              if (attribute.type === "text") {
                return (
                  <DisplayText
                    key={attribute.name}
                    attribute={attribute}
                    addAttribute={this.addAttribute}
                    selectedAttributes={this.state.selectedAttributes}
                    cartPage={false}
                  />
                )
              }else if (attribute.type === "swatch") {
                return (
                  <DisplaySwatch
                    key={attribute.name}
                    attribute={attribute}
                    addAttribute={this.addAttribute}
                    selectedAttributes={this.state.selectedAttributes}
                    cartPage={false}
                  />
                )
              } else {return ''}
            })}
          </div>

          <div className="d-flex action-btns">
            <button
              className="add-btn"
              onClick={this.addToCart}
            >
              Add
            </button>

            <button
              className="cancel-btn"
              onClick={this.closeAttributesPopUp}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  checkAttrubutesSelected = () => {
    const { attributes } = this.props.product;
    if (attributes.length !== Object.keys(this.state.selectedAttributes).length) return false;
    return true;
  }

  triggerAttributesPopUp = () => {
    const { attributes } = this.props.product;
    if (attributes.length === 0) this.addToCart();
    else {
      this.setState((prevState) => ({
        ...prevState,
        showAttributesPopUp: true,
        selectedAttributes: {}
      }));
    }
  }

  closeAttributesPopUp = () => {
    this.setState((prevState) => ({
      ...prevState,
      showAttributesPopUp: false
    }));
  }


  addToCart = () => {
    //check attributes selected
    if ( !this.checkAttrubutesSelected()) {
      return;
    }
    const productId = this.props.product.id;
    const { cartReducer } = store.getState();
    const { cart } = cartReducer;
    let item = cart.find((item) => JSON.stringify(item.attributes) === JSON.stringify(this.state.selectedAttributes) && item.id === productId);
    if (item !== undefined) {
      // already in cart message
      alert('This item is already in the cart');
      this.closeAttributesPopUp();
      return;
    }
    store.dispatch(add_to_cart({id: productId, attributes: this.state.selectedAttributes, quantity:1 }));
    // success message
    alert(`Successfully added ${this.props.product.name} to cart`);
    this.closeAttributesPopUp();
  }
  
  changeProductPage = () =>{
    store.dispatch(change_product(this.props.product.id));
  }

  displayProduct = () =>{
    const { name, prices, gallery, inStock } = this.props.product;
    let price = prices[0];
    const { currencyReducer } = store.getState();
    const { currencyType:selectedCurrency } = currencyReducer;
    if (selectedCurrency) {
      price = prices.find((price) => (price.currency.label === selectedCurrency.label));
    }
    const imageSource = gallery[0];
    return (
        <div className={`product-card  ${!inStock && 'fade-content'}`}>
        {
          !inStock && 
          <div className="product-outOfStock"> 
            <p>
              out of stock
            </p>
          </div>
        }
        
        <div className="product-inCart">
          <button
            className="btn-colorless"
            onClick={this.triggerAttributesPopUp}
          >
            <img src={addToCartIcon} alt="add to cart" loading="lazy" />
          </button>
        </div>
        <NavLink
          to = {`/description/`}
          onClick={this.changeProductPage}
        >        
          <img src={imageSource} alt={name} className="product-image" loading="lazy" />
          <p className="product-name">
            {name}
          </p>
          <p className="product-price d-flex">
            <span>
              {price.currency.symbol}
            </span>
            <span>
              {price.amount}
            </span>
          </p>
        </NavLink>
      </div>
    )
  }

  render() {
    return (
      <>
        {this.showAttributesPopUp()}
        {this.displayProduct()}
      </>
    )
  }
}

export default ProductCard;
