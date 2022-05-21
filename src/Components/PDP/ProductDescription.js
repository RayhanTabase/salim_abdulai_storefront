import React, { Component} from 'react';

class ProductDescription extends Component {

  render() {
    return (
      React.createElement('div', null, this.props.html.split('\n'))
    )
  }
}

export default ProductDescription