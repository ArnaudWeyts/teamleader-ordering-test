import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import { fetchOrders, fetchProductsForOrder } from '../ordersActions';
import types from '../types';

const mockStore = configureMockStore([thunk]);

describe('async orders actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('creates FETCH_ORDERS_FULFULLED when fetching orders has been done', () => {
    // fetch not used in this project yet, but this is where it should be mocked
    fetchMock.getOnce('/orders', {
      orders: [],
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      { type: types.FETCH_ORDERS_REQUEST },
      {
        type: types.FETCH_ORDERS_FULFILLED,
        payload: {
          orders: [
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
            },
            {
              id: '3',
              'customer-id': '3',
              items: [
                {
                  'product-id': 'A101',
                  quantity: '2',
                  'unit-price': 9.75,
                  total: 19.5
                },
                {
                  'product-id': 'A102',
                  quantity: 1,
                  'unit-price': 49.5,
                  total: 49.5
                }
              ],
              total: 69.0
            }
          ]
        }
      }
    ];

    const store = mockStore({ orders: { allOrders: [] } });

    return store.dispatch(fetchOrders()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_PRODUCTSORDER_FULFULLED when fetching orders has been done', () => {
    fetchMock.getOnce('/productsorder', {
      orderWithProducts: [],
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      { type: types.FETCH_PRODUCTSORDER_REQUEST },
      {
        type: types.FETCH_PRODUCTSORDER_FULLFILLED,
        payload: {
          orderWithProducts: {
            id: '1',
            'customer-id': '1',
            items: [
              {
                'product-id': 'B102',
                quantity: 10,
                'unit-price': 4.99,
                total: 49.9,
                product: {
                  id: 'B102',
                  description: 'Press button',
                  category: '2',
                  price: 4.99
                }
              }
            ],
            total: 49.9
          }
        }
      }
    ];

    const store = mockStore({
      orders: {
        selectedOrder: {
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
        }
      }
    });

    return store.dispatch(fetchProductsForOrder('1')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
