import React, { Component } from 'react';
import { Stage } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import BasicCloud from './BasicCloud';
import Curve from './Curve';
import Bird from './Bird';

export default class Scene extends Component {
  static propTypes = {

  };

  constructor() {
    super();

    this.state = {
      cloudData: [
        [100, 100],
        [350, 120],
        [700, 250]
      ],
      flapDirection: 1,
      wingTipYOffset: 100,
      shoulderYOffset: 20,
    };

    this.getClouds = this.getClouds.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    window.requestAnimationFrame(this.update);
  }

  getClouds() {
    const { cloudData } = this.state;
    const clouds = [];
    for (const data of cloudData ) {
      const [x, y] = data;
      const cloud = (
        <BasicCloud x={x} y={y} />
      );
      clouds.push(cloud);
    }

    return clouds;
  }

  updateCloudData() {
    const { cloudData } = this.state;
    const driftSpeed = 1;

    for (let i = 0; i < cloudData.length; i++) {
      let [x, y] = cloudData[i];
      x += driftSpeed;
      if (x > 800) {
        x = -200;
      }
      cloudData[i] = [x, y];
    }

    return cloudData;
  }

  update() {
    let { wingTipYOffset, shoulderYOffset, flapDirection } = this.state;
    wingTipYOffset += 8 * flapDirection;
    shoulderYOffset += 3 * -flapDirection;

    if (wingTipYOffset > 220 || wingTipYOffset < 100) { flapDirection *= -1; };

    this.setState({
      cloudData: this.updateCloudData(),
      wingTipYOffset,
      flapDirection,
      shoulderYOffset
    });

    window.requestAnimationFrame(this.update);
  }

  render() {
    const sceneOptions = {
      backgroundColor: 0x00BDE6,
      antialias: true,
      forceFXAA: true
    };

    const { wingTipYOffset, shoulderYOffset } = this.state;
    return (
      <div className="home-scene">
        <div className="scene-container">
          <Stage width={800} height={600} options={sceneOptions}>
            { this.getClouds() }
            <Bird
              centerX={200}
              centerY={190}
              shoulderYOffset={shoulderYOffset}
              wingTipYOffset={wingTipYOffset}
            />
            <Bird
              centerX={400}
              centerY={300}
              shoulderYOffset={shoulderYOffset}
              wingTipYOffset={wingTipYOffset}
            />
          </Stage>
        </div>
      </div>
    );
  }
}
