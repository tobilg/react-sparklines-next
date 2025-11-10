import { describe, it, expect } from 'vitest';
import mean from '../dataProcessing/mean';

describe('mean', () => {
    it('should return average of values', () => {
        expect(mean([0])).toBe(0)
        expect(mean([0, 1])).toBe(0.5)
        expect(mean([1, 2])).toBe(3/2)
        expect(mean([0, 1, 2])).toBe(1)
    });
});
