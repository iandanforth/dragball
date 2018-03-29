import React, { Component } from 'react';
import { Stage } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import BasicCloud from './BasicCloud';

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
    const driftSpeed = 0.03;

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
      backgroundColor: 0x00BDE6
    };

    return (
      <div className="home-scene">
        <div className="scene-container">
          <Stage width={800} height={600} options={sceneOptions}>
            { this.getClouds() }
          </Stage>
        </div>
      </div>
    );
  }
}
