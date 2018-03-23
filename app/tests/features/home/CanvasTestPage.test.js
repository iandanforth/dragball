import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { CanvasTestPage } from 'src/features/home';

describe('home/CanvasTestPage', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <CanvasTestPage />
    );

    expect(
      renderedComponent.find('.home-canvas-test-page').getElement()
    ).to.exist;
  });
});
