import React from 'react';
import { Point } from './types';

interface SpotColors {
    [key: string]: string;
}

interface SparklinesSpotsProps {
    points?: Point[];
    width?: number;
    height?: number;
    size?: number;
    style?: React.CSSProperties;
    spotColors?: SpotColors;
}

export default class SparklinesSpots extends React.Component<SparklinesSpotsProps> {

    static defaultProps: Partial<SparklinesSpotsProps> = {
        size: 2,
        spotColors: {
            '-1': 'red',
            '0': 'black',
            '1': 'green'
        }
    };

    lastDirection(points: Point[]): number {

        Math.sign = Math.sign || function(x: number) { return x > 0 ? 1 : -1; };

        return points.length < 2
            ? 0
            : Math.sign((points[points.length - 2].y || 0) - (points[points.length - 1].y || 0));
    }

    render() {

        const { points, size, style, spotColors } = this.props;

        if (!points || points.length === 0) {
            return null;
        }

        const startSpot = <circle
                            cx={points[0].x}
                            cy={points[0].y || 0}
                            r={size}
                            style={style} />;

        const endSpot = <circle
                            cx={points[points.length - 1].x}
                            cy={points[points.length - 1].y || 0}
                            r={size}
                            style={style || { fill: spotColors![this.lastDirection(points)] }} />;

        return (
            <g>
                {style && startSpot}
                {endSpot}
            </g>
        );
    }
}
