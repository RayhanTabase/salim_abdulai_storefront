import React, { Component} from 'react';
import { useParams } from 'react-router-dom';
import './category_page.css';
import ProductsIndex from './ProductsIndex';
import store from '../../redux/configureStore';
import change_category_type from '../../redux/categorySelected/actions';

const withRouter = WrappedComponent => props => {
  const params = useParams()
  return (
    <WrappedComponent
      {...props}
      params={params}
    />
  );
};

class Category extends Component {

  render() {
    const { categoryReducer } = store.getState();
    let { categoryName } = categoryReducer;
    if (this.props.params.categoryName && this.props.params.categoryName !== categoryName ) {
      store.dispatch(change_category_type(this.props.params.categoryName));
      categoryName = this.props.params.categoryName;
    }
    
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

export default withRouter(Category);
