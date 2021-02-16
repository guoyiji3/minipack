(function(modules) {
            function require(fileName) {
                var fn = modules[fileName];

                var module = { exports : {} };

                fn(require, module, module.exports);

                return module.exports;
            }

            require('D:\minipack\src\index.js');
        })({'D:\minipack\src\index.js': function (require, module, exports) { "use strict";

var _hello = require("./hello.js");

document.write((0, _hello.hello)('jane')); },'./hello.js': function (require, module, exports) { "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hello = hello;
function hello(name) {
  return 'hello' + name;
} },})
    