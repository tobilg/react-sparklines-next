import React, { PureComponent } from 'react';
import SparklinesText from './SparklinesText';
import SparklinesLine from './SparklinesLine';
import SparklinesCurve from './SparklinesCurve';
import SparklinesBars from './SparklinesBars';
import SparklinesSpots from './SparklinesSpots';
import SparklinesReferenceLine from './SparklinesReferenceLine';
import SparklinesNormalBand from './SparklinesNormalBand';
import SparklinesInteractiveLayer from './SparklinesInteractiveLayer';
import dataToPoints from './dataProcessing/dataToPoints';
import { Point } from './types';

interface SparklinesProps {
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

class Sparklines extends PureComponent<SparklinesProps> {

    static defaultProps: Partial<SparklinesProps> = {
        data: [],
        width: 240,
        height: 60,
        //Scale the graphic content of the given element non-uniformly if necessary such that the element's bounding box exactly matches the viewport rectangle.
        preserveAspectRatio: 'none', //https://www.w3.org/TR/SVG/coords.html#PreserveAspectRatioAttribute
        margin: 2
    };

    render() {
        const { data = [], limit, width, height, svgWidth, svgHeight, preserveAspectRatio, margin, style, max, min } = this.props;

        if (data.length === 0) return null;

        const points = dataToPoints({ data, limit, width, height, margin, max, min });

        const svgOpts: React.SVGProps<SVGSVGElement> = {
            style: style,
            viewBox: `0 0 ${width} ${height}`,
            preserveAspectRatio: preserveAspectRatio
        };
        if (svgWidth && svgWidth > 0) svgOpts.width = svgWidth;
        if (svgHeight && svgHeight > 0) svgOpts.height = svgHeight;

        return (
            <svg {...svgOpts}>
                {
                    React.Children.map(this.props.children, function(child) {
                        if (!React.isValidElement(child)) return child;
                        return React.cloneElement(child, { data, points, width, height, margin } as any);
                    })
                }
            </svg>
        );
    }
}

export {
    Sparklines,
    SparklinesLine,
    SparklinesCurve,
    SparklinesBars,
    SparklinesSpots,
    SparklinesReferenceLine,
    SparklinesNormalBand,
    SparklinesText,
    SparklinesInteractiveLayer
};

export default Sparklines;
