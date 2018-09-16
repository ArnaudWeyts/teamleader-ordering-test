import types from '../actions/types';

const INITIAL_STATE = {
  isFetching: true,
  data: [],
  error: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.FETCH_PRODUCTS_REQUEST:
      return { ...state, isFetching: true };
    case types.FETCH_PRODUCTS_FULFILLED:
      return { ...state, isFetching: false, data: action.payload.products };
    case types.FETCH_PRODUCTS_REJECTED:
      return { ...state, isFetching: false, error: action.error };
    default:
      return state;
  }
}
