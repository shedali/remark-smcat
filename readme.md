# remark-smcat [![Build Status](https://travis-ci.com/shedali/remark-smcat.svg?branch=master)](https://travis-ci.com/shedali/remark-smcat)

# Remark State Machine Cat

Simple remark plugin wrapper around state-machine-cat for rendering diagrams inline.

## Installation

`npm install remark-smcat`

## Usage

Plug in transforms remark ASTs as follows:

```javascript
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

```
​```smcat
initial,
backlog,
doing:
  entry/ create branch
  exit/ submit PR,
review:
  exit/ merge PR to develop,
QA,
done,
final;

initial -> backlog;
backlog -> doing: pull;

doing -> review: functionality built;

review -> doing: [code quality not ok];
review -> QA: [code quality ok];
review -> QA: [code has minor issues]/
  create tech debt item;

QA -> doing: [not acceptable];
QA -> done: [ok but issue(s) found]/
  create bug(s);
QA -> done: [okie dokie];

done -> final;
​```

```



turns into 

![example](/Users/franz/dev/remark-smcat/example.svg)



