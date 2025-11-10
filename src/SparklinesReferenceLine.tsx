import React from 'react';
import * as dataProcessing from './dataProcessing';
import { Point } from './types';

type ReferenceLineType = 'max' | 'min' | 'mean' | 'avg' | 'median' | 'custom';

interface SparklinesReferenceLineProps {
    points?: Point[];
    margin?: number;
    type?: ReferenceLineType;
    value?: number;
    style?: React.CSSProperties;
}

export default class SparklinesReferenceLine extends React.Component<SparklinesReferenceLineProps> {

    static defaultProps: Partial<SparklinesReferenceLineProps> = {
        type: 'mean',
        style: { stroke: 'red', strokeOpacity: .75, strokeDasharray: '2, 2' }
    };

    render() {

        const { points, margin = 0, type = 'mean', style, value } = this.props;

        if (!points || points.length === 0) {
            return null;
        }

        const ypoints = points.map(p => p.y).filter((y): y is number => y !== null);
        const y = type === 'custom' ? value! : dataProcessing[type](ypoints);

        return (
            <line
                x1={points[0].x} y1={y + margin}
                x2={points[points.length - 1].x} y2={y + margin}
                style={style} />
        );
    }
}
