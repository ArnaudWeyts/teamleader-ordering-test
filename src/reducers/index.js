import { combineReducers } from 'redux';
import orders from './ordersReducer';
import products from './productsReducer';

const rootReducer = combineReducers({
  orders,
  products
});

export default rootReducer;
