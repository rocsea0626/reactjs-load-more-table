import React from 'react';
import { shallow } from 'enzyme';
import { LoadingAnimation } from './LoadingAnimation';

describe('<LoadingAnimation />', () => {

  describe('render()', () => {
    it('renders LoadingAnimation, show=true', () => {
      const wrapper = shallow(<LoadingAnimation show={true} />);
      expect(wrapper.find({ 'data-testid': 'loading-animation-box' })).toBeDefined();
    });

    it('renders LoadingAnimation, show=false', () => {
      const wrapper = shallow(<LoadingAnimation show={false} />);
      expect(wrapper.find({ 'data-testid': 'loading-animation-box' }).isEmptyRender()).toBe(true);
    });

  });
});
