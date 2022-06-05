import React, { Component} from 'react';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Category from '../Components/PLP/Category';
import Description from '../Components/PDP/Description';
import Cart from '../Components/Cart/Cart';
import NotFound from '../Components/NotFound';

class AppRoutes extends Component {

  render() {
    return (
      <Suspense>
        <Routes>
          <Route path="/" element={<Category />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route exact path="/description/:id" element={<Description />} />
          <Route path="/cart" element={<Cart page="full" />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Suspense>
    )
  }
}

export default AppRoutes;
