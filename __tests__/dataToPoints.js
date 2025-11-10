import { describe, it, expect } from 'vitest';
import dataToPoints from '../src/dataProcessing/dataToPoints';

describe('dataToPoints', () => {

    it('should return an array', () => {
        expect(Array.isArray(dataToPoints({ data: [] }))).toBe(true);
        expect(Array.isArray(dataToPoints({ data: [1, 2, 3] }))).toBe(true);
        expect(Array.isArray(dataToPoints({ data: [1, null, undefined] }))).toBe(true);
    });

    it('should return only `limit` items', () => {
        expect(dataToPoints({ data: [1,2,3,4,5] })).toHaveLength(5);
        expect(dataToPoints({ data: [1,2,3,4,5], limit: 2 })).toHaveLength(2);
        expect(dataToPoints({ data: [1,2,3,4,5], limit: 5 })).toHaveLength(5);
        expect(dataToPoints({ data: [1,2,3,4,5], limit: 10 })).toHaveLength(5);
    });

    it('should return proper values for 1 value', () => {
        expect(dataToPoints({ data: [1] })).toEqual([
            {x: 0, y: 0.5, valid: true}
        ])
    });

    it('should return proper values 2+ values', () => {
        expect(dataToPoints({ data: [1,1] })).toEqual([
            {x: 0, y: 0.5, valid: true},
            {x: 1, y: 0.5, valid: true}
        ])

        expect(dataToPoints({ data: [0,1] })).toEqual([
            {x: 0, y: 1, valid: true},
            {x: 1, y: 0, valid: true}
        ])

        expect(dataToPoints({ data: [1,0] })).toEqual([
            {x: 0, y: 0, valid: true},
            {x: 1, y: 1, valid: true}
        ])

        expect(dataToPoints({ data: [0,1,2] })).toEqual([
            {x: 0, y: 1, valid: true},
            {x: 0.5, y: 0.5, valid: true},
            {x: 1, y: 0, valid: true}
        ])
    });

    it('should inerpolate values properly', () => {
        expect(dataToPoints({data: [0,1,2], width: 10, height: 10 })).toEqual([
            {x: 0, y: 10, valid: true},
            {x: 5, y: 5, valid: true},
            {x: 10, y: 0, valid: true}
        ])
    });

    it('should take min and max into account', () => {
        expect(dataToPoints({ data: [1,2,3,4], width: 6, height: 10, max: 2, min: 3 })).toEqual([
            {x: 0, y: -10, valid: true},
            {x: 2, y: 0, valid: true},
            {x: 4, y: 10, valid: true},
            {x: 6, y: 20, valid: true}
        ])
    });

    it('should return y == height for 0 and null values', () => {
        expect(dataToPoints({ data: [0] })).toEqual([
            {x: 0, y: 0.5, valid: true}
        ])
        expect(dataToPoints({ data: [0, null, 0] })).toEqual([
            {x: 0, y: 0.5, valid: true},
            {x: 0.5, y: null, valid: false},
            {x: 1, y: 0.5, valid: true}
        ])
    });

    it('should mark invalid values (NaN, Infinity, null, undefined) as invalid', () => {
        const result = dataToPoints({ data: [1, NaN, 2, Infinity, 3, null, 4, undefined, 5] });
        expect(result[0].valid).toBe(true);
        expect(result[1].valid).toBe(false);
        expect(result[2].valid).toBe(true);
        expect(result[3].valid).toBe(false);
        expect(result[4].valid).toBe(true);
        expect(result[5].valid).toBe(false);
        expect(result[6].valid).toBe(true);
        expect(result[7].valid).toBe(false);
        expect(result[8].valid).toBe(true);

        // Check that invalid values have null y
        expect(result[1].y).toBe(null);
        expect(result[3].y).toBe(null);
        expect(result[5].y).toBe(null);
        expect(result[7].y).toBe(null);

        // Check that valid values have proper y coordinates
        expect(typeof result[0].y).toBe('number');
        expect(typeof result[2].y).toBe('number');
        expect(typeof result[4].y).toBe('number');
        expect(typeof result[6].y).toBe('number');
        expect(typeof result[8].y).toBe('number');
    });
});
