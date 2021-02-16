(function(modules) {
            function require(fileName) {
                var fn = modules[fileName];

                var module = { exports : {} };

                fn(require, module, module.exports);

                return module.exports;
            }

            require('D:\minipack\src\index.js');
        })({'D:\minipack\src\index.js': function (require, module, exports) { "use strict";

var _greeting = require("./greeting.js");

document.write((0, _greeting.greeting)('jane')); },'./greeting.js': function (require, module, exports) { "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.greeting = greeting;
function greeting(name) {
  return 'hello' + name;
} },})
    