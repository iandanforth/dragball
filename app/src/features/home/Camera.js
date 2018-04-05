import React, { Component } from 'react';

export default class Camera extends Component {
  static propTypes = {

  };

  async componentDidMount() {
    const foo = this.setupCamera();
  }

  async setupCamera() {
    this.videoElement = document.getElementById('vid-box');

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log('media device true');
      const stream = await navigator.mediaDevices.getUserMedia({
        'audio': false,
        'video': {facingMode: 'environment'}
      });
      // window.stream = stream; // This line doesn't seem needed, why is it here?
      this.videoElement.srcObject = stream;
      return new Promise((resolve) => {
        this.videoElement.onloadedmetadata = () => {
          resolve([this.videoElement.videoWidth,
            this.videoElement.videoHeight]);
        };
      });
    }

    return null;
  }

  render() {
    return (
      <div className="home-camera">
        Component content: home/Camera
        <video id="vid-box" className="camera__element camera__element--js" autoPlay playsInline/>
      </div>
    );
  }
}
