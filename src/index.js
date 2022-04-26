import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ApolloProvider } from "@apollo/client";
import { PersistGate } from 'redux-persist/integration/react';
import client from './Apollo';
import store from './redux/configureStore';
import { persistor } from './redux/configureStore';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
