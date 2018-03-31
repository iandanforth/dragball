import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Curve from './Curve';

export default class Bird extends Component {
  static propTypes = {
    centerX: PropTypes.number.isRequired,
    centerY: PropTypes.number.isRequired,
    shoulderYOffset: PropTypes.number.isRequired,
    wingTipYOffset: PropTypes.number.isRequired
  };

  render() {
    const { centerX, centerY, shoulderYOffset, wingTipYOffset } = this.props;

    const lShoulderX = centerX - 20;
    const rShoulderX = centerX + 20;
    const shoulderY = (centerY - 40) - shoulderYOffset;
    const lWingTipX = centerX - 100;
    const rWingTipX = centerX + 100;
    const wingTipY = centerY - wingTipYOffset;

    return [
      (<Curve
        fromX={centerX}
        fromY={centerY}
        cpX={lShoulderX}
        cpY={shoulderY}
        toX={lWingTipX}
        toY={wingTipY}
      />),
      (<Curve
        fromX={centerX}
        fromY={centerY}
        cpX={rShoulderX}
        cpY={shoulderY}
        toX={rWingTipX}
        toY={wingTipY}
      />)
    ];
  }
}
