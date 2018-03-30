import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Curve } from 'src/features/home';

describe('home/Curve', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <Curve />
    );

    expect(
      renderedComponent.find('.home-curve').getElement()
    ).to.exist;
  });
});
