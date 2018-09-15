import types from './types';
import Api from '../api';

const apiHandler = new Api();

export function fetchOrders() {
  return dispatch => {
    dispatch({ type: types.FETCH_ORDERS_REQUEST });

    return apiHandler
      .getOrders()
      .then(response =>
        dispatch({ type: types.FETCH_ORDERS_FULFILLED, payload: response })
      )
      .catch(error => dispatch({ type: types.FETCH_ORDERS_REJECTED, error }));
  };
}

export function fetchProductsForOrder(id) {
  return dispatch => {
    dispatch({ type: types.FETCH_PRODUCTSORDER_REQUEST });

    return apiHandler
      .getProductsForOrder(id)
      .then(response =>
        dispatch({
          type: types.FETCH_PRODUCTSORDER_FULFILLED,
          payload: response
        })
      )
      .catch(error =>
        dispatch({ type: types.FETCH_PRODUCTSORDER_REJECTED, error })
      );
  };
}

export function selectOrder(id) {
  return async (dispatch, getState) => {
    if (getState().orders.allOrders.length < 1) {
      await dispatch(fetchOrders());
    }

    const order = getState().orders.allOrders.find(x => x.id === id);

    dispatch({ type: types.SELECT_ORDER, payload: order });

    return dispatch(fetchProductsForOrder(order.id));
  };
}

export function removeProductFromOrder() {}
