import React from 'react';
import { shallow } from 'enzyme';
import { ErrorText } from './ErrorText';

describe('<ErrorText />', () => {

  describe('test ErrorText', () => {
    it('renders ErrorText, show={true}', () => {
      const wrapper = shallow(<ErrorText show={true} />);
      expect(wrapper.find({ 'data-testid': 'error-text-box' })).toBeDefined();
    });

    it('renders ErrorText, show={false}', () => {
      const wrapper = shallow(<ErrorText show={false} />);
      expect(wrapper.find({ 'data-testid': 'error-text-box' }).isEmptyRender()).toBe(true);
    });

  });
});
