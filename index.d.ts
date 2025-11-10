import * as React from 'react';

// Common types
export interface Point {
  x: number;
  y: number | null;
  valid: boolean;
}

export interface SparklineStyle extends React.CSSProperties {
  fill?: string;
  fillOpacity?: string | number;
  fillInvert?: boolean;
  stroke?: string;
  strokeWidth?: string | number;
  strokeOpacity?: string | number;
  strokeDasharray?: string;
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
  strokeLinecap?: 'butt' | 'round' | 'square';
  pointerEvents?: string;
}

// Sparklines (main container)
export interface SparklinesProps {
  data?: number[];
  limit?: number;
  width?: number;
  height?: number;
  svgWidth?: number;
  svgHeight?: number;
  preserveAspectRatio?: string;
  margin?: number;
  style?: React.CSSProperties;
  min?: number;
  max?: number;
  onMouseMove?: (event: string, dataValue: number, point: Point) => void;
  children?: React.ReactNode;
}

export class Sparklines extends React.PureComponent<SparklinesProps> {}

// SparklinesLine
export interface SparklinesLineProps {
  color?: string;
  style?: SparklineStyle;
  onMouseMove?: (event: string, dataValue: number, point: Point) => void;
}

export class SparklinesLine extends React.Component<SparklinesLineProps> {}

// SparklinesCurve
export interface SparklinesCurveProps {
  color?: string;
  style?: SparklineStyle;
  divisor?: number;
}

export class SparklinesCurve extends React.Component<SparklinesCurveProps> {}

// SparklinesBars
export interface SparklinesBarsProps {
  points?: Point[];
  height?: number;
  style?: SparklineStyle;
  barWidth?: number;
  margin?: number;
  onMouseMove?: (point: Point) => void;
}

export class SparklinesBars extends React.Component<SparklinesBarsProps> {}

// SparklinesSpots
export interface SpotColors {
  [key: string]: string;
  '-1'?: string;
  '0'?: string;
  '1'?: string;
}

export interface SparklinesSpotsProps {
  size?: number;
  style?: SparklineStyle;
  spotColors?: SpotColors;
}

export class SparklinesSpots extends React.Component<SparklinesSpotsProps> {}

// SparklinesReferenceLine
export type ReferenceLineType = 'max' | 'min' | 'mean' | 'avg' | 'median' | 'custom';

export interface SparklinesReferenceLineProps {
  type?: ReferenceLineType;
  value?: number;
  style?: SparklineStyle;
}

export class SparklinesReferenceLine extends React.Component<SparklinesReferenceLineProps> {}

// SparklinesNormalBand
export interface SparklinesNormalBandProps {
  style?: SparklineStyle;
}

export class SparklinesNormalBand extends React.Component<SparklinesNormalBandProps> {}

// SparklinesText
export interface SparklinesTextProps {
  text?: string;
  point?: {
    x: number;
    y: number;
  };
  fontSize?: number;
  fontFamily?: string;
}

export class SparklinesText extends React.Component<SparklinesTextProps> {}

// SparklinesInteractiveLayer
export interface SparklinesInteractiveLayerProps {
  onMouseMove?: (dataValue: number, point: Point, index: number, event: React.MouseEvent<SVGRectElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<SVGRectElement>) => void;
  onClick?: (dataValue: number, point: Point, index: number, event: React.MouseEvent<SVGRectElement>) => void;
}

export class SparklinesInteractiveLayer extends React.Component<SparklinesInteractiveLayerProps> {}

// Default export
export default Sparklines;
