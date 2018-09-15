import types from '../actions/types';

const INITIAL_STATE = {
  isFetching: true,
  data: [],
  error: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_ORDERS_REQUEST:
      return { ...state, isFetching: true };
    case types.FETCH_ORDERS_FULFILLED:
      return { ...state, isFetching: false, data: action.payload };
    case types.FETCH_ORDERS_REJECTED:
      return { ...state, isFetching: false, error: action.error };
    default:
      return state;
  }
}
