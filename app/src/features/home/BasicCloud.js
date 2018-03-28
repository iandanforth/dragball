import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rectangle from './Rectangle';

export default class BasicCloud extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  };

  constructor() {
    super();

    const offsets = [];
    for (let i = 0; i <= 7; i++) {
      const offset = Math.floor(Math.random() * 4); // TODO: Generate offset array once and move this back to render
      offsets.push(offset);
    }

    this.state = {
      offsets
    };
  }

  render() {
    const rects = [];
    const { x, y } = this.props;

    // Cloud base
    const cloudWidth = 100;
    const baseRectSize = 20;
    const rectColor = 0xFFFFFF;
    for (let i = 0; i <= 7; i++) {
      const rectX = x + (i * baseRectSize);
      const rectY = y + this.state.offsets[i];
      const rect = (
        <Rectangle
          x={rectX}
          y={rectY}
          width={baseRectSize}
          height={baseRectSize}
          fill={rectColor}
          key={`cloud-rect-${i}`}
        />
      );
      rects.push(rect);
    }

    // Cloud fluff
    const cloudFluff = [
      [10, 5, 1.2],
      [30, 15, 1.0],
      [40, 18, 1.0],
      [60, 15, 1.0],
      [80, 15, 1.0],
      [100, 15, 1.0],
      [120, 15, 1.0],
      [130, 10, 1.0],
      [60, 30, 1.0],
      [80, 28, 1.0],
      [100, 35, 1.0],
      [110, 30, 1.0],
    ];

    for (let cloudData of cloudFluff) {
      const [ xOffset, yOffset, scale ] = cloudData;
      const rectX = x + xOffset;
      const rectY = y - yOffset;
      const rectSize = baseRectSize * scale;
      const rect = (
        <Rectangle
          x={rectX}
          y={rectY}
          width={rectSize}
          height={rectSize}
          fill={rectColor}
        />
      );
      rects.push(rect);
    }

    return rects;
  }
}
