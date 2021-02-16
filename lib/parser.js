// 解析AST语法树
const fs = require('fs');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const { transformFromAst } = require('babel-core');

module.exports = {
  //1.将代码转为ast
  getAST:(path)=>{
    const source = fs.readFileSync(path,'utf-8')
    return babylon.parse(source,{
      sourceType:'module'
    })
  },
  //2.分析依赖
  getDependencis: (ast) => {
        const dependencies = []
        traverse(ast, {
          ImportDeclaration: ({ node }) => {
            dependencies.push(node.source.value);
          }
        });
        return dependencies;
  },
  //3.转为es5
  transform: (ast) => {
    const { code } = transformFromAst(ast, null, {
        presets: ['env']
    });
  
    return code;
  }
}