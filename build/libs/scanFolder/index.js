"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const glob_1 = require("glob");
const acorn = __importStar(require("acorn"));
// 遍历读到的js文件
const traverseFiles = (jsfiles) => {
    // 错误栈
    const errArray = [];
    // 扫描结果
    let result = false;
    // jsfiles是文件名的字符串数组
    for (const fileName of jsfiles) {
        // 获取代码字符串
        const code = fs.readFileSync(fileName, 'utf-8');
        try {
            // 如果不符合ES5则会转化报错
            acorn.parse(code, { sourceType: 'script', ecmaVersion: 5 });
        }
        catch (error) {
            // 提取第一个换行符之前的错误信息
            const errorInfo = error.stack.split('\n')[0];
            const errorObj = {
                errorInfo,
                fileName,
            };
            errArray.push(errorObj);
            // ES6特性检查，只要有一个文件包含es6语法，则返回true
            result = true;
        }
    }
    return { result, errArray };
};
// 扫描文件夹中的所有 JavaScript 文件并检查是否包含 ES6 语法
const scanFolder = (folderPath) => {
    // 使用glob获取所有.js结尾的文件
    const jsfiles = (0, glob_1.globSync)(path.join(folderPath, '**/*.js'));
    return traverseFiles(jsfiles);
};
exports.default = scanFolder;
