# remark-smcat [![Build Status](https://travis-ci.com/shedali/remark-smcat.svg?branch=master)](https://travis-ci.com/shedali/remark-smcat)

> state machine cat remark plugin


## Install

```
$ npm install remark-smcat
```


## Usage

```js
const remarkSmcat = require('remark-smcat');

remarkSmcat('unicorns');
//=> 'unicorns & rainbows'
```


## API

### remarkSmcat(input, options?)

#### input

Type: `string`# Remark State Machine Cat

Plugin parses State Machine Cat code blocks to SVG.

## Usage

Plug in transforms remark ASTs as follows:

```
const unified = require('unified')
const createStream = require('unified-stream')
const remarkparse = require("remark-parse");
const remark2rehype = require('remark-rehype');
const smcat = require('remark-smcat');
const html = require('rehype-stringify');

const processor = unified()
	.use(remarkparse, { gfm: true, commonmark: true, footnotes: true })
	.use(smcat)
	.use(remark2rehype)
	.use(html);

process.stdin.pipe(createStream(processor)).pipe(process.stdout);

```
