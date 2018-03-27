import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { BasicCloud } from 'src/features/home';

describe('home/BasicCloud', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <BasicCloud />
    );

    expect(
      renderedComponent.find('.home-basic-cloud').getElement()
    ).to.exist;
  });
});
