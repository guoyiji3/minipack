const path = require('path');
module.exports = {
  entry:path.join(__dirname,'./src/index.js'),//入口文件
  output:{
    path:path.join(__dirname,'./dist'),//输出路径
    filename:'main.js'
  }
}