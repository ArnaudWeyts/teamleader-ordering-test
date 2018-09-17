import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Products from '../Products';

const mockStore = configureStore([thunk]);

it('renders without crashing', () => {
  const store = mockStore({ products: { data: [] } });
  shallow(<Products store={store} />);
});

it('renders the products loading', () => {
  const store = mockStore({
    products: { data: [] }
  });

  const component = renderer.create(<Products store={store} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders the products', () => {
  const store = mockStore({
    products: {
      data: [
        {
          id: 'A101',
          description: 'Screwdriver',
          category: '1',
          price: 9.75
        },
        {
          id: 'A102',
          description: 'Electric screwdriver',
          category: '1',
          price: 49.5
        }
      ]
    }
  });

  const component = renderer.create(<Products store={store} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
