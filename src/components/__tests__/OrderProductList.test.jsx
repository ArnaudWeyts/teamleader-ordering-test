import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import OrderProductList from '../OrderProductList';

describe('OrderProductList tests', () => {
  const items = [
    {
      'product-id': 'A101',
      quantity: '2',
      'unit-price': 9.75,
      total: 19.5,
      product: {
        id: 'A101',
        description: 'Screwdriver',
        category: '1',
        price: 9.75
      }
    },
    {
      'product-id': 'A102',
      quantity: 1,
      'unit-price': 49.5,
      total: 49.5,
      product: {
        id: 'A102',
        description: 'Electric screwdriver',
        category: '1',
        price: 49.5
      }
    }
  ];

  it('renders without crashing', () => {
    shallow(<OrderProductList items={items} />);
  });

  it('renders OrderProductList', () => {
    const component = renderer.create(<OrderProductList items={items} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
