import React, { Component } from 'react';
import { Sprite, Stage } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import bunny from '../../../bunny.png';


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
  }

  componentDidMount() {
    window.requestAnimationFrame(this.updateAnim);
  }

  translateString(x, y) {
    return ` translate(${x},${y}) `;
  }

  updateAnim() {
    this.setState({
      bX: 400 + (Math.sin(Date.now() / 1000) * 100)
    });
    window.requestAnimationFrame(this.updateAnim);
  }

  render() {
    const { bX } = this.state;
    const bunnyTransform = this.translateString(bX, 0);

    return (
      <div className="home-canvas-test-page">
        <Stage width={800} height={600} options={{ backgroundColor: 0x10bb99 }}>
          <Bunny x={bX} y={200} />
        </Stage>
      </div>
    );
  }
}
