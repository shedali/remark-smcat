'use strict';

const smcat = require('state-machine-cat');
const visit = require('unist-util-visit');

const visitCodeBlock = (ast, vFile) => {
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
        type: 'svg',
        value: statemachine
      });
      return node;
    }
    return node;
  })
}

export const smcatParser = () => {
  return function transformer(ast, vFile, next) {
    visitCodeBlock(ast, vFile);

    if (typeof next === 'function') {
      return next(null, ast, vFile);
    }

    return ast;
  }
}

