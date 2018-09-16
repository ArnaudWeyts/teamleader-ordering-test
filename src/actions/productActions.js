import types from './types';
import Api from '../api';

const api = new Api();

export function fetchProducts() {
  return dispatch => {
    dispatch({ type: types.FETCH_PRODUCTS_REQUEST });

    api
      .getProducts()
      .then(products =>
        dispatch({
          type: types.FETCH_PRODUCTS_FULFILLED,
          payload: { products }
        })
      )
      .catch(error => dispatch({ type: types.FETCH_PRODUCTS_REJECTED, error }));
  };
}
