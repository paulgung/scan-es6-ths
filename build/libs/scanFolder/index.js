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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const scanCode_1 = __importDefault(require("../scanCode"));
// 扫描文件夹中的所有 JavaScript 文件并检查是否包含 ES6 语法
function scanFolder(folderPath) {
    // 鲁棒性检查，处理dist文件夹不存在的情况
    let files = null;
    try {
        // 如果没有读到dist文件夹则提示用户并返回
        files = fs.readdirSync(folderPath, 'utf-8');
    }
    catch (e) {
        console.log("没有读到dist文件夹，如果想指定目录，请使用--path，详细请运行命令:");
        console.log("es6-check --help");
        return;
    }
    // 遍历读到的文件/文件夹
    for (const file of files) {
        const filePath = path.join(folderPath, file);
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            // 递归扫描子文件夹
            scanFolder(filePath);
        }
        else if (stats.isFile() && file.endsWith('.js')) {
            try {
                // 扫描单文件代码
                const code = fs.readFileSync(filePath, 'utf-8');
                // ES6特性检查
                const hasES6 = (0, scanCode_1.default)(code);
                if (hasES6) {
                    console.log(`文件 ${filePath} 中包含 ES6 语法`);
                }
                else {
                    console.log(`文件 ${filePath} 不包含 ES6 语法`);
                }
                // return hasES6
            }
            catch (error) {
                console.error(`读取文件 ${filePath} 失败：${error}`);
            }
        }
    }
}
exports.default = scanFolder;
