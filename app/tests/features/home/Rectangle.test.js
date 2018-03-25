import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Rectangle } from 'src/features/home';

describe('home/Rectangle', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <Rectangle />
    );

    expect(
      renderedComponent.find('.home-rectangle').getElement()
    ).to.exist;
  });
});
