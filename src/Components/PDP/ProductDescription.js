import React, { Component} from 'react';
import sanitizeHtml from 'sanitize-html';
import parse from 'html-react-parser';

class ProductDescription extends Component {


  render() {
    console.log(this.props.html)
    const sanitizedHtml = sanitizeHtml(this.props.html);
    return (
      <div className="product-information">
         {parse(sanitizedHtml)}
      </div>
    )
  }
}

export default ProductDescription