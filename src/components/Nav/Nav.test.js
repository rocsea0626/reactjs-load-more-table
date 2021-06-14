import React from 'react';
import { shallow } from 'enzyme';
import { Nav } from './Nav';

describe('<Nav />', () => {

  describe('test valid paths', () => {

    it('path={/}', () => {
      const path = '/';

      const wrapper = shallow(<Nav path={path} />);
      expect(wrapper.find({ 'data-testid': 'nav-box' })).toBeDefined();
    });

    it('path={/users}', () => {
      const path = '/users';

      const wrapper = shallow(<Nav path={path} />);
      expect(wrapper.find({ 'data-testid': 'nav-box' })).toBeDefined();
    });

    it('path={/projects}', () => {
      const path = '/projects';

      const wrapper = shallow(<Nav path={path} />);
      expect(wrapper.find({ 'data-testid': 'nav-box' })).toBeDefined();
    });

  });

  describe('test invalid paths', () => {
    it('path={/afdf}', () => {
      const path = '/afdf';

      const wrapper = shallow(<Nav path={path} />);
      expect(wrapper.find({ 'data-testid': 'nav-box' }).isEmptyRender()).toBe(true);
    });

  });
});
