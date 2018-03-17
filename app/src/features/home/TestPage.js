import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

export class TestPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor() {
    super();

    // Make a graph
    const minLoc = 200;
    const maxLoc = 1000;
    const nodes = {};
    const nodeCount = 73;
    for (let i=1; i<=nodeCount; i++) {
      const newPoint = {
        x: getRndInteger(minLoc, maxLoc),
        y: getRndInteger(minLoc, maxLoc)
      };

      nodes[i] = newPoint;
    }

    const edges = [];
    const edgeCount = 50;
    for (let i=0; i<edgeCount; i++) {
      const edge = {
        startId: getRndInteger(1, nodeCount),
        endId: getRndInteger(1, nodeCount),
      };

      edges.push(edge);
    }

    this.state = {
      mX: 0,
      mY: 0,
      dragging: false,
      nodes: nodes,
      edges: edges,
      nodeDragging: false,
      activeNodeId: null
    };

    this.updateMouseLoc = this.updateMouseLoc.bind(this);
    this.handleBallMouseDown = this.handleBallMouseDown.bind(this);
    this.handleBallMouseUp = this.handleBallMouseUp.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.getFractalPoly = this.getFractalPoly.bind(this);
    this.getGraph = this.getGraph.bind(this);
    this.getNode = this.getNode.bind(this);
    this.handleNodeMouseDown = this.handleNodeMouseDown.bind(this);
    this.handleNodeMouseUp = this.handleNodeMouseUp.bind(this);
    this.updateNodeLoc = this.updateNodeLoc.bind(this);
  }

  componentDidMount() {
    this.mmHandler = window.addEventListener('mousemove', (e) => {
      this.updateMouseLoc(e);
      this.updateNodeLoc(e);
    });
    this.muHandler = window.addEventListener('mouseup', () => {
      this.handleNodeMouseUp();
      this.handleBallMouseUp();
    });
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.mmHandler);
    window.removeEventListener('mouseup', this.muHandler);
  }

  getNode(point, key) {
    const { x, y } = point;
    const nodeStyles = {
      fill: 'blue',
      stroke: 'black',
      strokeWidth: 1
    };

    return (
      <circle
        cx={x}
        cy={y}
        r="20"
        style={nodeStyles}
        key={key}
        onMouseDown={() => { this.handleNodeMouseDown(key); }}
      />
    );
  }

  getEdge(pointA, pointB, key) {
    const { x: x1, y: y1 } = pointA;
    const { x: x2, y: y2 } = pointB;

    const edgeStyles = {
      stroke: 'blue',
      strokeWidth: 5
    };
    return (
      <line x1={x1} x2={x2} y1={y1} y2={y2} style={edgeStyles} key={key} />
    );
  }

  getGraph() {
    const nodes = [];
    let edgeData;

    for (let nodeId in this.state.nodes) {
      const nodeData = this.state.nodes[nodeId];
      nodes.push(this.getNode(nodeData, nodeId));
    }

    const edges = [];
    let ind;
    for ([ind, edgeData] of this.state.edges.entries()) {
      const startNode = this.state.nodes[edgeData.startId];
      const endNode = this.state.nodes[edgeData.endId];
      edges.push(this.getEdge(startNode, endNode, ind));
    }

    const graph = (
      <g>
        {nodes}
        {edges}
      </g>
    );

    return graph;
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

  updateNodeLoc(e) {
    if (this.state.nodeDragging === true) {
      const { nodes } = this.state;
      nodes[this.state.activeNodeId] = {
        x: e.clientX,
        y: e.clientY
      };
      this.setState({
        nodes: nodes
      });
    }
  }

  handleNodeMouseDown(nodeId) {
    this.setState({
      nodeDragging: true,
      activeNodeId: nodeId
    });
  }

  handleNodeMouseUp() {
    console.log('I fired!');
    this.setState({
      nodeDragging: false,
      activeNodeId: null
    });
  }

  rotateString(deg) {
    if (isNaN(deg)) {
      deg = 0;
    }
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
          />
          <svg height="1000px" width="1000px">
            {this.getFractalPoly(0, 7)}
            {this.getGraph()}
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
