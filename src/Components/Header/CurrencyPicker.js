import React, { Component} from 'react';
import store from '../../redux/configureStore';
import change_currency_type from '../../redux/currency_type/actions';

class CurrencyPicker extends Component {
  changeCurrency = () => {
    store.dispatch(change_currency_type(this.props.currency));
  }

  render() {
    const { symbol, label } = this.props.currency;
    return (
      <button
        className="btn-colorless currency-option-display"
        onClick={this.changeCurrency} 
      >
        <p>{symbol}</p>
        <p>{label}</p>
      </button>
    )
  }
}

export default CurrencyPicker;
