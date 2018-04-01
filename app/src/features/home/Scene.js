import React, { Component } from 'react';
import { Stage } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import BasicCloud from './BasicCloud';
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
      ]
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
    this.setState({
      cloudData: this.updateCloudData()
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
              scale={1.1}
            />
            <Bird
              centerX={400}
              centerY={300}
              scale={0.9}
            />
          </Stage>
        </div>
      </div>
    );
  }
}
