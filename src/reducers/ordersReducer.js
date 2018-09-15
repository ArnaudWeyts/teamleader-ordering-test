import types from '../actions/types';

const INITIAL_STATE = {
  isFetching: true,
  allOrders: [],
  selectedOrder: null,
  selectedOrderProducts: [],
  error: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_ORDERS_REQUEST:
      return { ...state, isFetching: true };
    case types.FETCH_ORDERS_FULFILLED:
      return { ...state, isFetching: false, allOrders: action.payload };
    case types.FETCH_ORDERS_REJECTED:
      return { ...state, isFetching: false, error: action.error };
    case types.SELECT_ORDER:
      return { ...state, selectedOrder: action.payload };
    case types.FETCH_PRODUCTSORDER_REQUEST:
      return { ...state, isFetching: true };
    case types.FETCH_PRODUCTSORDER_FULLFILLED:
      return {
        ...state,
        isFetching: false,
        selectedOrderProducts: action.payload
      };
    case types.FETCH_PRODUCTSORDER_REJECTED:
      return { ...state, isFetching: false, error: action.error };
    default:
      return state;
  }
}
