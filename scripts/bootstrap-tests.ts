// bootstrap-tests.ts - A tool for updating the test cases in src/__tests__/fixtures.tsx
//
// 1) Reads src/__tests__/fixtures.tsx and looks for a "dynamic part", which should be a list of fields
//    belonging to that file's default export, enclosed in a pair of markers (see "signal" constants
//	  below).
// 2) Imports the same fixtures file and (re-)renders each ReactElement to a static SVG string.
// 3) On success, overwrites src/__tests__/fixtures.tsx with an updated copy.
//
// Run with: npx tsx bootstrap-tests.ts

import path from 'path';
import { fileURLToPath } from 'url';
import { renderToStaticMarkup } from 'react-dom/server';
import LineByLineReader from 'line-by-line';
// @ts-ignore - react-element-to-jsx-string is CommonJS
import reactElementToJsxModule from 'react-element-to-jsx-string';
const reactElementToJsx = (reactElementToJsxModule as any).default?.default || (reactElementToJsxModule as any).default || reactElementToJsxModule;
import { writeFileSync } from 'fs';
import replaceAll from 'replaceall';
import React from 'react';
import { sampleData, sampleData100 } from '../src/__tests__/sampleData';
import fixtures from '../src/__tests__/fixtures';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fixturesFile = path.resolve(__dirname, '../src/__tests__/fixtures.tsx');
const dynamicPartStartSignal = '// AUTO-GENERATED PART STARTS HERE';
const dynamicPartEndSignal = '// AUTO-GENERATED PART ENDS HERE';

// Handle recurring data constants
const recognizedDataConstants: Record<string, number[]> = {
	sampleData, 
	sampleData100
};
const recognizedDataStrings: Record<string, string> = {};

function markupToOneLine(code: string): string {
	return code.replace(/\s*[\r\n]\s*/g, ' ').replace(/\s+/g, ' ').replace(/\s*([<>])\s*/g, '$1');
}

for (const dataKey of Object.keys(recognizedDataConstants)) {
	recognizedDataStrings[dataKey] = markupToOneLine(
		reactElementToJsx(React.createElement('div', { 'data-value': recognizedDataConstants[dataKey] }))
			.replace(/[^{]*\{|\}[^}]*/g, '')
	);
}

// Output control
let outData = '';
const write = (content: string) => { outData += content + '\n'; };
const save = () => writeFileSync(fixturesFile, outData);

function writeFixtures(): void {
	for (const key of Object.keys(fixtures)) {
		const jsx = fixtures[key].jsx;
		// Use renderToStaticMarkup instead of enzyme for server-side rendering
		const htmlCode = JSON.stringify(renderToStaticMarkup(jsx));
		let jsxCode = `(${markupToOneLine(reactElementToJsx(jsx))})`;
		for (const dataKey of Object.keys(recognizedDataStrings)) {
			jsxCode = replaceAll(recognizedDataStrings[dataKey], dataKey, jsxCode);
		}
		write(`\t${JSON.stringify(key)}: {jsx: ${jsxCode}, svg: ${htmlCode}},`);
	}
}

// Input control
const lr = new LineByLineReader(fixturesFile, { skipEmptyLines: false });
let inDynamicPart = false;
let dynamicPartCount = 0;
let lineCount = 0;

class LineError extends Error {
	constructor(message: string | Error) {
		const messageStr = message instanceof Error ? message.message : message;
		super(`${fixturesFile}:${lineCount}: ${messageStr}`);
		if (message instanceof Error && message.stack) {
			this.stack = message.stack;
		}
	}
}

lr.on('line', (line: string) => {
	++lineCount;
	if (line === dynamicPartStartSignal) {
		if (inDynamicPart) {
			throw new LineError('Dynamic part opened again');
		}
		++dynamicPartCount;
		if (dynamicPartCount > 1) {
			throw new LineError('Multiple dynamic parts found');
		}
		inDynamicPart = true;
		write(line);
		try {
			writeFixtures();
		} catch (e) {
			throw new LineError(e as Error);
		}
	} else if (line === dynamicPartEndSignal) {
		if (!inDynamicPart) {
			throw new LineError('Dynamic part closed again');
		}
		inDynamicPart = false;
		write(line);
	} else if (!inDynamicPart) {
		write(line);
	}
});

lr.on('end', () => {
	if (inDynamicPart) {
		throw new LineError('Dynamic part not closed');
	}
	if (dynamicPartCount === 0) {
		throw new LineError('No dynamic part found in file!');
	}
	save();
});

lr.on('error', (err: Error) => {
	throw new LineError(err);
});

