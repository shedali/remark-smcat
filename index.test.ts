import remarkSmcat from '.';
import test from 'ava';
const unified = require('unified');
const createStream = require('unified-stream')
const remarkparse = require("remark-parse");
const remark2rehype = require('remark-rehype');
const html = require('rehype-stringify');
const processor = unified()
	.use(remarkSmcat)
	.use(remarkparse)
	.use(remark2rehype)
	.use(html);

const convert: (m: string) => string = (markdown: string) => processor.processSync(markdown).contents

const testString = "\n ```smcat \n initial =>\"on backlog\":item adds most value;\n```";

test('should parse smcat and render svg', t => {
	t.is(convert(testString), "");
});
