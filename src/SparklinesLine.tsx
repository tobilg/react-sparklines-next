import React from 'react';
import segmentPoints from './dataProcessing/segmentPoints';
import { Point } from './types';

interface SparklinesLineStyle extends React.CSSProperties {
    fillInvert?: boolean;
}

interface SparklinesLineProps {
    data?: number[];
    points?: Point[];
    width?: number;
    height?: number;
    margin?: number;
    color?: string;
    style?: SparklinesLineStyle;
    onMouseMove?: (event: string, dataValue: number, point: Point) => void;
}

export default class SparklinesLine extends React.Component<SparklinesLineProps> {

  static defaultProps: Partial<SparklinesLineProps> = {
    style: {}
  };

  render() {
    const { data, points, width, height, margin, color, style, onMouseMove } = this.props;

    if (!points || !width || !height || margin === undefined) {
      return null;
    }

    // Segment points to handle gaps (invalid values)
    const segments = segmentPoints(points);

    const lineStyle: React.CSSProperties = {
      stroke: color || style?.stroke || 'slategray',
      strokeWidth: style?.strokeWidth || '1',
      strokeLinejoin: style?.strokeLinejoin || 'round',
      strokeLinecap: style?.strokeLinecap || 'round',
      fill: 'none',
    };
    const fillStyle: React.CSSProperties = {
      stroke: style?.stroke || 'none',
      strokeWidth: '0',
      fillOpacity: style?.fillOpacity || '.1',
      fill: style?.fill || color || 'slategray',
      pointerEvents: 'auto',
    };

    const tooltips = onMouseMove && data ? points
      .filter(p => p.valid)
      .map((p) => {
        // Find the original index in the data array
        const originalIndex = points.indexOf(p);
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
        {tooltips}
        {/* Render fill for each segment */}
        {segments.map((segment, segIndex) => {
          const segmentLinePoints = segment.map(p => [p.x, p.y]).reduce((a, b) => a.concat(b));
          const closePolyPoints = style?.fillInvert ? [
            segment[segment.length - 1].x,
            margin,
            margin,
            margin,
            margin,
            segment[0].y,
          ] : [
            segment[segment.length - 1].x,
            height - margin,
            margin,
            height - margin,
            margin,
            segment[0].y,
          ];
          const fillPoints = segmentLinePoints.concat(closePolyPoints);

          return (
            <polyline
              key={`fill-${segIndex}`}
              points={fillPoints.join(' ')}
              style={fillStyle}
            />
          );
        })}
        {/* Render line for each segment */}
        {segments.map((segment, segIndex) => {
          const segmentLinePoints = segment.map(p => [p.x, p.y]).reduce((a, b) => a.concat(b));
          return (
            <polyline
              key={`line-${segIndex}`}
              points={segmentLinePoints.join(' ')}
              style={lineStyle}
            />
          );
        })}
      </g>
    );
  }
}
