import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import NoMatch from '../NoMatch';

describe('NoMatch tests', () => {
  it('renders without crashing', () => {
    shallow(<NoMatch />);
  });

  it('renders NoMatch', () => {
    const component = renderer.create(
      <MemoryRouter initialEntries={['/', '/random']}>
        <NoMatch />
      </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
