import React from 'react';
import segmentPoints from './dataProcessing/segmentPoints';
import { Point } from './types';

interface SparklinesCurveProps {
    points?: Point[];
    width?: number;
    height?: number;
    margin?: number;
    color?: string;
    style?: React.CSSProperties;
    divisor?: number;
}

export default class SparklinesCurve extends React.Component<SparklinesCurveProps> {

    static defaultProps: Partial<SparklinesCurveProps> = {
        style: {}
    };

    render() {
        const { points, height, margin, color, style, divisor = 0.25 } = this.props;

        if (!points || !height || margin === undefined) {
            return null;
        }

        // Segment points to handle gaps (invalid values)
        const segments = segmentPoints(points);

        const lineStyle: React.CSSProperties = {
            stroke: color || style?.stroke || 'slategray',
            strokeWidth: style?.strokeWidth || '1',
            strokeLinejoin: style?.strokeLinejoin || 'round',
            strokeLinecap: style?.strokeLinecap || 'round',
            fill: 'none'
        };
        const fillStyle: React.CSSProperties = {
            stroke: style?.stroke || 'none',
            strokeWidth: '0',
            fillOpacity: style?.fillOpacity || '.1',
            fill: style?.fill || color || 'slategray'
        };

        // Helper function to generate curve path for a segment
        const generateCurvePath = (segment: Point[]): (string | number)[] => {
            let prev: Point | undefined;
            const curve = (p: Point): (string | number)[] => {
                let res: (string | number)[];
                if (!prev) {
                    res = [p.x, p.y || 0];
                } else {
                    const len = (p.x - prev.x) * divisor;
                    res = ["C",
                        //x1
                        prev.x + len,
                        //y1
                        prev.y || 0,
                        //x2,
                        p.x - len,
                        //y2,
                        p.y || 0,
                        //x,
                        p.x,
                        //y
                        p.y || 0
                    ];
                }
                prev = p;
                return res;
            };
            return segment
                .map((p) => curve(p))
                .reduce((a, b) => a.concat(b));
        };

        return (
            <g>
                {/* Render fill for each segment */}
                {segments.map((segment, segIndex) => {
                    const linePoints = generateCurvePath(segment);
                    const closePolyPoints = [
                        "L" + segment[segment.length - 1].x, height - margin,
                        margin, height - margin,
                        margin, segment[0].y || 0
                    ];
                    const fillPoints = linePoints.concat(closePolyPoints);

                    return (
                        <path
                            key={`fill-${segIndex}`}
                            d={"M"+fillPoints.join(' ')}
                            style={fillStyle}
                        />
                    );
                })}
                {/* Render line for each segment */}
                {segments.map((segment, segIndex) => {
                    const linePoints = generateCurvePath(segment);

                    return (
                        <path
                            key={`line-${segIndex}`}
                            d={"M"+linePoints.join(' ')}
                            style={lineStyle}
                        />
                    );
                })}
            </g>
        );
    }
}
