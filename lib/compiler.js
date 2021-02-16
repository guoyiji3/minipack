
const fs = require('fs');
const path = require('path');
const { getAST, getDependencis, transform } = require('./parser');


module.exports = class Compiler {
  constructor(options) {//接收webpack配置文件
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
    this.modules = [];
  }
  //运行构建
  run () {
    const entryModule = this.buildModule(this.entry, true);
    this.modules.push(entryModule);
    this.modules.map((_module) => {
      _module.dependencies.map((dependency) => {
        this.modules.push(this.buildModule(dependency));
      });
    });
    this.emitFiles();
  }
  //构建ast模块
  buildModule (filename, isEntry) {
    let ast;
    if (isEntry) {
      ast = getAST(filename);
    } else {
      const absolutePath = path.join(process.cwd(), './src', filename);
      ast = getAST(absolutePath);
    }

    return {
      filename,
      dependencies: getDependencis(ast),
      transformCode: transform(ast)
    };
  }
  //输出文件
  emitFiles () {
    const outputPath = path.join(this.output.path, this.output.filename);
    let modules = '';
    this.modules.map((_module) => {
      modules += `'${_module.filename}': function (require, module, exports) { ${_module.transformCode} },`
    });

    const bundle = `(function(modules) {
            function require(fileName) {
                var fn = modules[fileName];

                var module = { exports : {} };

                fn(require, module, module.exports);

                return module.exports;
            }

            require('${this.entry}');
        })({${modules}})
    `;

    fs.writeFileSync(outputPath, bundle, 'utf-8');
  }
};
