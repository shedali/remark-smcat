const smcat = require('./index')
const test = require('ava');
const fs = require('fs');
const path = require('path');

// console.log('wbhat is ', smcat);
const unified = require('unified');
const createStream = require('unified-stream')
const remarkparse = require("remark-parse");
const remark2rehype = require('remark-rehype');
const html = require('rehype-stringify');

const processor = unified()
	.use(remarkparse, { gfm: true, commonmark: true, footnotes: true })
	.use(smcat)
	.use(remark2rehype)
	.use(html);

const convert: (m: string) => string = (markdown: string) => processor.processSync(markdown).contents
test("smcat should be a function", (t: any) => {
	t.is(typeof smcat, "function");
})

test('should render markdown to html', (t: any) => {
	t.is(convert("# hello"), "<h1>hello</h1>");
})

test.only('should render smcat to svg', (t: any) => {
	const file = String(fs.readFileSync('./fixtures/smcat.md'));
	t.truthy(convert(file).indexOf('svg') > -1);
})