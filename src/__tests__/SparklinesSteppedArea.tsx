import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Sparklines } from '../Sparklines';
import SparklinesSteppedArea from '../SparklinesSteppedArea';

describe('SparklinesSteppedArea', () => {
    const sampleData = [1, 2, 3, 2, 1];

    it('renders without crashing', () => {
        expect(() =>
            render(
                <Sparklines data={sampleData}>
                    <SparklinesSteppedArea />
                </Sparklines>
            )
        ).not.toThrow();
    });

    it('renders path elements for area and outline', () => {
        const { container } = render(
            <Sparklines data={sampleData}>
                <SparklinesSteppedArea />
            </Sparklines>
        );
        const paths = container.querySelectorAll('path');
        // Should have at least 2 paths: area fill + outline
        expect(paths.length).toBeGreaterThanOrEqual(2);
    });

    it('renders with default step mode (before)', () => {
        const { container } = render(
            <Sparklines data={sampleData}>
                <SparklinesSteppedArea />
            </Sparklines>
        );
        const paths = container.querySelectorAll('path');
        expect(paths.length).toBeGreaterThan(0);
        // Area path should contain Z to close the path
        const areaPath = paths[0];
        expect(areaPath.getAttribute('d')).toContain('Z');
    });

    it('renders with step="after" mode', () => {
        const { container } = render(
            <Sparklines data={sampleData}>
                <SparklinesSteppedArea step="after" />
            </Sparklines>
        );
        const paths = container.querySelectorAll('path');
        expect(paths.length).toBeGreaterThan(0);
    });

    it('renders with step="middle" mode', () => {
        const { container } = render(
            <Sparklines data={sampleData}>
                <SparklinesSteppedArea step="middle" />
            </Sparklines>
        );
        const paths = container.querySelectorAll('path');
        expect(paths.length).toBeGreaterThan(0);
    });

    it('applies custom color', () => {
        const { container } = render(
            <Sparklines data={sampleData}>
                <SparklinesSteppedArea color="#ff0000" />
            </Sparklines>
        );
        const paths = container.querySelectorAll('path');
        const areaPath = paths[0];
        const style = areaPath.getAttribute('style');
        expect(style).toContain('#ff0000');
    });

    it('renders with gradient', () => {
        const { container } = render(
            <Sparklines data={sampleData}>
                <SparklinesSteppedArea
                    gradient={{
                        topColor: '#ff0000',
                        bottomColor: '#0000ff',
                        topOpacity: 0.8,
                        bottomOpacity: 0.3
                    }}
                />
            </Sparklines>
        );
        const defs = container.querySelector('defs');
        expect(defs).not.toBeNull();
        const gradient = defs!.querySelector('linearGradient');
        expect(gradient).not.toBeNull();
        const stops = gradient!.querySelectorAll('stop');
        expect(stops.length).toBe(2);
    });

    it('renders baseline by default', () => {
        const { container } = render(
            <Sparklines data={sampleData}>
                <SparklinesSteppedArea />
            </Sparklines>
        );
        const line = container.querySelector('line');
        expect(line).not.toBeNull();
    });

    it('hides baseline when showBaseline is false', () => {
        const { container } = render(
            <Sparklines data={sampleData}>
                <SparklinesSteppedArea showBaseline={false} />
            </Sparklines>
        );
        const line = container.querySelector('line');
        expect(line).toBeNull();
    });

    it('hides outline when showOutline is false', () => {
        const { container } = render(
            <Sparklines data={sampleData}>
                <SparklinesSteppedArea showOutline={false} />
            </Sparklines>
        );
        const paths = container.querySelectorAll('path');
        // Should only have 1 path (area), no outline
        expect(paths.length).toBe(1);
    });

    it('renders outline when showOutline is true (default)', () => {
        const { container } = render(
            <Sparklines data={sampleData}>
                <SparklinesSteppedArea />
            </Sparklines>
        );
        const paths = container.querySelectorAll('path');
        // Should have 2 paths: area + outline
        expect(paths.length).toBeGreaterThanOrEqual(2);
    });

    it('applies custom style', () => {
        const { container } = render(
            <Sparklines data={sampleData}>
                <SparklinesSteppedArea style={{ fillOpacity: 0.5 }} />
            </Sparklines>
        );
        const areaPath = container.querySelector('path');
        const style = areaPath!.getAttribute('style');
        expect(style).toContain('fill-opacity');
        expect(style).toContain('0.5');
    });

    it('renders multiple segments for data with gaps', () => {
        const dataWithGaps = [1, 2, null, 3, 4] as any[];
        const { container } = render(
            <Sparklines data={dataWithGaps}>
                <SparklinesSteppedArea />
            </Sparklines>
        );
        const paths = container.querySelectorAll('path');
        // Should have multiple paths for segments (2 segments × 2 paths each = 4 paths minimum)
        expect(paths.length).toBeGreaterThanOrEqual(4);
    });

    it('renders nothing when data is empty', () => {
        const { container } = render(
            <Sparklines data={[]}>
                <SparklinesSteppedArea />
            </Sparklines>
        );
        const svg = container.querySelector('svg');
        expect(svg).toBeNull();
    });

    it('handles single data point', () => {
        const { container } = render(
            <Sparklines data={[5]}>
                <SparklinesSteppedArea />
            </Sparklines>
        );
        const paths = container.querySelectorAll('path');
        expect(paths.length).toBeGreaterThan(0);
    });

    it('renders with default fill opacity', () => {
        const { container } = render(
            <Sparklines data={sampleData}>
                <SparklinesSteppedArea />
            </Sparklines>
        );
        const areaPath = container.querySelector('path');
        const style = areaPath!.getAttribute('style');
        // Default fillOpacity should be 0.3
        expect(style).toContain('fill-opacity');
        expect(style).toContain('0.3');
    });

    it('renders with gradient fill opacity of 1', () => {
        const { container } = render(
            <Sparklines data={sampleData}>
                <SparklinesSteppedArea
                    gradient={{
                        topColor: '#ff0000',
                        bottomColor: '#0000ff'
                    }}
                />
            </Sparklines>
        );
        const areaPath = container.querySelector('path');
        const style = areaPath!.getAttribute('style');
        // With gradient, fillOpacity should be 1
        expect(style).toContain('fill-opacity');
        expect(style).toContain('1');
    });

    it('outline has vectorEffect non-scaling-stroke', () => {
        const { container } = render(
            <Sparklines data={sampleData}>
                <SparklinesSteppedArea />
            </Sparklines>
        );
        const paths = container.querySelectorAll('path');
        // Second path should be the outline
        const outlinePath = paths[1];
        const style = outlinePath.getAttribute('style');
        // vectorEffect is in the style attribute
        expect(style).toContain('vector-effect');
        expect(style).toContain('non-scaling-stroke');
    });

    it('baseline has correct styling', () => {
        const { container } = render(
            <Sparklines data={sampleData}>
                <SparklinesSteppedArea />
            </Sparklines>
        );
        const line = container.querySelector('line');
        const style = line!.getAttribute('style');
        expect(style).toContain('opacity');
        expect(style).toContain('0.4');
        expect(style).toContain('shape-rendering');
        expect(style).toContain('crispEdges');
    });
});
