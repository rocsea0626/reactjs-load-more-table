import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import useUsersLoadMore from './useUsersLoadMore';
import { jssPreset } from '@material-ui/core';

jest.setTimeout(10000);

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

  beforeEach(() => {
    // set up a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("useStaleRefresh hook runs correctly", async () => {
    act(() => {
      render(<TestComponent loadCount={0} />, container);
    });
    expect(container.textContent).toBe("loading");
    await act(async () => {
      await new Promise((r) => setTimeout(r, 2000));
    });
    expect(container.textContent).toBe("3");

    act(() => {
      render(<TestComponent loadCount={1} />, container);
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 2000));
    });
    expect(container.textContent).toBe("error");

    act(() => {
      render(<TestComponent loadCount={2} />, container);
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 2000));
    });
    expect(container.textContent).toBe("6");

  })
})

