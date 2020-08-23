jest.mock('../../components/Theme');

import React from 'react';
import renderer from 'react-test-renderer';
import NotFound from '../404.page';

describe("<404 />", () => {

  it("renders correctly", () => {
    const tree = renderer.create(
      <NotFound/>
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
  
});