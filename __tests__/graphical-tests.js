import fixtures from './fixtures';
import { renderToStaticMarkup } from 'react-dom/server';
import { expect } from 'chai';
import compareSvg from './compareSvg';

describe.skip('Graphical tests from fixtures.js', function() {
    for (let key of Object.keys(fixtures)) {
        describe(`${key}`, function() {
            it('should render as specified', function() {
                const html = renderToStaticMarkup(fixtures[key].jsx);
                const result = compareSvg(html, fixtures[key].svg);
                const errorMessage = 'SVG output changed:\n' + result.changes.map(change => change.message).join('\n') + '\n';
                expect(result.changes, errorMessage).to.be.empty;
            });
        });
    }
});
