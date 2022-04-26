import React, { Component} from 'react';
import { graphql } from '@apollo/client/react/hoc';
import './category_page.css';
import ProductsIndex from './ProductsIndex';
import { getCategories } from '../../Apollo';
import store from '../../redux/configureStore';


class Category extends Component {

  render() {
    const { categoryReducer } = store.getState();
    const { categoryName } = categoryReducer;
    return (
      <div className="plp-content">
        <h2 className="page-header">
          {categoryName}
        </h2>
        <ProductsIndex
          categoryName={categoryName}
        />
      </div>
    )
  }
}

export default graphql(getCategories)(Category);
