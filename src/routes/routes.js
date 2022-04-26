import React, { Component} from 'react';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import store from '../redux/configureStore';
import Category from '../Components/PLP/Category';
import Description from '../Components/PDP/Description';
import Cart from '../Components/Cart/Cart';

class AppRoutes extends Component {

  render() {
    const { navigationReducer } = store.getState();
    const { productId } = navigationReducer;

    return (
      <Suspense>
        <Routes>
          <Route path="/" element={<Category />} />
          {
            productId !== '' &&
            <Route exact path="/description" element={<Description />} />
          }
          <Route path="/cart" element={<Cart page="full" />} />
          <Route path="/*" element={<Category />} />
        </Routes>
      </Suspense>
    )
  }
}

export default AppRoutes;
