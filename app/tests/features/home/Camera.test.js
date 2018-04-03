import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Camera } from 'src/features/home';

describe('home/Camera', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <Camera />
    );

    expect(
      renderedComponent.find('.home-camera').getElement()
    ).to.exist;
  });
});
