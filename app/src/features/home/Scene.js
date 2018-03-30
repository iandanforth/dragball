import React, { Component } from 'react';
import { Stage } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import BasicCloud from './BasicCloud';
import Curve from './Curve';

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
      wingTipY: 200,
      shoulderY: 150,
      wingTipXOffset: 0
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
    let { wingTipY, shoulderY, wingTipXOffset, flapDirection } = this.state;
    wingTipY += 8 * flapDirection;
    shoulderY += 3 * -flapDirection;

    if (wingTipY > 220 || wingTipY < 100) { flapDirection *= -1; };

    this.setState({
      cloudData: this.updateCloudData(),
      wingTipY,
      flapDirection,
      shoulderY
    });

    window.requestAnimationFrame(this.update);
  }

  render() {
    const sceneOptions = {
      backgroundColor: 0x00BDE6,
      antialias: true,
      forceFXAA: true
    };

    const { wingTipY, shoulderY } = this.state;
    return (
      <div className="home-scene">
        <div className="scene-container">
          <Stage width={800} height={600} options={sceneOptions}>
            { this.getClouds() }
            <Curve
              fromX={200}
              fromY={190}
              cpX={180}
              cpY={shoulderY}
              toX={100}
              toY={wingTipY}
            />
            <Curve
              fromX={200}
              fromY={190}
              cpX={220}
              cpY={shoulderY}
              toX={300}
              toY={wingTipY}
            />
          </Stage>
        </div>
      </div>
    );
  }
}
