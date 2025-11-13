import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Sparklines } from '../Sparklines';
import SparklinesSteppedLine from '../SparklinesSteppedLine';

describe('SparklinesSteppedLine', () => {
    const sampleData = [1, 2, 3, 2, 1];

    it('renders without crashing', () => {
        expect(() =>
            render(
                <Sparklines data={sampleData}>
                    <SparklinesSteppedLine />
                </Sparklines>
            )
        ).not.toThrow();
    });

    it('renders a path element', () => {
        const { container } = render(
            <Sparklines data={sampleData}>
                <SparklinesSteppedLine />
            </Sparklines>
        );
        const path = container.querySelector('path');
        expect(path).not.toBeNull();
    });

    it('renders with default step mode (before)', () => {
        const { container } = render(
            <Sparklines data={sampleData}>
                <SparklinesSteppedLine />
            </Sparklines>
        );
        const path = container.querySelector('path');
        expect(path).not.toBeNull();
        // Should contain H (horizontal) and V (vertical) commands for before mode
        const pathData = path!.getAttribute('d');
        expect(pathData).toContain('H');
        expect(pathData).toContain('V');
    });

    it('renders with step="after" mode', () => {
        const { container } = render(
            <Sparklines data={sampleData}>
                <SparklinesSteppedLine step="after" />
            </Sparklines>
        );
        const path = container.querySelector('path');
        expect(path).not.toBeNull();
        const pathData = path!.getAttribute('d');
        expect(pathData).toContain('V');
        expect(pathData).toContain('H');
    });

    it('renders with step="middle" mode', () => {
        const { container } = render(
            <Sparklines data={sampleData}>
                <SparklinesSteppedLine step="middle" />
            </Sparklines>
        );
        const path = container.querySelector('path');
        expect(path).not.toBeNull();
        const pathData = path!.getAttribute('d');
        expect(pathData).toContain('H');
        expect(pathData).toContain('V');
    });

    it('applies custom color', () => {
        const { container } = render(
            <Sparklines data={sampleData}>
                <SparklinesSteppedLine color="#ff0000" />
            </Sparklines>
        );
        const path = container.querySelector('path');
        const stroke = path!.getAttribute('style');
        expect(stroke).toContain('#ff0000');
    });

    it('applies custom style', () => {
        const { container } = render(
            <Sparklines data={sampleData}>
                <SparklinesSteppedLine style={{ strokeWidth: '3' }} />
            </Sparklines>
        );
        const path = container.querySelector('path');
        const style = path!.getAttribute('style');
        expect(style).toContain('stroke-width');
        expect(style).toContain('3');
    });

    it('renders multiple segments for data with gaps', () => {
        const dataWithGaps = [1, 2, null, 3, 4] as any[];
        const { container } = render(
            <Sparklines data={dataWithGaps}>
                <SparklinesSteppedLine />
            </Sparklines>
        );
        const paths = container.querySelectorAll('path');
        // Should have 2 segments (before and after null)
        expect(paths.length).toBeGreaterThanOrEqual(2);
    });

    it('renders nothing when data is empty', () => {
        const { container } = render(
            <Sparklines data={[]}>
                <SparklinesSteppedLine />
            </Sparklines>
        );
        const svg = container.querySelector('svg');
        expect(svg).toBeNull();
    });

    it('handles single data point', () => {
        const { container } = render(
            <Sparklines data={[5]}>
                <SparklinesSteppedLine />
            </Sparklines>
        );
        const path = container.querySelector('path');
        expect(path).not.toBeNull();
    });

    it('renders with default props', () => {
        const { container } = render(
            <Sparklines data={sampleData}>
                <SparklinesSteppedLine />
            </Sparklines>
        );
        const path = container.querySelector('path');
        const style = path!.getAttribute('style');
        // Default stroke should be slategray
        expect(style).toContain('slategray');
        // Default strokeWidth should be 1
        expect(style).toContain('stroke-width');
        expect(style).toContain('1');
    });
});
