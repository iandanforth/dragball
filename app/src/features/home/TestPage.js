import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class TestPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor() {
    super();

    this.state = {
      mX: 0,
      mY: 0,
      dragging: false
    };

    this.updateMouseLoc = this.updateMouseLoc.bind(this);
    this.handleBallMouseDown = this.handleBallMouseDown.bind(this);
    this.handleBallMouseUp = this.handleBallMouseUp.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.getFractalPoly = this.getFractalPoly.bind(this);
  }

  componentDidMount() {
    this.mmHandler = window.addEventListener('mousemove', this.updateMouseLoc);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.mmHandler);
  }

  getFractalPoly(depth = 0, maxDepth = 1, side = 0, parentKey = '') {
    let polys = [];
    if (depth === maxDepth) {
      return polys;
    }

    const polyStyles = {
      fill: 'lime',
      stroke: 'purple',
      strokeWidth: 1
    };

    // Translation
    let x = 100;
    let y = 100;
    if (side === 1) {
      x = 0;
    }
    if (side === -1) {
      y = 0;
    }

    // Scaling
    const scaleFactor = (side !== 0) ? 0.5 : 1;

    // Rotation

    // Mouse responsiveness
    const { mX, mY } = this.state;
    const angleRad = Math.atan(mY / mX);
    const angleDeg = (angleRad / Math.PI) * 180;
    const mouseImpact = 3;

    let deflection = 0;
    if (side === 1) {
      deflection = 10;
      deflection += angleDeg / mouseImpact;
    }
    if (side === -1) {
      deflection = -10;
      deflection -= angleDeg / mouseImpact;
    }



    const polyTransform = this.translateString(x, y) + this.rotateString(deflection) + this.scaleString(scaleFactor);

    const key = `${parentKey}, ${depth}, ${side}`;

    const left = this.getFractalPoly((depth + 1), maxDepth, -1, key);
    const right = this.getFractalPoly((depth + 1), maxDepth, 1, key);

    const newPoly = (
      <g transform={polyTransform}>
        <polygon
          points="0,0 0,100 100,0"
          style={polyStyles}
          key={key}
        />
        {left}
        {right}
      </g>
    );

    return newPoly;
  }

  updateMouseLoc(e) {
    if (this.state.dragging === true) {
      this.setState({
        mX: e.clientX,
        mY: e.clientY
      });
    }
  }

  handleBallMouseDown() {
    this.setState({
      dragging: true
    });
  }

  handleBallMouseUp() {
    this.setState({
      dragging: false
    });
  }

  handleMouseOut() {
    this.setState({
      dragging: false
    });
  }

  rotateString(deg) {
    return ` rotate(${deg}) `;
  }

  translateString(x, y) {
    return ` translate(${x},${y}) `;
  }

  scaleString(x) {
    return ` scale(${x}) `;
  }

  render() {
    const ballRadius = 100;

    const ballStyles = {
      top: this.state.mY - ballRadius,
      left: this.state.mX - ballRadius
    };

    const polyStyles = {
      fill: 'lime',
      stroke: 'purple',
      'stroke-width': 1
    };

    const polyTransform = this.translateString(ballRadius, ballRadius) + this.rotateString(0);

    return (
      <div className="home-test-page">
        <div className="ball-fractal-container">
          <div 
            className="ball" 
            style={ballStyles} 
            onMouseDown={this.handleBallMouseDown}
            onMouseUp={this.handleBallMouseUp} >
          </div>
          <svg height="500px">
            {this.getFractalPoly(0, 7)}
          </svg>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestPage);
