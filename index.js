const process = require('process');
const path = require('path');
const minimist = require('minimist');

// 获取命令行参数
const argv = minimist(process.argv.slice(2));
const cwd = process.cwd();

// 引入主方法
const scanFolderForES6Syntax = require('./scanFolder');
// 引入帮助说明方法
const scanHelper = require('./scanHelper');

if (argv.h || argv.help) {
    scanHelper();
} else {
    // 获取相对路径
    const relativePath = argv.p || argv.path || 'dist';
    // 拼接绝对路径
    const folderPath = path.join(cwd, relativePath);
    // 运行主方法
    scanFolderForES6Syntax(folderPath);
}

