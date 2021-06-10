import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import useUsersLoadMore from './useUsersLoadMore';
import api from '../lib/api';
import { usersDiff } from '../lib/api/data';

const TestComponent = (loadCount) => {
  const [users, error, loading] = useUsersLoadMore(loadCount);
  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    return <div>error</div>;
  }

  return <div>{users.length}</div>;
}

describe('test hook, useUsersLoadMore()', () => {

  let container = null;
  const mockGetUsersDiff = jest.spyOn(api, 'getUsersDiff');

  beforeEach(() => {
    // set up a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
    mockGetUsersDiff.mockReset();
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("useStaleRefresh hook runs correctly", async () => {
    mockGetUsersDiff.mockReturnValueOnce({
      code: 200,
      data: usersDiff.slice(0, 3),
      limit: 3,
      offset: 0,
      total: usersDiff.length,
    });

    act(() => {
      render(<TestComponent loadCount={0} />, container);
    });
    expect(container.textContent).toBe("loading");
    await act(async () => {
      await new Promise((r) => setTimeout(r, 100));
    });
    expect(mockGetUsersDiff).toHaveBeenCalledTimes(1);
    expect(container.textContent).toBe("3");

    mockGetUsersDiff.mockRejectedValueOnce({
      code: 500,
      error: 'Uknown error',
    });
    act(() => {
      render(<TestComponent loadCount={1} />, container);
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 100));
    });
    expect(mockGetUsersDiff).toHaveBeenCalledTimes(2);
    expect(container.textContent).toBe("error");

    mockGetUsersDiff.mockReturnValueOnce({
      code: 200,
      data: usersDiff.slice(3, 6),
      limit: 3,
      offset: 1,
      total: usersDiff.length,
    });

    act(() => {
      render(<TestComponent loadCount={2} />, container);
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 100));
    });
    expect(mockGetUsersDiff).toHaveBeenCalledTimes(3);
    expect(container.textContent).toBe("6");

  })
})

