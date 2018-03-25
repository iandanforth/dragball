import React, { Component } from 'react';
import { Sprite, Stage } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import bunny from '../../../bunny.png';
import Rectangle from './Rectangle';


function Bunny(props) {
  return (
    <Sprite texture={PIXI.Texture.fromImage(bunny)} {...props} />
  );
}

export default class CanvasTestPage extends Component {
  static propTypes = {

  };

  constructor() {
    super();

    this.state = {
      bX: 0
    };
    this.updateAnim = this.updateAnim.bind(this);
    this.getRects = this.getRects.bind(this);
  }

  componentDidMount() {
    window.requestAnimationFrame(this.updateAnim);
  }

  translateString(x, y) {
    return ` translate(${x},${y}) `;
  }

  getRects() {
    const rects = [];
    const numRects = 100;
    for (let i = 0; i < numRects; i++) {
      const x = Math.floor(Math.random() * 300);
      const y = Math.floor(Math.random() * 300);
      const rect = (
        <Rectangle
          x={x}
          y={y}
          width={20}
          height={20}
          fill={0xFFFF00}
          id={`rect-${i}`}
        />
      );
      rects.push(rect);
    }
    return rects;
  }

  updateAnim() {
    this.setState({
      bX: 400 + (Math.sin(Date.now() / 1000) * 100)
    });
    window.requestAnimationFrame(this.updateAnim);
  }

  render() {
    const { bX } = this.state;
    return (
      <div className="home-canvas-test-page">
        <Stage width={800} height={600} options={{ backgroundColor: 0x10bb99 }}>
          { this.getRects() }
          <Rectangle
            x={250}
            y={200}
            width={bX}
            height={bX}
            fill={0xFFFF00}
          />
          <Bunny x={bX} y={200} />
        </Stage>
      </div>
    );
  }
}
