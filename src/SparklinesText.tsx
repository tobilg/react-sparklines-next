import React from 'react';

interface SparklinesTextProps {
    text?: string;
    point?: {
        x: number;
        y: number;
    };
    fontSize?: number;
    fontFamily?: string;
}

export default class SparklinesText extends React.Component<SparklinesTextProps> {

    static defaultProps: SparklinesTextProps = {
        text: '',
        point: { x: 0, y: 0 }
    };

    render() {
        const { point, text, fontSize, fontFamily } = this.props;
        const { x, y } = point!;
        return (
            <g>
              <text x={x} y={y} fontFamily={fontFamily || "Verdana"} fontSize={fontSize || 10}>
                {text}
              </text>
            </g>
        );
    }
}
