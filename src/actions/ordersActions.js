import types from './types';
import Api from '../api';
import { calculateTotal } from '../helpers';

const api = new Api();

export function fetchOrders() {
  return dispatch => {
    dispatch({ type: types.FETCH_ORDERS_REQUEST });

    return api
      .getOrders()
      .then(orders =>
        dispatch({ type: types.FETCH_ORDERS_FULFILLED, payload: { orders } })
      )
      .catch(error => dispatch({ type: types.FETCH_ORDERS_REJECTED, error }));
  };
}

export function fetchProductsForOrder(id) {
  return (dispatch, getState) => {
    dispatch({ type: types.FETCH_PRODUCTSORDER_REQUEST });

    return api
      .getProductsForOrder(id)
      .then(products => {
        // add products to the order
        const order = getState().orders.selectedOrder;
        const orderWithProducts = {
          ...order,
          items: order.items.map(item => ({
            ...item,
            product: products.find(product => product.id === item['product-id'])
          }))
        };
        return dispatch({
          type: types.FETCH_PRODUCTSORDER_FULLFILLED,
          payload: { orderWithProducts }
        });
      })
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

    await dispatch({ type: types.SELECT_ORDER, payload: { order } });

    return dispatch(fetchProductsForOrder(order.id));
  };
}

export function removeProductFromOrder(id, quantity) {
  return (dispatch, getState) => {
    const order = getState().orders.selectedOrder;

    const itemToUpdate = order.items.find(x => x['product-id'] === id);
    itemToUpdate.quantity -= quantity;
    itemToUpdate.total = +(
      itemToUpdate.total -
      itemToUpdate['unit-price'] * quantity
    ).toFixed(2);

    let updatedItems;

    // remove the product from the order
    if (itemToUpdate.quantity < 1) {
      updatedItems = order.items.filter(item => item['product-id'] !== id);
    } else {
      updatedItems = order.items.map(
        item => (item['product-id'] === id ? itemToUpdate : item)
      );
    }

    const updatedOrder = {
      ...order,
      total: calculateTotal(updatedItems),
      items: updatedItems
    };

    dispatch({ type: types.REMOVE_PRODUCT_ORDER, payload: { updatedOrder } });
  };
}

export function addProductToOrder(id, quantity) {
  return (dispatch, getState) => {
    const order = getState().orders.selectedOrder;
    const product = getState().products.data.find(x => x.id === id);

    const existingItem = order.items.find(x => x['product-id'] === product.id);

    let newItem;
    if (existingItem) {
      newItem = {
        ...existingItem,
        quantity: existingItem.quantity + quantity,
        total: existingItem.total + product.price * quantity
      };
    } else {
      newItem = {
        'product-id': product.id,
        quantity,
        'unit-price': product.price,
        total: product.price * quantity,
        product
      };
    }

    const total = +(order.total + product.price * quantity).toFixed(2);

    const updatedOrder = {
      ...order,
      total,
      items: [...order.items.filter(item => item['product-id'] !== id), newItem]
    };

    dispatch({ type: types.ADD_PRODUCT_ORDER, payload: { updatedOrder } });
  };
}

export function placeOrder() {
  return async (dispatch, getState) => {
    dispatch({ type: types.PLACE_ORDER_REQUEST });

    const order = getState().orders.selectedOrder;

    api.getCustomers().then(customers => {
      const customer = customers.find(x => x.id === order['customer-id']);

      if (customer.revenue >= order.total && order.total > 0) {
        dispatch({ type: types.PLACE_ORDER_FULFILLED });
        console.debug('Order sucessfully placed', order);
      } else {
        dispatch({
          type: types.PLACE_ORDER_REJECTED,
          error: 'Transaction rejected'
        });
        console.debug('Transaction rejected');
      }
    });
  };
}
