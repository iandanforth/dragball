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

    const scaleFactor = 2**-depth;
    const offset = 60 * depth;
    let x = 100;
    let y = 100;
    if (side === 1) {
      x += offset;
    }
    if (side === -1) {
      y += offset;
    }
    const key = `${parentKey}, ${depth}, ${side}`;

    const polyTransform = this.translateString(x, y) + this.rotateString(0) + this.scaleString(scaleFactor);

    const newPoly = (
      <polygon
        points="0,0 0,100 100,0"
        style={polyStyles} 
        transform={polyTransform}
        key={key}
      />
    );
    polys.push(newPoly);

    polys = polys.concat(this.getFractalPoly((depth + 1), maxDepth, -1, key));
    polys = polys.concat(this.getFractalPoly((depth + 1), maxDepth, 1, key));

    return polys;
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
        <div 
          className="ball" 
          style={ballStyles} 
          onMouseDown={this.handleBallMouseDown}
          onMouseUp={this.handleBallMouseUp} >
          <svg height="210" width="500">
            {this.getFractalPoly(0, 3)}
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
