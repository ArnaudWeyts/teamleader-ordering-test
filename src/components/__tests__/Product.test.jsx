import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Product from '../Product';

it('renders without crashing', () => {
  shallow(<Product />);
});

it('renders a product as loading', () => {
  const component = renderer.create(<Product />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders a product', () => {
  const product = {
    id: 'A101',
    description: 'Screwdriver',
    category: '1',
    price: 9.75
  };

  const component = renderer.create(<Product product={product} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
