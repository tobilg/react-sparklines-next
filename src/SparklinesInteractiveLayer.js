import PropTypes from 'prop-types';
import React from 'react';

export default class SparklinesInteractiveLayer extends React.Component {
  static propTypes = {
    onMouseMove: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onClick: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      activePoint: null,
      activeIndex: null
    };
  }

  handleMouseMove = (e) => {
    const { points, data, width, onMouseMove } = this.props;
    if (!points || points.length === 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const scaleX = width / rect.width;
    const scaledX = x * scaleX;

    // Find the closest point
    let closestIndex = 0;
    let closestDistance = Math.abs(points[0].x - scaledX);

    for (let i = 1; i < points.length; i++) {
      const distance = Math.abs(points[i].x - scaledX);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    }

    this.setState({
      activePoint: points[closestIndex],
      activeIndex: closestIndex
    });

    if (onMouseMove) {
      onMouseMove(data[closestIndex], points[closestIndex], closestIndex, e);
    }
  }

  handleMouseLeave = (e) => {
    const { onMouseLeave } = this.props;

    this.setState({
      activePoint: null,
      activeIndex: null
    });

    if (onMouseLeave) {
      onMouseLeave(e);
    }
  }

  handleClick = (e) => {
    const { data, onClick } = this.props;
    const { activePoint, activeIndex } = this.state;

    if (onClick && activeIndex !== null) {
      onClick(data[activeIndex], activePoint, activeIndex, e);
    }
  }

  render() {
    const { width, height } = this.props;
    const { activePoint } = this.state;

    return (
      <g>
        <rect
          width={width}
          height={height}
          fill="transparent"
          onMouseMove={this.handleMouseMove}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleClick}
          style={{ cursor: 'crosshair' }}
        />
        {activePoint && (
          <g>
            <circle
              cx={activePoint.x}
              cy={activePoint.y}
              r={3}
              fill="red"
              fillOpacity={0.8}
            />
            <line
              x1={activePoint.x}
              y1={0}
              x2={activePoint.x}
              y2={height}
              stroke="red"
              strokeOpacity={0.5}
              strokeWidth={1}
              strokeDasharray="3,3"
            />
          </g>
        )}
      </g>
    );
  }
}
