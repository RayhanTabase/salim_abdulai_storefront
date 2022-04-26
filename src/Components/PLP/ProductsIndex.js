import React, { Component} from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { getProducts } from '../../Apollo';
import store from '../../redux/configureStore';
import ProductCard from './ProductCard';

class ProductsIndex extends Component {
  constructor(props){
    super(props)
    this.state={
      displayNumber:6,
      pageNumber: 1,
    };
  };

  changePage = (num) => {
    if (this.state.pageNumber + num < 1) return;
    const data = this.props.data;
    if (data.loading) return;
    if (!data.category) return;
    const products = data.category.products;
    if (this.state.pageNumber * this.state.displayNumber >= products.length && num > 0 ) return;
    this.setState((prevState) => ({
      ...prevState,
      pageNumber:prevState.pageNumber + num
    }));
  }
 
  displayProducts = () => {
    const data = this.props.data;
    if (data.loading) return;
    if (!data.category) return;
    const { products } = data.category;
    const { pageNumber, displayNumber } = this.state;
    const { cartReducer } = store.getState();
    const { cart } = cartReducer;
    const pagProducts = products.slice((pageNumber - 1) * displayNumber, pageNumber * displayNumber);
    return pagProducts.map((product) => {
      const productInCart = cart.find((cartProduct) => cartProduct.id === product.id );
      const isInCart = productInCart === undefined ? false : true;
      return (
        <ProductCard
          key={product.id}
          product={product}
          isInCart={isInCart}
        />
      )
    });
  }

  render() {
    return (
      <>
        <div className="category-products">
          { this.displayProducts() }
        </div>
        <div className="pagnition">
          <button
            type="button"
            onClick={() => this.changePage(-1)}
          >
            Prev
          </button>
          <p>{this.state.pageNumber}</p>
          <button
            type="button"
            onClick={() => this.changePage(1)}
          >
            Next
          </button>
        </div>
      </>
    )
  }
}

export default graphql(getProducts, {
  options: (props) => {
    return {
      variables: {
        title: props.categoryName
      }
    }
  }
})(ProductsIndex);
