import React from 'react';
import { Point } from './types';
import segmentPoints from './dataProcessing/segmentPoints';

type StepMode = 'before' | 'after' | 'middle';

interface SparklinesSteppedAreaProps {
    points?: Point[];
    data?: number[];
    width?: number;
    height?: number;
    margin?: number;
    color?: string;
    style?: React.CSSProperties;
    step?: StepMode | boolean;
    gradient?: {
        topColor?: string;
        bottomColor?: string;
        topOpacity?: number;
        bottomOpacity?: number;
    };
    showBaseline?: boolean;
    showOutline?: boolean;
    onMouseMove?: (event: 'enter' | 'click', value: number, point: Point) => void;
}

export default class SparklinesSteppedArea extends React.Component<SparklinesSteppedAreaProps> {

  static defaultProps: Partial<SparklinesSteppedAreaProps> = {
    step: 'before',
    style: {},
    showBaseline: true,
    showOutline: true,
  };

  /**
   * Generates a unique ID for gradients to avoid conflicts
   */
  private generateGradientId(): string {
    return `sparklines-gradient-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generates SVG path commands for stepped area based on the step mode
   * Returns the path for the area (closed shape)
   */
  private generateSteppedAreaPath(segment: Point[], stepMode: StepMode, height: number, margin: number): string {
    if (segment.length === 0) {
      return '';
    }

    const pathCommands: string[] = [];
    const baseline = height - margin;

    // Start at first point's x position at baseline
    const firstPoint = segment[0];
    pathCommands.push(`M ${firstPoint.x} ${baseline}`);

    // Move up to first point's y value
    pathCommands.push(`L ${firstPoint.x} ${firstPoint.y || 0}`);

    // Generate stepped path for remaining points
    for (let i = 1; i < segment.length; i++) {
      const prevPoint = segment[i - 1];
      const currentPoint = segment[i];
      const prevY = prevPoint.y || 0;
      const currentY = currentPoint.y || 0;

      switch (stepMode) {
        case 'before':
          // Move horizontal first (to next x), then vertical (to next y)
          pathCommands.push(`L ${currentPoint.x} ${prevY}`);
          pathCommands.push(`L ${currentPoint.x} ${currentY}`);
          break;

        case 'after':
          // Move vertical first (to next y), then horizontal (to next x)
          pathCommands.push(`L ${prevPoint.x} ${currentY}`);
          pathCommands.push(`L ${currentPoint.x} ${currentY}`);
          break;

        case 'middle':
          // Step at midpoint between data points
          const midX = (prevPoint.x + currentPoint.x) / 2;
          pathCommands.push(`L ${midX} ${prevY}`);
          pathCommands.push(`L ${midX} ${currentY}`);
          pathCommands.push(`L ${currentPoint.x} ${currentY}`);
          break;
      }
    }

    // Close the path by going down to baseline and back to start
    const lastPoint = segment[segment.length - 1];
    pathCommands.push(`L ${lastPoint.x} ${baseline}`);
    pathCommands.push(`Z`);

    return pathCommands.join(' ');
  }

  /**
   * Generates SVG path commands for stepped outline (no fill)
   */
  private generateSteppedOutlinePath(segment: Point[], stepMode: StepMode): string {
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
      const prevY = prevPoint.y || 0;
      const currentY = currentPoint.y || 0;

      switch (stepMode) {
        case 'before':
          pathCommands.push(`L ${currentPoint.x} ${prevY}`);
          pathCommands.push(`L ${currentPoint.x} ${currentY}`);
          break;

        case 'after':
          pathCommands.push(`L ${prevPoint.x} ${currentY}`);
          pathCommands.push(`L ${currentPoint.x} ${currentY}`);
          break;

        case 'middle':
          const midX = (prevPoint.x + currentPoint.x) / 2;
          pathCommands.push(`L ${midX} ${prevY}`);
          pathCommands.push(`L ${midX} ${currentY}`);
          pathCommands.push(`L ${currentPoint.x} ${currentY}`);
          break;
      }
    }

    return pathCommands.join(' ');
  }

  render() {
    const {
      points,
      data,
      width,
      height,
      margin,
      color,
      style,
      step,
      gradient,
      showBaseline,
      showOutline,
      onMouseMove
    } = this.props;

    // Validate required props
    if (!points || !width || !height || margin === undefined) {
      return null;
    }

    // Normalize step prop to StepMode
    let stepMode: StepMode = 'before';
    if (typeof step === 'boolean') {
      stepMode = step ? 'before' : 'before';
    } else if (step) {
      stepMode = step;
    }

    // Segment points to handle gaps in data
    const segments = segmentPoints(points);

    // Determine fill color/gradient
    const fillColor = style?.fill || color || 'slategray';
    const strokeColor = style?.stroke || color || '#804a8c';
    const gradientId = this.generateGradientId();
    const useGradient = !!gradient;

    // Fill style for area
    const fillStyle: React.CSSProperties = {
      fill: useGradient ? `url(#${gradientId})` : fillColor,
      fillOpacity: style?.fillOpacity || (useGradient ? 1 : 0.3),
      ...style,
      stroke: 'none', // Area shouldn't have stroke
    };

    // Outline style for stepped line
    const outlineStyle: React.CSSProperties = {
      stroke: strokeColor,
      strokeWidth: style?.strokeWidth || '1',
      strokeLinejoin: style?.strokeLinejoin || 'miter',
      strokeLinecap: style?.strokeLinecap || 'butt',
      fill: 'none',
      vectorEffect: 'non-scaling-stroke',
    };

    // Baseline style
    const baselineStyle: React.CSSProperties = {
      stroke: strokeColor,
      strokeWidth: '1',
      opacity: 0.4,
      shapeRendering: 'crispEdges',
    };

    // Optional interactivity - render invisible circles at data points
    const tooltips = onMouseMove && data ? points
      .filter(p => p.valid)
      .map((p) => {
        const originalIndex = points.indexOf(p);
        const interactionStyle: React.CSSProperties = {
          fill: strokeColor,
          opacity: 0,
          cursor: 'pointer',
        };

        return (
          <circle
            key={originalIndex}
            cx={p.x}
            cy={p.y || 0}
            r={4}
            style={interactionStyle}
            onMouseEnter={() => onMouseMove('enter', data[originalIndex], p)}
            onClick={() => onMouseMove('click', data[originalIndex], p)}
          />
        );
      }) : null;

    const baseline = height - margin;

    return (
      <g>
        {/* Define gradient if needed */}
        {useGradient && (
          <defs>
            <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
              <stop
                offset="5%"
                stopColor={gradient.topColor || fillColor}
                stopOpacity={gradient.topOpacity || 0.8}
              />
              <stop
                offset="95%"
                stopColor={gradient.bottomColor || fillColor}
                stopOpacity={gradient.bottomOpacity || 0.5}
              />
            </linearGradient>
          </defs>
        )}

        {/* Render filled area for each segment */}
        {segments.map((segment, idx) => (
          <path
            key={`area-${idx}`}
            d={this.generateSteppedAreaPath(segment, stepMode, height, margin)}
            style={fillStyle}
          />
        ))}

        {/* Render outline for each segment */}
        {showOutline && segments.map((segment, idx) => (
          <path
            key={`outline-${idx}`}
            d={this.generateSteppedOutlinePath(segment, stepMode)}
            style={outlineStyle}
          />
        ))}

        {/* Render baseline */}
        {showBaseline && (
          <line
            x1={margin}
            x2={width - margin}
            y1={baseline}
            y2={baseline}
            style={baselineStyle}
          />
        )}

        {/* Interactive tooltips */}
        {tooltips}
      </g>
    );
  }
}
