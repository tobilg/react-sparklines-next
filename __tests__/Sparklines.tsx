import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Sparklines } from '../src/Sparklines';

describe('Sparklines', () => {
    it('does not throw without any parameters', () => {
        expect(() => render(<Sparklines />)).not.toThrow();
    });

    it('renders nothing when passed no data', () => {
        const { container } = render(<Sparklines />);
        const svg = container.querySelector('svg');
        expect(svg).toBeNull();
    });

    it('is rendered as svg', () => {
        const { container } = render(<Sparklines data={[1]} />);
        const svg = container.querySelector('svg');
        expect(svg).not.toBeNull();
        expect(svg.tagName).toBe('svg');
    });

    it('renders with correct viewBox dimensions', () => {
        const { container } = render(<Sparklines data={[1, 2, 3]} width={100} height={50} />);
        const svg = container.querySelector('svg');
        expect(svg.getAttribute('viewBox')).toBe('0 0 100 50');
    });

    it('renders with default dimensions when not specified', () => {
        const { container } = render(<Sparklines data={[1, 2, 3]} />);
        const svg = container.querySelector('svg');
        expect(svg.getAttribute('viewBox')).toBe('0 0 240 60');
    });
});
