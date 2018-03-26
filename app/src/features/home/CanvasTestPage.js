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
      bX: 0,
      go: true
    };
    this.updateAnim = this.updateAnim.bind(this);
    this.getRects = this.getRects.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    window.requestAnimationFrame(this.updateAnim);
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

  handleClick() {
    const { go } = this.state;
    this.setState({
      go: !go
    });
  }

  updateAnim() {
    const { go } = this.state;
    if (go) {
      this.setState({
        bX: 400 + (Math.sin(Date.now() / 1000) * 100)
      });
    }
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
          <Bunny
            // Shows hand cursor
            buttonMode
            // Opt-in to interactivity
            interactive
            // Pointers normalize touch and mouse
            pointerdown={this.handleClick}
            x={bX}
            y={200}
          />
        </Stage>
      </div>
    );
  }
}
