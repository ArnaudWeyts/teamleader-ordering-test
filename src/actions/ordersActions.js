import types from './types';
import Api from '../api';

const apiHandler = new Api();

export function fetchOrders() {
  return dispatch => {
    dispatch({ type: types.FETCH_ORDERS_REQUEST });

    apiHandler
      .getOrders()
      .then(response =>
        dispatch({ type: types.FETCH_ORDERS_FULFILLED, payload: response })
      )
      .catch(error => {
        dispatch({ type: types.FETCH_ORDERS_REJECTED, error });
      });
  };
}

export function removeProductFromOrder() {}
