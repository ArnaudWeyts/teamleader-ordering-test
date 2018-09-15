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
});

export const ordersType = {
  dispatch: func.isRequired,
  orders: shape({
    isFetching: bool.isRequired,
    allOrders: arrayOf(orderType.isRequired).isRequired
  }).isRequired
};
