const { getAST, getDependencis, transform } = require('./parser');
const path = require('path');
const ast = getAST(path.join(__dirname,'../src/index.js'));
const dependencies = getDependencis(ast);
const source = transform(ast);
console.log(source);