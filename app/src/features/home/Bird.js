import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Curve from './Curve';

export default class Bird extends Component {
  static propTypes = {
    centerX: PropTypes.number.isRequired,
    centerY: PropTypes.number.isRequired,
    scale: PropTypes.number
  };

  static defaultProps = {
    scale: 1
  };

  getOffsets() {
    const { scale } = this.props;
    const flapPeriod = 1;
    const nowSeconds = Date.now() / 1000;
    const time = nowSeconds * ((1 / flapPeriod) * 2 * Math.PI);

    const offsets = {
      shoulderYOffset: (-Math.sin(time) * 10) * scale,
      wingTipYOffset: (Math.sin(time) * 40) * scale
    };

    return offsets;
  }


  render() {
    const { centerX, centerY, scale } = this.props;
    const { shoulderYOffset, wingTipYOffset } = this.getOffsets();

    const shoulderXDistance = 20 * scale;
    const shoulderYDstance = 40 * scale;
    const wingLength = 100 * scale;
    const lShoulderX = centerX - shoulderXDistance;
    const rShoulderX = centerX + shoulderXDistance;
    const shoulderY = (centerY - shoulderYDstance) - shoulderYOffset;
    const lWingTipX = centerX - wingLength;
    const rWingTipX = centerX + wingLength;
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
