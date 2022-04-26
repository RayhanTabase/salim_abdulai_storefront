import React, { Component} from 'react';
import CurrencyPicker from './CurrencyPicker';


class ChangeCurrencyMenu extends Component {
  constructor(props){
    super(props)
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      if (event.target.className.includes('displayCurrencyOptionsBtn')) return;
      if (this.props.showCurrencyPicker) this.props.closeMenu();
    }
  }

  componentDidMount = () => {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  displayCurrencies = () => {
    return this.props.currencies.map((currency) => (
      <CurrencyPicker
        key={currency.symbol}
        currency={currency}
      />
    ));
  }

  render() {
    return (
      <div
        className="currency-options"
        ref={this.wrapperRef}
      >
        {this.displayCurrencies()}
      </div>
    );
  }
};

export default ChangeCurrencyMenu;