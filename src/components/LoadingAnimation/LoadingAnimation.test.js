import React from 'react';
import { shallow } from 'enzyme';
import { LoadingAnimation } from './LoadingAnimation';

describe('<LoadingAnimation />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<LoadingAnimation />);
  });

  describe('render()', () => {
    it('renders the Box', () => {
      expect(wrapper.find({ 'data-testid': 'app-box' })).toHaveLength(1);
    });
  });
});
