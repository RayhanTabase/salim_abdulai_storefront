import React, { Component} from 'react';
import SanitizedHTML from 'react-sanitized-html';

class ProductDescription extends Component {

  render() {
    return (
      <div className="product-information">
        <SanitizedHTML html={ this.props.html } />
      </div>
    )
  }
}

export default ProductDescription