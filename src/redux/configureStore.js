import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import cartReducer from './shopping_cart/reducers';
import currencyReducer from './currency_type/reducers';
import categoryReducer from './categorySelected/reducers';
import navigationReducer from './navigation/reducers';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cartReducer', 'navigationReducer', 'currencyReducer'],
};

const reducer = combineReducers({
  cartReducer,
  currencyReducer,
  categoryReducer,
  navigationReducer
});

const rootReducer = persistReducer(persistConfig, reducer);

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
export const persistor = persistStore(store);

export default store;
