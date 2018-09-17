import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import Order from '../Order';

describe('Order tests', () => {
  const order = { id: '1' };
  it('renders without crashing', () => {
    shallow(<Order order={order} />);
  });

  it('renders order', () => {
    const component = renderer.create(
      <MemoryRouter initialEntries={['/', '/orders']}>
        <Order order={order} />
      </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
