import React from 'react';
import { Point } from './types';

interface SparklinesBarsProps {
    points?: Point[];
    height?: number;
    style?: React.CSSProperties & { strokeWidth?: string | number };
    barWidth?: number;
    margin?: number;
    onMouseMove?: (point: Point) => void;
}

export default class SparklinesBars extends React.Component<SparklinesBarsProps> {

  static defaultProps: Partial<SparklinesBarsProps> = {
    style: { fill: 'slategray' },
  };

  render() {
    const { points, height, style, barWidth, margin, onMouseMove } = this.props;

    // Return null if required props are missing or invalid
    if (!points || !Array.isArray(points) || points.length === 0) {
      return null;
    }

    if (typeof height !== 'number' || isNaN(height)) {
      return null;
    }

    const strokeWidth = 1 * (Number(style && style.strokeWidth) || 0);
    const marginWidth = margin ? 2 * margin : 0;
    const width =
      barWidth ||
      (points && points.length >= 2
        ? Math.max(0, points[1].x - points[0].x - strokeWidth - marginWidth)
        : 0);

    return (
      <g transform="scale(1,-1)">
        {points.map((p, i) => {
          // Skip invalid points (supports gap feature from PR #46)
          if (!p || !p.valid || typeof p.y !== 'number' || isNaN(p.y) || typeof p.x !== 'number' || isNaN(p.x)) {
            return null;
          }

          return (
            <rect
              key={i}
              x={p.x - (width + strokeWidth) / 2}
              y={-height}
              width={width}
              height={Math.max(0, height - p.y)}
              style={style}
              onMouseMove={onMouseMove && onMouseMove.bind(this, p)}
            />
          );
        })}
      </g>
    );
  }
}
