import React, { Component} from 'react';
import { useParams } from 'react-router-dom';
import './description.css';
import DisplayText from './DisplayText';
import DisplaySwatch from './DisplaySwatch';
import store from '../../redux/configureStore';
import { add_to_cart } from '../../redux/shopping_cart/actions';
import ProductDescription from './ProductDescription';
import { client, getItem } from '../../Apollo';

const withRouter = WrappedComponent => props => {
  const params = useParams()
  return (
    <WrappedComponent
      {...props}
      params={params}
    />
  );
};

class Description extends Component {
  constructor(props){
    super(props)  
    this.state={
      selectedImage : null,
      selectedAttributes: {},
      canSubmit: false,
      product: null
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

  changeSelectedImage = (source) => {
    this.setState((prevState) => ({
      ...prevState,
      selectedImage: source,
    }));
  }

  checkAttrubutesSelected = () => {
    const { product } = this.state;
    const attributes = product.attributes;
    if (attributes.length !== Object.keys(this.state.selectedAttributes).length) return false;
    return true;
  }

  addToCart = () => {
    //check attributes selected
    if ( !this.checkAttrubutesSelected()) {
      return;
    }
    const { product } = this.state;
    const productId = product.id;
    store.dispatch(add_to_cart({id: productId, attributes: this.state.selectedAttributes, quantity:1 }));
    this.setState((prevState) => ({
      ...prevState,
      selectedAttributes: {}
    }));
  }

  componentDidMount = async() => {
    const { navigationReducer } = store.getState();
    let { productData  } = navigationReducer;

    if ( !productData || productData.id !== this.props.params.id ) {
      try {
        const response = await client.query({
          query: getItem,
          variables: {
            id: this.props.params.id,
          },
        })
        productData = response.data.product
      } catch (err) {
        console.log(err);
      }
    }

    this.setState((prevState) => ({
      ...prevState,
      product: productData
    }));
  }

  displayDescription = () => {
    const { product } = this.state;
    
    if (product === null) return;
    
    const { currencyReducer } = store.getState();
    const { currencyType:selectedCurrency } = currencyReducer;
    let price = product.prices[0];
    if (selectedCurrency !== null) {
      price = product.prices.find((price) => (price.currency.label === selectedCurrency.label));
    }
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
          <ProductDescription html={product.description} />
        </div>
      </>
    )
  }
  

  render() {
    return (
      <div className="product-description d-flex">
        {this.displayDescription()}
      </div>
    )
  }
}

export default withRouter(Description);
