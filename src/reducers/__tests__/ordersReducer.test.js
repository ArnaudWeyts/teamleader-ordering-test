import reducer from '../ordersReducer';
import types from '../../actions/types';

describe('orders reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isFetching: true,
      allOrders: [],
      selectedOrder: null,
      error: null
    });
  });

  it('should handle FETCH_ORDERS_FULFILLED:', () => {
    const orders = [
      {
        id: '1',
        'customer-id': '1',
        items: [
          {
            'product-id': 'B102',
            quantity: 10,
            'unit-price': 4.99,
            total: 49.9
          }
        ],
        total: 49.9
      },
      {
        id: '2',
        'customer-id': '2',
        items: [
          {
            'product-id': 'B102',
            quantity: 5,
            'unit-price': 4.99,
            total: 24.95
          }
        ],
        total: 24.95
      }
    ];

    expect(
      reducer([], {
        type: types.FETCH_ORDERS_FULFILLED,
        payload: {
          orders
        }
      })
    ).toEqual({
      isFetching: false,
      allOrders: orders
    });
  });
});
