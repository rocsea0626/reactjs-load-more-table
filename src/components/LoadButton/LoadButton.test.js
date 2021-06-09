import React from 'react';
import { shallow } from 'enzyme';
import { LoadButton } from './LoadButton';

describe('<LoadButton />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<LoadButton />);
  });

  describe('render()', () => {
    it('renders the Box', () => {
      expect(wrapper.find({ 'data-testid': 'app-box' })).toHaveLength(1);
    });
  });
});
