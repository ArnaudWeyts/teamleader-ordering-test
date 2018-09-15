import { shape, string, arrayOf, bool, func } from 'prop-types';

export const orderType = shape({
  id: string,
  'customer-id': string,
  items: arrayOf(
    shape({
      'product-id': string,
      quantity: string,
      'unit-price': string,
      total: string
    })
  ),
  total: string
}).isRequired;

export const ordersType = {
  dispatch: func,
  orders: shape({
    isFetching: bool,
    allOrders: arrayOf(orderType)
  })
};
