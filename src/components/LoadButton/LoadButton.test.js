import React from 'react';
import { shallow } from 'enzyme';
import { LoadButton } from './LoadButton';

describe('<LoadButton />', () => {

  describe('render()', () => {

    it('renders LoadButton, show={true}', () => {
      const wrapper = shallow(
        <LoadButton
          show={true}
          hasError={true}
        />
      );
      expect(wrapper.find({ 'data-testid': 'load-btn-box' })).toBeDefined();
    });

    it('renders LoadButton, show={false}', () => {
      const wrapper = shallow(
        <LoadButton
          show={false}
          hasError={true}
        />
      );
      expect(wrapper.find({ 'data-testid': 'load-btn-box' })).toBeDefined();
    });

    it('renders LoadButton, hasError={true}', () => {
      const wrapper = shallow(
        <LoadButton
          show={true}
          hasError={true}
        />
      );
      expect(wrapper.find({ 'data-testid': 'load-btn-box' })).toBeDefined();
      expect(wrapper.find({ 'data-testid': 'load-btn' })).toBeDefined();
      expect(wrapper.find({ 'data-testid': 'load-btn' })
        .text()).toEqual('Retry');
    });

    it('renders LoadButton, hasError={false}', () => {
      const wrapper = shallow(
        <LoadButton
          show={true}
          hasError={false}
        />
      );

      expect(wrapper.find({ 'data-testid': 'load-btn-box' })).toBeDefined();
      expect(wrapper.find({ 'data-testid': 'load-btn' })).toBeDefined();
      expect(wrapper.find({ 'data-testid': 'load-btn' })
        .text()).toEqual('Load more');
    });

    it('check onClicked() callback', () => {

      const mockOnClicked = jest.fn();

      const wrapper = shallow(
        <LoadButton
          show={true}
          hasError={false}
          onClicked={mockOnClicked}
        />
      );

      wrapper.find({ 'data-testid': 'load-btn' }).simulate('click')
      expect(mockOnClicked).toHaveBeenCalledTimes(1);
    });

  });


});
