'use strict';

const smcat = require('state-machine-cat');
const visit = require('unist-util-visit');

module.exports = (input, { postfix = 'rainbows' } = {}) => {
  if (typeof input !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof input}`);
  }

  return `${input} & ${postfix}`;
};

const walk = dir => { }

const render = (source, engine) => { }

const visitCodeBlock = (ast) => {
  return visit(ast, 'code', (node, index, parent) => {
    const { lang, value } = node;
    if (['smcat'].includes(lang)) {
      let statemachine;
      try {
        statemachine = smcat.render(`${value}`, {
          outputType: 'svg'
        });
      } catch (error) {
        console.error(error);
      }

      parent.children.splice(index, 1, {
        type: 'html',
        value: statemachine
      });
      return node;
    }
    return node;
  })
}

export default () => {
  return function transformer(ast, vFile, next) {
    visitCodeBlock(ast);

    if (typeof next === 'function') {
      return next(null, ast, vFile);
    }

    return ast;
  }
}

const parser = (thing) => { }

