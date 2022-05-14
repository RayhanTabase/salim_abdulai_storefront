import React, { Component} from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { getDescription } from '../../Apollo';
import './description.css';
import DisplayText from './DisplayText';
import DisplaySwatch from './DisplaySwatch';
import store from '../../redux/configureStore';
import { add_to_cart } from '../../redux/shopping_cart/actions';
import ProductDescription from './ProductDescription';

class Description extends Component {
  constructor(props){
    super(props)  
    this.state={
      selectedImage : null,
      selectedAttributes: {},
      canSubmit: false
    };
  }

  componentDidMount = () => {
    const { cartReducer, navigationReducer } = store.getState();
    const { productId } = navigationReducer;
    const { cart } = cartReducer;
    const product = cart.find((product) => product.id === productId)
    if (product !== undefined) {
      this.setState((prevState) => ({
        ...prevState,
        selectedAttributes: product.attributes
      }));
    }
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

  changeSelectedImage = (source) => {
    this.setState((prevState) => ({
      ...prevState,
      selectedImage: source,
    }));
  }

  checkAttrubutesSelected = () => {
    const data = this.props.data;
    if (data.loading) return;
    const attributes = data.product.attributes;
    if (attributes.length !== Object.keys(this.state.selectedAttributes).length) return false;
    return true;
  }

  addToCart = () => {
    //check attributes selected
    if ( !this.checkAttrubutesSelected()) {
      return;
    }
    const data = this.props.data;
    if (data.loading) return;
    const productId = data.product.id;
    store.dispatch(add_to_cart({id: productId, attributes: this.state.selectedAttributes, quantity:1 }));
  }

  loadDescription = () => {
    const data = this.props.data;
    if (data.loading) return '';
    const product = data.product;
    const { currencyReducer } = store.getState();
    const { currencyType:selectedCurrency } = currencyReducer;
    let price = product.prices[0];
    if (selectedCurrency !== null) {
      price = product.prices.find((price) => (price.currency.label === selectedCurrency.label));
    }
    
    let descriptionSection = document.createElement('div');
    descriptionSection.innerHTML = product.description
    return (
      <>
        <div className="product-thumbnails">
          {
            product.gallery.map((imageSource) => {
              return (
                <button
                  key={imageSource}
                  className="btn-colorless thumbnail"
                  type="button"
                  onClick={() =>  this.changeSelectedImage(imageSource)}
                >
                  <img src={imageSource} alt={product.name} loading="lazy" />
                </button>
              )
            })
          }
        </div>
        <div className="product-image">          
          <img src={this.state.selectedImage ? this.state.selectedImage: product.gallery[0]} alt={product.name} loading="lazy" />
        </div>
        <div className="product-details"> 
          <p className="product-brand">
            {product.brand}
          </p>
          <p className="product-name">
            {product.name}
          </p>

          <div className="product-attributes">
            {product.attributes.map((attribute) => {
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

          <p className="product-price">
            <span className="text">
              PRICE:
            </span>
            <span className="amount d-flex">
              <span>
                {price.currency.symbol}
              </span>
              <span>
                {price.amount}
              </span>
            </span>
          </p>

          {
            product.inStock ?
            <button
              type="button"
              className="add-toCart-btn"
              onClick={this.addToCart}
            >
              ADD TO CART
            </button>

            :
            <button
              type="button"
              className="disabled-btn"
              disabled
            >
              OUT OF STOCK
            </button>

          }
          <ProductDescription descriptionSection={descriptionSection} />
        </div>
      </>
    )
  }

  render() {
    return (
      <div className="product-description d-flex">
        {this.loadDescription()}
      </div>
    )
  }
}

export default graphql(getDescription, {
  options: () => {
    const { navigationReducer } = store.getState();
    const { productId } = navigationReducer;
    return {
      variables: {
        id: productId
      },
    }
  }
})(Description);
