import React, { Component } from 'react';
import PaperContainer, { Circle, Layer } from '@psychobolt/react-paperjs';

export default class CanvasTestPage extends Component {
  static propTypes = {

  };

  render() {
    const Shapes = () => <Circle center={[120, 50]} radius={35} fillColor="#00FF00" />;

    return (
      <div className="home-canvas-test-page">
        Component content: home/CanvasTestPage
        <PaperContainer {...this.props}>
          <Circle center={[80, 50]} radius={35} fillColor="red" />
          <Layer>
            <Shapes />
          </Layer>
        </PaperContainer>
      </div>
    );
  }
}
