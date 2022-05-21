import React, { Component} from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { getProducts } from '../../Apollo';
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
    const pagProducts = products.slice((pageNumber - 1) * displayNumber, pageNumber * displayNumber);
    return pagProducts.map((product) => {
      return (
        <ProductCard
          key={product.id}
          product={product}
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
