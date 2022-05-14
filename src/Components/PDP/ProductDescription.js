import React, { Component} from 'react';

class ProductDescription extends Component {
  constructor(props){
    super(props)  
    this.contentRef = React.createRef();
  }

  componentDidMount = () => {
    this.contentRef.appendChild(this.props.descriptionSection);
  }

  render() {
    return (
      <div
        ref={node => this.contentRef = node}
        className="product-information"
      >
      </div>
    )
  }
}

export default ProductDescription