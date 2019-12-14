'use strict';
const visit = require('unist-util-visit');
const utils = require('./utils');
const render = utils.render;
const getDestinationDir = utils.getDestinationDir;
const visitCodeBlock = (ast: any, vFile: any) => {
  return visit(ast, 'code', (node: any, index: any, parent: any) => {
    const { lang, value, position } = node;
     const destinationDir = getDestinationDir(vFile);
    if (['smcat'].includes(lang)) {
      let graphSvgFilename;
      try {
        graphSvgFilename = render(destinationDir, value, lang);

        vFile.info(`${lang} code block replaced with graph`, position, 'remark-smcat');

      } catch (error) {
        console.error(error);
        vFile.message(error, position, 'remark-smcat');
        return node;
      }

      const image = {
      type: 'image',
      title: '`smcat` image',
      url: graphSvgFilename,
    };

      // parent.children.splice(index, 1, {
      //   type: 'image',
      //   title: '`smcat` image',
      //   value: statemachine
      // });
      parent.children.splice(index, 1, image);
      return node;
    }
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

module.exports = smcatParser;
