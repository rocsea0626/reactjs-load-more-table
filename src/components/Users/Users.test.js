import React from 'react';
import { shallow } from 'enzyme';
import { Users } from './Users';

describe('<Users />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Users />);
  });

  describe('render()', () => {
    it('renders the Box', () => {
      expect(wrapper.find({ 'data-testid': 'app-box' })).toHaveLength(1);
    });
  });
});
