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
    
    // Extract strokeWidth from style to account for it in calculations
    // Check if stroke is explicitly defined (not just using our default)
    const hasExplicitStroke = style && (style.stroke !== undefined && style.stroke !== 'none');
    const strokeWidth = hasExplicitStroke ? (1 * ((style && (style.strokeWidth as any)) || 1)) : 0;
    
    // Default behavior: bars touch with a small overlap
    // Only use marginWidth for spacing if margin is explicitly set to a value > 0
    // Note: Sparklines has default margin=2, but we treat that as "not set" for bar spacing
    // To enable spacing, explicitly set margin prop on Sparklines component
    const useMarginSpacing = margin !== undefined && margin !== null && margin > 0 && margin !== 2;
    const marginWidth = useMarginSpacing ? 2 * margin : 0;
    
    // Get valid points for width calculation
    const validPoints = points.filter(p => p && typeof p.x === 'number' && !isNaN(p.x));
    
    // Calculate width based on distance between consecutive valid points
    const getBarWidth = (pointIndex: number): number => {
      if (barWidth) return barWidth;
      
      // Find the next valid point after this one
      let nextValidIndex = pointIndex + 1;
      while (nextValidIndex < points.length && 
             (!points[nextValidIndex] || !points[nextValidIndex].valid || 
              typeof points[nextValidIndex].x !== 'number' || isNaN(points[nextValidIndex].x))) {
        nextValidIndex++;
      }
      
      if (nextValidIndex < points.length) {
        // Calculate base width
        const baseWidth = points[nextValidIndex].x - points[pointIndex].x;
        if (useMarginSpacing) {
          return Math.max(0, baseWidth - strokeWidth - marginWidth);
        } else {
          // If stroke is defined, overlap by strokeWidth so strokes touch
          // If no stroke, add small overlap (1px) to ensure bars touch
          const overlap = strokeWidth > 0 ? strokeWidth : 1;
          return Math.max(0, baseWidth + overlap);
        }
      }
      
      // For last bar, use same width as previous bar
      if (validPoints.length >= 2) {
        const baseWidth = validPoints[validPoints.length - 1].x - validPoints[validPoints.length - 2].x;
        if (useMarginSpacing) {
          return Math.max(0, baseWidth - strokeWidth - marginWidth);
        } else {
          const overlap = strokeWidth > 0 ? strokeWidth : 1;
          return Math.max(0, baseWidth + overlap);
        }
      }
      
      return 0;
    };

    return (
      <g transform="scale(1,-1)">
        {points.map((p, i) => {
          // Skip invalid points (supports gap feature from PR #46)
          if (!p || !p.valid || typeof p.y !== 'number' || isNaN(p.y) || typeof p.x !== 'number' || isNaN(p.x)) {
            return null;
          }

          const width = getBarWidth(i);
          // Position bar to start at current point and extend to next point
          const barX = p.x;

          // Use style as-is (original behavior - no default stroke)
          const barStyle: React.CSSProperties = { ...style };

          return (
            <rect
              key={i}
              x={barX}
              y={-height}
              width={width}
              height={Math.max(0, height - p.y)}
              style={barStyle}
              onMouseMove={onMouseMove && onMouseMove.bind(this, p)}
            />
          );
        })}
      </g>
    );
  }
}
