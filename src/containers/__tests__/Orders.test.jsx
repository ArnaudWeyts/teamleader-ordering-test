import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';

import Orders from '../Orders';

const mockStore = configureStore([thunk]);

it('renders without crashing', () => {
  const store = mockStore({ orders: { allOrders: [] } });
  shallow(<Orders store={store} />);
});

it('renders the orders loading', () => {
  const store = mockStore({
    orders: {
      allOrders: []
    }
  });

  const component = renderer.create(
    <MemoryRouter initialEntries={['/']}>
      <Orders store={store} />
    </MemoryRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the orders', () => {
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
      ]
    }
  });

  const component = renderer.create(
    <MemoryRouter initialEntries={['/']}>
      <Orders store={store} />
    </MemoryRouter>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
