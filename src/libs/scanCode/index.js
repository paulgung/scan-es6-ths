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
const estraverse = __importStar(require("estraverse"));
const acorn = __importStar(require("acorn"));
const scanConfig_1 = __importDefault(require("../../config/scanConfig"));
function scanCode(code) {
    // 是否包含ES6代码
    let hasES6 = false;
    // 通过acorn转换语法树
    const syntaxTree = acorn.parse(code, { ecmaVersion: 'latest' });
    // 通过estraverse遍历AST语法树
    estraverse.traverse(syntaxTree, {
        enter: (node) => {
            // 遍历每个语法树节点，如果出现ES6语法，标记为true
            if ((0, scanConfig_1.default)(node)) {
                hasES6 = true;
                return estraverse.VisitorOption.Break;
            }
        }
    });
    return hasES6;
}
exports.default = scanCode;
