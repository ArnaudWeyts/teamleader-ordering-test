import types from '../actions/types';

const INITIAL_STATE = {
  isFetching: true,
  allOrders: [],
  selectedOrder: null,
  error: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_ORDERS_REQUEST:
      return { ...state, isFetching: true };
    case types.FETCH_ORDERS_FULFILLED:
      return { ...state, isFetching: false, allOrders: action.payload.orders };
    case types.FETCH_ORDERS_REJECTED:
      return { ...state, isFetching: false, error: action.error };
    case types.SELECT_ORDER:
      return { ...state, selectedOrder: action.payload.order };
    case types.FETCH_PRODUCTSORDER_REQUEST:
      return { ...state, isFetching: true };
    case types.FETCH_PRODUCTSORDER_FULLFILLED:
      return {
        ...state,
        isFetching: false,
        selectedOrder: action.payload.orderWithProducts
      };
    case types.FETCH_PRODUCTSORDER_REJECTED:
      return { ...state, isFetching: false, error: action.error };
    case types.REMOVE_PRODUCT_ORDER:
      return { ...state, selectedOrder: action.payload.updatedOrder };
    case types.ADD_PRODUCT_ORDER:
      return { ...state, selectedOrder: action.payload.updatedOrder };
    default:
      return state;
  }
}
