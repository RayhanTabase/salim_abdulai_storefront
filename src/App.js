import React, { Component} from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/routes';
import Header from './Components/Header/Header';
import store from './redux/configureStore';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      showMiniCart: false
    };
  }

  componentDidMount = () => {
    store.subscribe(() => {
      const { navigationReducer } = store.getState();
      const { showMiniCart } = navigationReducer;
      this.setState((prevState) => ({
        ...prevState,
        showMiniCart,
      }));
    });
  }

  componentDidUpdate = () => {
    const { navigationReducer } = store.getState();
    const { showMiniCart } = navigationReducer;
    if (this.state.showMiniCart !== showMiniCart) {
      this.setState((prevState) => ({
        ...prevState,
        showMiniCart,
      }));
    }
  }

  render() {
    return (
    <BrowserRouter>
      <div>
        <Header />
        <div>
          <div className={`${this.state.showMiniCart === true && 'darken-main-content'}`} />
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
    )
  }
}

export default App;
