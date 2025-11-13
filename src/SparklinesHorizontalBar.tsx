import React from 'react';

interface SparklinesHorizontalBarStyle extends React.CSSProperties {
    backgroundColor?: string;
    fontSize?: string | number;
    fontFamily?: string;
    textColor?: string;
    textPadding?: number;
}

interface SparklinesHorizontalBarProps {
    value: number;
    totalValue: number;
    height?: number;
    width?: number;
    margin?: number;
    style?: SparklinesHorizontalBarStyle;
    showValue?: boolean;
    onMouseMove?: (event: React.MouseEvent<SVGRectElement>) => void;
}

export default class SparklinesHorizontalBar extends React.Component<SparklinesHorizontalBarProps> {

  static defaultProps: Partial<SparklinesHorizontalBarProps> = {
    style: { fill: 'slategray' },
    height: 60,
    width: 240,
    margin: 2,
    showValue: false,
  };

  render() {
    const { value, totalValue, height, width, margin, style, showValue, onMouseMove } = this.props;

    // Validate required props
    if (typeof value !== 'number' || isNaN(value)) {
      return null;
    }

    if (typeof totalValue !== 'number' || isNaN(totalValue) || totalValue <= 0) {
      return null;
    }

    if (typeof height !== 'number' || isNaN(height)) {
      return null;
    }

    if (typeof width !== 'number' || isNaN(width)) {
      return null;
    }

    if (typeof margin !== 'number' || isNaN(margin)) {
      return null;
    }

    // Calculate available dimensions
    const availableWidth = width - (2 * margin);
    const availableHeight = height - (2 * margin);

    // Calculate bar width as percentage of available width
    const ratio = Math.max(0, Math.min(1, value / totalValue)); // Clamp between 0 and 1
    const barWidth = availableWidth * ratio;

    // Extract custom properties from style and create clean bar style
    const { backgroundColor: styleBgColor, fontSize: styleFontSize, fontFamily: styleFontFamily, textColor: styleTextColor, textPadding: styleTextPadding, ...barStyle } = style || {};

    // Use style properties with defaults
    const finalBackgroundColor = styleBgColor !== undefined ? styleBgColor : '#f0f0f0';
    const finalFontSize = styleFontSize !== undefined ? styleFontSize : '14px';
    const finalFontFamily = styleFontFamily !== undefined ? styleFontFamily : 'sans-serif';
    const finalTextColor = styleTextColor !== undefined ? styleTextColor : '#333';
    const finalTextPadding: number = typeof styleTextPadding === 'number' ? styleTextPadding : 5;

    // Text positioning - place it on the right side with customizable padding
    const textX = width - margin - finalTextPadding;
    const textY = margin + (availableHeight / 2); // Vertically centered

    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
      >
        {/* Background rectangle */}
        <rect
          x={margin}
          y={margin}
          width={availableWidth}
          height={availableHeight}
          style={{ fill: finalBackgroundColor }}
        />
        {/* Foreground bar */}
        <rect
          x={margin}
          y={margin}
          width={barWidth}
          height={availableHeight}
          style={barStyle}
          onMouseMove={onMouseMove}
        />
        {/* Value text */}
        {showValue && (
          <text
            x={textX}
            y={textY}
            dy="0.35em"
            textAnchor="end"
            dominantBaseline="middle"
            style={{
              fontSize: finalFontSize,
              fontFamily: finalFontFamily,
              fill: finalTextColor,
            }}
          >
            {value}
          </text>
        )}
      </svg>
    );
  }
}
