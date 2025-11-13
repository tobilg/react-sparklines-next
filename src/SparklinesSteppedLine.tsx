import React from 'react';
import { Point } from './types';
import segmentPoints from './dataProcessing/segmentPoints';

type StepMode = 'before' | 'after' | 'middle';

interface SparklinesSteppedLineProps {
    points?: Point[];
    data?: number[];
    width?: number;
    height?: number;
    margin?: number;
    color?: string;
    style?: React.CSSProperties;
    step?: StepMode | boolean;
    onMouseMove?: (event: 'enter' | 'click', value: number, point: Point) => void;
}

export default class SparklinesSteppedLine extends React.Component<SparklinesSteppedLineProps> {

  static defaultProps: Partial<SparklinesSteppedLineProps> = {
    step: 'before',
    style: {},
  };

  /**
   * Generates SVG path commands for stepped line based on the step mode
   */
  private generateSteppedPath(segment: Point[], stepMode: StepMode): string {
    if (segment.length === 0) {
      return '';
    }

    const pathCommands: string[] = [];

    // Start at first point
    const firstPoint = segment[0];
    pathCommands.push(`M ${firstPoint.x} ${firstPoint.y || 0}`);

    // Generate stepped path for remaining points
    for (let i = 1; i < segment.length; i++) {
      const prevPoint = segment[i - 1];
      const currentPoint = segment[i];
      const currentY = currentPoint.y || 0;

      switch (stepMode) {
        case 'before':
          // Move horizontal first (to next x), then vertical (to next y)
          pathCommands.push(`H ${currentPoint.x}`);
          pathCommands.push(`V ${currentY}`);
          break;

        case 'after':
          // Move vertical first (to next y), then horizontal (to next x)
          pathCommands.push(`V ${currentY}`);
          pathCommands.push(`H ${currentPoint.x}`);
          break;

        case 'middle':
          // Step at midpoint between data points
          const midX = (prevPoint.x + currentPoint.x) / 2;
          pathCommands.push(`H ${midX}`);
          pathCommands.push(`V ${currentY}`);
          pathCommands.push(`H ${currentPoint.x}`);
          break;
      }
    }

    return pathCommands.join(' ');
  }

  render() {
    const { points, data, width, height, margin, color, style, step, onMouseMove } = this.props;

    // Validate required props
    if (!points || !width || !height || margin === undefined) {
      return null;
    }

    // Normalize step prop to StepMode
    let stepMode: StepMode = 'before';
    if (typeof step === 'boolean') {
      stepMode = step ? 'before' : 'before'; // boolean true defaults to 'before'
    } else if (step) {
      stepMode = step;
    }

    // Segment points to handle gaps in data
    const segments = segmentPoints(points);

    // Define line style
    const lineStyle: React.CSSProperties = {
      stroke: color || style?.stroke || 'slategray',
      strokeWidth: style?.strokeWidth || '1',
      strokeLinejoin: style?.strokeLinejoin || 'round',
      strokeLinecap: style?.strokeLinecap || 'round',
      fill: 'none',
      ...style,
    };

    // Optional interactivity - render invisible circles at data points
    const tooltips = onMouseMove && data ? points
      .filter(p => p.valid)
      .map((p) => {
        const originalIndex = points.indexOf(p);
        const fillStyle: React.CSSProperties = {
          fill: color || style?.stroke || 'slategray',
          opacity: 0,
        };

        return (
          <circle
            key={originalIndex}
            cx={p.x}
            cy={p.y || 0}
            r={2}
            style={fillStyle}
            onMouseEnter={() => onMouseMove('enter', data[originalIndex], p)}
            onClick={() => onMouseMove('click', data[originalIndex], p)}
          />
        );
      }) : null;

    return (
      <g>
        {segments.map((segment, idx) => (
          <path
            key={idx}
            d={this.generateSteppedPath(segment, stepMode)}
            style={lineStyle}
          />
        ))}
        {tooltips}
      </g>
    );
  }
}
