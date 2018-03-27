import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Scene } from 'src/features/home';

describe('home/Scene', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <Scene />
    );

    expect(
      renderedComponent.find('.home-scene').getElement()
    ).to.exist;
  });
});
