import React, { Component} from 'react';

class DisplayText extends Component {

  displayList = () => {
    return this.props.attribute.items.map((item) =>{
      let isSelected = false;
      Object.entries(this.props.selectedAttributes).forEach((obj) => {
        let attId = obj[0];
        let attVal = obj[1];
        if (attId === this.props.attribute.id && attVal === item.value ) {
          isSelected = true;
        }
      })
      return (
        <div
          key={item.value}
        >
        {
          this.props.cartPage === true ?
            <div
              className={`attribute-value-text ${isSelected && 'attribute-selected-text'}`}
            >
              {item.value}
            </div>
          :
           <button
              className={`attribute-value-text ${isSelected && 'attribute-selected-text'}`}
              type="button"
              onClick={() => this.props.addAttribute(this.props.attribute.id, item.value)}
            >
              {item.value}
            </button>
        }
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <p className="product-attribute-title">
          {this.props.attribute.name}:
        </p>
        <div className="product-attribute-section d-flex">
          {this.displayList()}
        </div>
      </div>
    )
  }
}

export default DisplayText;