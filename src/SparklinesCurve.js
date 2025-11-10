import PropTypes from 'prop-types';
import React from 'react';
import segmentPoints from './dataProcessing/segmentPoints';

export default class SparklinesCurve extends React.Component {

    static propTypes = {
        color: PropTypes.string,
        style: PropTypes.object
    };

    static defaultProps = {
        style: {}
    };

    render() {
        const { points, width, height, margin, color, style, divisor = 0.25 } = this.props;

        // Segment points to handle gaps (invalid values)
        const segments = segmentPoints(points);

        const lineStyle = {
            stroke: color || style.stroke || 'slategray',
            strokeWidth: style.strokeWidth || '1',
            strokeLinejoin: style.strokeLinejoin || 'round',
            strokeLinecap: style.strokeLinecap || 'round',
            fill: 'none'
        };
        const fillStyle = {
            stroke: style.stroke || 'none',
            strokeWidth: '0',
            fillOpacity: style.fillOpacity || '.1',
            fill: style.fill || color || 'slategray'
        };

        // Helper function to generate curve path for a segment
        const generateCurvePath = (segment) => {
            let prev;
            const curve = (p) => {
                let res;
                if (!prev) {
                    res = [p.x, p.y]
                } else {
                    const len = (p.x - prev.x) * divisor;
                    res = [ "C",
                        //x1
                        prev.x + len,
                        //y1
                        prev.y,
                        //x2,
                        p.x - len,
                        //y2,
                        p.y,
                        //x,
                        p.x,
                        //y
                        p.y
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
                        margin, segment[0].y
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
        )
    }
}
