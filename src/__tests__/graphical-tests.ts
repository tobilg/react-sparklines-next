import fixtures from './fixtures';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, it, expect } from 'vitest';
import compareSvg from './compareSvg';

describe.skip('Graphical tests from fixtures.tsx', function() {
    for (const key of Object.keys(fixtures)) {
        describe(`${key}`, function() {
            it('should render as specified', function() {
                const html = renderToStaticMarkup(fixtures[key].jsx);
                const result = compareSvg(html, fixtures[key].svg);
                if (result.changes.length > 0) {
                    const errorMessage = 'SVG output changed:\n' + result.changes.map((change: any) => change.message).join('\n') + '\n';
                    throw new Error(errorMessage);
                }
                expect(result.changes.length).toBe(0);
            });
        });
    }
});

