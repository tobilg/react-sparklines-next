import { getDiffableHTML } from '@open-wc/semantic-dom-diff';

export interface ComparisonResult {
	different: boolean;
	changes: Array<{ message: string }>;
	before: string;
	after: string;
}

export interface ComparisonOptions {
	ignoreAttributes?: string[];
	ignoreTags?: string[];
	ignoreChildren?: string[];
}

/**
 * Compares two SVG strings semantically, ignoring whitespace, attribute order, etc.
 * Returns a result object similar to hiff's API for compatibility.
 */
export default function compareSvg(
	svg1: string,
	svg2: string,
	options: ComparisonOptions = {}
): ComparisonResult {
	// Normalize both SVGs using semantic-dom-diff
	const normalized1 = getDiffableHTML(svg1, options);
	const normalized2 = getDiffableHTML(svg2, options);

	const different = normalized1 !== normalized2;

	// If different, create a simple change message
	const changes: Array<{ message: string }> = [];
	if (different) {
		changes.push({
			message: 'SVG output differs semantically. Normalized versions do not match.'
		});
	}

	return {
		different,
		changes,
		before: normalized1,
		after: normalized2
	};
}
