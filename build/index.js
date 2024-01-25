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
const process = __importStar(require("process"));
const path = __importStar(require("path"));
const minimist_1 = __importDefault(require("minimist")); // 导入处理命令行参数方法
const scanFolder_1 = __importDefault(require("./libs/scanFolder")); // 导入主方法
const scanHelper_1 = __importDefault(require("./libs/scanHelper")); // 导入帮助方法
function main() {
    // 获取命令行参数
    const argv = (0, minimist_1.default)(process.argv.slice(2));
    // 获取目录路径
    const cwd = process.cwd();
    // 用户输入-h或-help时
    if (argv.h || argv.help) {
        (0, scanHelper_1.default)();
    }
    else {
        // 获取相对路径
        const relativePath = argv.p || argv.path || "dist";
        // 拼接绝对路径
        const folderPath = path.join(cwd, relativePath);
        // 运行主方法
        const { result, errArray } = (0, scanFolder_1.default)(folderPath);
        console.log("ES6 check result:", result);
        console.log("ES6 check detail:", errArray);
    }
}
try {
    main();
}
catch (error) {
    console.error("An error occurred in es6-check plugin:", error);
}
