'use strict';

const smcat = require('state-machine-cat');
const visit = require('unist-util-visit');

const visitCodeBlock = (ast: any, vFile: any) => {
  return visit(ast, 'code', (node: any, index: any, parent: any) => {
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
  return function transformer(ast: any, vFile: any, next: any) {
    visitCodeBlock(ast, vFile);

    if (typeof next === 'function') {
      return next(null, ast, vFile);
    }

    return ast;
  }
}

