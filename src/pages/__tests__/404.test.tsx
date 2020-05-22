import React from 'react';
import renderer from 'react-test-renderer';
import NotFound from '../404';


describe("<404 />", () => {

  it("renders correctly", () => {
    const tree = renderer.create(
      <NotFound/>
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
  
});