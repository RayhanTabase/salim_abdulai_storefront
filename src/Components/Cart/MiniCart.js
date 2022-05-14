import React, { Component} from 'react';
import store from '../../redux/configureStore';
import { show_minicart } from '../../redux/showMiniCart/actions';
import './mini_cart.css';

class MiniCart extends Component {
  constructor(props){
    super(props)
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this); 
  };
  
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      if (event.target.className.includes('cartMenuBtn')) return;
      store.dispatch(show_minicart());
    }
  }

  componentDidMount = () => {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    return (
      <div 
        className="display-mini-cart"
        ref={this.wrapperRef}
      >
          {this.props.children}
      </div>
    )
  }
}

export default MiniCart;
