import React from 'react';
import { shallow } from 'enzyme';
import { LoadMoreTable } from './LoadMoreTable';
import { mount } from 'enzyme';
import { usersDiff } from '../../lib/api/data';
import renderer from 'react-test-renderer';

describe('<LoadMoreTable />', () => {

  describe('render users', () => {
    it('initial state', () => {
      const wrapper = shallow(
        <LoadMoreTable
          data={[]}
          error={null}
          isLoading={false}
          order={'desc'}
          orderBy='timestamp'
          handleOrderChanged={() => { }}
          onLoadClicked={() => { }}
        />
      );

      expect(wrapper.find({ 'data-testid': 'users-table' })).toBeDefined();
      expect(wrapper.find({ 'data-testid': 'users-error-text' }).props().show).toBe(false);
      expect(wrapper.find({ 'data-testid': 'users-loading-anim' }).props().show).toBe(false);
      expect(wrapper.find({ 'data-testid': 'users-load-btn' }).props().show).toBe(true);
    });

    it('loading state', () => {
      const wrapper = shallow(
        <LoadMoreTable
          data={[]}
          error={null}
          isLoading={true}
          order={'desc'}
          orderBy='timestamp'
          handleOrderChanged={() => { }}
          onLoadClicked={() => { }}
        />
      );

      expect(wrapper.find({ 'data-testid': 'users-table' })).toBeDefined();
      expect(wrapper.find({ 'data-testid': 'users-error-text' }).props().show).toBe(false);
      expect(wrapper.find({ 'data-testid': 'users-loading-anim' }).props().show).toBe(true);
      expect(wrapper.find({ 'data-testid': 'users-load-btn' }).props().show).toBe(false);
    });

    it('users successfuly loaded state', () => {
      const wrapper = shallow(
        <LoadMoreTable
          data={usersDiff.slice(0, 3)}
          error={null}
          isLoading={false}
          order={'desc'}
          orderBy='timestamp'
          handleOrderChanged={() => { }}
          onLoadClicked={() => { }}
        />
      );

      expect(wrapper.find({ 'data-testid': 'users-table' })).toBeDefined();
      expect(wrapper.find({ 'data-testid': 'users-error-text' }).props().show).toBe(false);
      expect(wrapper.find({ 'data-testid': 'users-loading-anim' }).props().show).toBe(false);
      expect(wrapper.find({ 'data-testid': 'users-load-btn' }).props().show).toBe(true);
      expect(wrapper.find({ 'data-testid': 'users-table-row' })).toHaveLength(3);

    });

    it('test desc sort state', () => {
      const data = usersDiff.slice(0, 3)
      const wrapper = shallow(
        <LoadMoreTable
          data={data}
          error={null}
          isLoading={false}
          order={'desc'}
          orderBy='timestamp'
          handleOrderChanged={() => { }}
          onLoadClicked={() => { }}
        />
      );

      // console.log(wrapper.debug());

      const rows = wrapper.find({ 'data-testid': 'users-table-row' });
      expect(rows).toHaveLength(3);
      expect(rows.first().find({ 'data-testid': 'users-table-row-date' }).text()).toBe('2020-02-15');
      expect(rows.last().find({ 'data-testid': 'users-table-row-date' }).text()).toBe('2020-02-14');

    });

    it('test asc sort state', () => {
      const data = usersDiff.slice(0, 3)
      const wrapper = shallow(
        <LoadMoreTable
          data={data}
          error={null}
          isLoading={false}
          order={'asc'}
          orderBy='timestamp'
          handleOrderChanged={() => { }}
          onLoadClicked={() => { }}
        />
      );

      // console.log(wrapper.debug());

      const rows = wrapper.find({ 'data-testid': 'users-table-row' });
      expect(rows).toHaveLength(3);
      expect(rows.first().find({ 'data-testid': 'users-table-row-date' }).text()).toBe('2020-02-14');
      expect(rows.last().find({ 'data-testid': 'users-table-row-date' }).text()).toBe('2020-02-15');

    });

    it('test load failed state', () => {
      const wrapper = shallow(
        <LoadMoreTable
          data={usersDiff.slice(0, 3)}
          error={{
            code: 500,
            error: 'Uknown error',
          }}
          isLoading={false}
          order={'desc'}
          orderBy='timestamp'
          handleOrderChanged={() => { }}
          onLoadClicked={() => { }}
        />
      );

      expect(wrapper.find({ 'data-testid': 'users-table' })).toBeDefined();
      expect(wrapper.find({ 'data-testid': 'users-error-text' }).props().show).toBe(true);
      expect(wrapper.find({ 'data-testid': 'users-loading-anim' }).props().show).toBe(false);
      expect(wrapper.find({ 'data-testid': 'users-load-btn' }).props().show).toBe(true);
      expect(wrapper.find({ 'data-testid': 'users-load-btn' }).props().hasError).toBe(true);
      expect(wrapper.find({ 'data-testid': 'users-table-row' })).toHaveLength(3);
    });

    it('check handleOrderChanged()', () => {
      const mockHandleOrderChanged = jest.fn();

      const wrapper = shallow(
        <LoadMoreTable
          data={[]}
          error={null}
          isLoading={false}
          order={'desc'}
          orderBy='timestamp'
          handleOrderChanged={mockHandleOrderChanged}
          onLoadClicked={() => { }}
        />
      );

      expect(wrapper.find({ 'data-testid': 'users-table' })).toBeDefined();
      expect(wrapper.find({ 'data-testid': 'users-sort' })).toBeDefined();
      wrapper.find({ 'data-testid': 'users-sort' }).simulate('click');
      expect(mockHandleOrderChanged).toHaveBeenCalledTimes(1);
    });

    it('check onLoadClicked()', () => {
      const mockOnLoadClicked = jest.fn();

      const wrapper = mount(
        <LoadMoreTable
          data={[]}
          error={null}
          isLoading={false}
          order={'desc'}
          orderBy='timestamp'
          handleOrderChanged={() => { }}
          onLoadClicked={mockOnLoadClicked}
        />
      );
      // console.log(wrapper.debug());

      expect(wrapper.find({ 'data-testid': 'users-table' })).toBeDefined();
      expect(wrapper.find({ 'data-testid': 'users-load-btn' })).toBeDefined();
      wrapper.find({ 'data-testid': 'users-load-btn' }).find('button').simulate('click');
      expect(mockOnLoadClicked).toHaveBeenCalledTimes(1);
    });

  });

  describe('snapshot test', () => {

    it('desc order', () => {
      const tree = renderer
        .create(
          <LoadMoreTable
            data={usersDiff.slice(0, 10)}
            error={null}
            isLoading={false}
            order={'desc'}
            orderBy='timestamp'
            handleOrderChanged={() => { }}
            onLoadClicked={() => { }}
          />
        ).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('asc order', () => {
      const tree = renderer
        .create(
          <LoadMoreTable
            data={usersDiff.slice(0, 10)}
            error={null}
            isLoading={false}
            order={'asc'}
            orderBy='timestamp'
            handleOrderChanged={() => { }}
            onLoadClicked={() => { }}
          />
        ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  })

});
