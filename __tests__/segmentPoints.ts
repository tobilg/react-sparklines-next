import { describe, it, expect } from 'vitest';
import segmentPoints from '../src/dataProcessing/segmentPoints';

describe('segmentPoints', () => {
    it('should return a single segment for all valid points', () => {
        const points = [
            { x: 0, y: 0, valid: true },
            { x: 1, y: 1, valid: true },
            { x: 2, y: 2, valid: true }
        ];
        const segments = segmentPoints(points);

        expect(segments).toHaveLength(1);
        expect(segments[0]).toEqual(points);
    });

    it('should split into multiple segments when invalid points are present', () => {
        const points = [
            { x: 0, y: 0, valid: true },
            { x: 1, y: 1, valid: true },
            { x: 2, y: null, valid: false },
            { x: 3, y: 3, valid: true },
            { x: 4, y: 4, valid: true }
        ];
        const segments = segmentPoints(points);

        expect(segments).toHaveLength(2);
        expect(segments[0]).toHaveLength(2);
        expect(segments[1]).toHaveLength(2);
        expect(segments[0]).toEqual([points[0], points[1]]);
        expect(segments[1]).toEqual([points[3], points[4]]);
    });

    it('should handle multiple gaps', () => {
        const points = [
            { x: 0, y: 0, valid: true },
            { x: 1, y: null, valid: false },
            { x: 2, y: 2, valid: true },
            { x: 3, y: null, valid: false },
            { x: 4, y: 4, valid: true }
        ];
        const segments = segmentPoints(points);

        expect(segments).toHaveLength(3);
        expect(segments[0]).toEqual([points[0]]);
        expect(segments[1]).toEqual([points[2]]);
        expect(segments[2]).toEqual([points[4]]);
    });

    it('should return empty array for all invalid points', () => {
        const points = [
            { x: 0, y: null, valid: false },
            { x: 1, y: null, valid: false },
            { x: 2, y: null, valid: false }
        ];
        const segments = segmentPoints(points);

        expect(segments).toHaveLength(0);
    });

    it('should return empty array for empty input', () => {
        const segments = segmentPoints([]);

        expect(segments).toHaveLength(0);
    });

    it('should handle invalid points at the beginning', () => {
        const points = [
            { x: 0, y: null, valid: false },
            { x: 1, y: null, valid: false },
            { x: 2, y: 2, valid: true },
            { x: 3, y: 3, valid: true }
        ];
        const segments = segmentPoints(points);

        expect(segments).toHaveLength(1);
        expect(segments[0]).toEqual([points[2], points[3]]);
    });

    it('should handle invalid points at the end', () => {
        const points = [
            { x: 0, y: 0, valid: true },
            { x: 1, y: 1, valid: true },
            { x: 2, y: null, valid: false },
            { x: 3, y: null, valid: false }
        ];
        const segments = segmentPoints(points);

        expect(segments).toHaveLength(1);
        expect(segments[0]).toEqual([points[0], points[1]]);
    });

    it('should handle consecutive invalid points', () => {
        const points = [
            { x: 0, y: 0, valid: true },
            { x: 1, y: null, valid: false },
            { x: 2, y: null, valid: false },
            { x: 3, y: null, valid: false },
            { x: 4, y: 4, valid: true }
        ];
        const segments = segmentPoints(points);

        expect(segments).toHaveLength(2);
        expect(segments[0]).toEqual([points[0]]);
        expect(segments[1]).toEqual([points[4]]);
    });
});
