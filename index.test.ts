const createStream = require('unified-stream')
const fss = require('fs');
const glob = require('glob-promise');
const html = require('rehype-stringify');
const parser = require('./index');
const pixelmatch = require('pixelmatch');


const pth = require('path');
const remark2rehype = require('remark-rehype');
const remarkparse = require("remark-parse");
const sharp = require('sharp');
const test = require('ava');
const unified = require('unified');

const PNG = require('pngjs').PNG;

const processor = unified()
	.use(remarkparse, { gfm: true, commonmark: true, footnotes: true })
	.use(parser)
	.use(remark2rehype)
	.use(html);

const convert: (m: string) => string = (markdown: string) => processor.processSync(markdown).contents

test("smcat should be a function", (t: any) => {
	t.is(typeof parser, "function");
})

test('should render markdown to html', (t: any) => {
	t.is(convert("# hello"), "<h1>hello</h1>");
})


test.serial('should convert svg to png', async (t: any) => {
	const baseline = await PNG.sync.read(fss.readFileSync('baseline.png'));
	
	const { width, height } = baseline;
	
	const file = String(fss.readFileSync(pth.join(__dirname, 'fixtures/smcat.md')));

	const svg_files = await glob('*.svg');
	const svg = svg_files.pop()
	await sharp(svg).toFile('svg-output.png');
	
	const svgoutput = await PNG.sync.read(fss.readFileSync('svg-output.png'));

	//check for visual diffs with baseline.png
	const diff = new PNG({ width, height });
	const difference = await pixelmatch(baseline.data, svgoutput.data, diff.data, width, height, { threshold: 0.1 });
	console.log('difference is ', difference);
	
	t.truthy(convert(file).indexOf('svg') > -1);
	t.truthy(fss.readFileSync('svg-output.png'))
	t.is(difference, 0);
})