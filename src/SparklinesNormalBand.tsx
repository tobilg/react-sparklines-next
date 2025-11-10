import React from 'react';
import mean from './dataProcessing/mean';
import stdev from './dataProcessing/stdev';
import { Point } from './types';

interface SparklinesNormalBandProps {
    points?: Point[];
    margin?: number;
    style?: React.CSSProperties;
}

export default class SparklinesNormalBand extends React.Component<SparklinesNormalBandProps> {

    static defaultProps: Partial<SparklinesNormalBandProps> = {
        style: { fill: 'red', fillOpacity: .1 }
    };

    render() {

        const { points, margin = 0, style } = this.props;

        if (!points || points.length === 0) {
            return null;
        }

        const ypoints = points.map(p => p.y).filter((y): y is number => y !== null);
        const dataMean = mean(ypoints);
        const dataStdev = stdev(ypoints);

        return (
            <rect x={points[0].x} y={dataMean - dataStdev + margin}
                width={points[points.length - 1].x - points[0].x} height={dataStdev * 2}
                style={style} />
        );
    }
}
