import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';

import OrderDetail from '../OrderDetail';

const mockStore = configureStore([thunk]);

it('renders without crashing', () => {
  const store = mockStore({ orders: { selectedOrder: null } });
  shallow(<OrderDetail store={store} />);
});

it('renders the order detail page loading', () => {
  const store = mockStore({
    orders: {
      allOrders: [],
      selectedOrder: null
    }
  });

  const props = {
    match: {
      params: {
        id: '1'
      }
    }
  };

  const component = renderer.create(
    <MemoryRouter initialEntries={['/']}>
      <OrderDetail {...props} store={store} />
    </MemoryRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the order detail page', () => {
  const store = mockStore({
    orders: {
      allOrders: [
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
        }
      ],
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

  const props = {
    match: {
      params: {
        id: '1'
      }
    }
  };

  const component = renderer.create(
    <MemoryRouter initialEntries={['/']}>
      <OrderDetail {...props} store={store} />
    </MemoryRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
