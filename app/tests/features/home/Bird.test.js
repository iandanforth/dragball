import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Bird } from 'src/features/home';

describe('home/Bird', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <Bird />
    );

    expect(
      renderedComponent.find('.home-bird').getElement()
    ).to.exist;
  });
});
