import React, { Component} from 'react';
import store from '../../redux/configureStore';
import change_category_type from '../../redux/categorySelected/actions'
import { NavLink } from 'react-router-dom';


class CategoryLink extends Component {
  
  changeCategory = (name) => {
    store.dispatch(change_category_type(name));
  };

  render() {
    const { category, selectedCategory } = this.props;
    return (
      <li
        className={`${category.name === selectedCategory && 'active-link'} nav-link`}
      >
      <NavLink
        onClick={()=> this.changeCategory(category.name)}
        to="/"
        className="nav-btn"
      >
        {category.name}
      </NavLink>
      </li>
    );
  }
};

export default CategoryLink;