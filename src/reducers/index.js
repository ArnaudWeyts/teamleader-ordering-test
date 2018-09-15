import { combineReducers } from 'redux';
import orders from './ordersReducer';

const rootReducer = combineReducers({
  orders
});

export default rootReducer;
