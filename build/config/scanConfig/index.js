"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkConstDeclaration(node) {
    // 检查常量声明（const）
    if (node.type === 'VariableDeclaration' && node.kind === 'const') {
        return true;
    }
}
function checkLetDeclaration(node) {
    // 检查块级作用域变量声明（let）
    if (node.type === 'VariableDeclaration' && node.kind === 'let') {
        return true;
    }
}
function checkArrowFunction(node) {
    // 检查箭头函数
    if (node.type === 'ArrowFunctionExpression') {
        return true;
    }
}
function checkTemplateLiteral(node) {
    // 检查模板字面量
    if (node.type === 'TemplateLiteral') {
        return true;
    }
}
function checkDestructuringAssignment(node) {
    // 检查解构赋值（数组和对象）
    if (node.type === 'ArrayPattern' || node.type === 'ObjectPattern') {
        return true;
    }
}
function checkDefaultParameters(node) {
    // 检查函数默认参数
    if (node.type === 'AssignmentPattern') {
        return true;
    }
}
function checkSpreadSyntax(node) {
    // 检查展开语法（Spread）
    if (node.type === 'SpreadElement') {
        return true;
    }
}
function checkIterator(node) {
    // 检查迭代器（Iterator）
    if (node.type === 'ForOfStatement') {
        return true;
    }
}
function checkPromise(node) {
    // 检查 Promise 对象
    if (node.type === 'NewExpression' &&
        node.callee &&
        node.callee.name === 'Promise') {
        return true;
    }
}
function checkClassDeclaration(node) {
    // 检查类定义
    if (node.type === 'ClassDeclaration') {
        return true;
    }
}
function checkModuleSyntax(node) {
    // 检查模块化语法（import 和 export）
    if (node.type === 'ImportDeclaration' ||
        node.type === 'ExportDeclaration' ||
        node.type === 'ExportNamedDeclaration' ||
        node.type === 'ExportDefaultDeclaration' ||
        node.type === 'ExportAllDeclaration') {
        return true;
    }
}
function checkGeneratorFunction(node) {
    // 检查生成器函数
    if (node.type === 'FunctionDeclaration' && node.generator) {
        return true;
    }
}
function checkAsyncAwait(node) {
    // 辅助方法：检查await关键字
    function hasAwaitKeyword(node) {
        if (!node.body)
            return false;
        if (node.body.type === 'AwaitExpression')
            return true;
        if (Array.isArray(node.body.body)) {
            return node.body.body.some(hasAwaitKeyword);
        }
        return false;
    }
    // 检查 async/await
    if ((node.type === 'FunctionDeclaration' && node.async) ||
        (node.type === 'FunctionExpression' && node.async) ||
        (node.type === 'ArrowFunctionExpression' && node.body.type === 'BlockStatement' && hasAwaitKeyword(node.body)) ||
        (node.type === 'ArrowFunctionExpression' && node.body.type !== 'BlockStatement' && node.body.async)) {
        return true;
    }
}
function checkComputedPropertyName(node) {
    // 检查可计算的属性名
    if (node.type === 'Property' && node.computed) {
        return true;
    }
}
function checkDynamicImport(node) {
    // 检查模块化的动态导入
    if (node.type === 'ImportExpression' ||
        (node.type === 'CallExpression' && node.callee && node.callee.name === 'import')) {
        return true;
    }
}
function checkDefaultExportSyntax(node) {
    // 检查默认导出语法
    if (node.type === 'ExportDefaultDeclaration') {
        return true;
    }
}
function checkOptionalChaining(node) {
    // 检查可选链操作符（Optional Chaining）
    if (node.type === 'ChainExpression') {
        return true;
    }
}
function checkNullishCoalescing(node) {
    // 检查空值合并操作符（Nullish Coalescing）
    if (node.type === 'BinaryExpression' && node.operator === '??') {
        return true;
    }
}
function checkPrivateFieldSyntax(node) {
    // 检查类的私有字段语法
    if (node.type === 'ClassProperty' && node.key &&
        node.key.name && node.key.name.startsWith('#')) {
        return true;
    }
}
function checkBigIntDataType(node) {
    // 检查BigInt数据类型
    if (node.type === 'Literal' && typeof node.value === 'bigint') {
        return true;
    }
}
function checkNumericSeparator(node) {
    // 检查数值分隔符
    if (node.type === 'Literal' && node.raw && node.raw.includes('_')) {
        return true;
    }
}
function checkStaticClassMethod(node) {
    // 检查静态类方法
    if (node.type === 'MethodDefinition' && node.static) {
        return true;
    }
}
function checkPromiseAllSettled(node) {
    // 检查Promise.allSettled(node)
    if (node.type === 'CallExpression' &&
        node.callee &&
        node.callee.property &&
        node.callee.property.name === 'allSettled') {
        return true;
    }
}
function checkArrayFlatAndFlatMap(node) {
    // 检查数组的 flat(node)、flatMap(node) 方法
    if (node.type === 'CallExpression' &&
        node.callee && // 确保 callee 属性存在
        node.callee.property && // 确保 property 属性存在
        (node.callee.property.name === 'flat' || node.callee.property.name === 'flatMap')) {
        return true;
    }
}
function checkTaggedTemplateExpression(node) {
    // 检查字符串模板标签函数
    if (node.type === 'TaggedTemplateExpression') {
        return true;
    }
}
function checkObjectPropertyShorthand(node) {
    // 检查对象属性的简写语法
    if (node.type === 'Property' && node.shorthand) {
        return true;
    }
}
function checkObjectComputedPropertyName(node) {
    // 检查对象属性的计算属性名
    if (node.type === 'Property' && node.computed) {
        return true;
    }
}
function checkRestParameters(node) {
    // 检查剩余参数（Rest parameters）
    if (node.type === 'RestElement') {
        return true;
    }
}
function checkDefaultExportNamespaceImport(node) {
    // 检查默认导出的命名空间导入
    if (node.type === 'ImportSpecifier' &&
        node.imported &&
        node.imported.name === 'default' &&
        node.local &&
        node.local.name !== 'default') {
        return true;
    }
}
function checkTailCallOptimization(node) {
    // 检查尾调用优化
    if (node.type === 'CallExpression' && node.arguments.length > 0) {
        const lastArgument = node.arguments[node.arguments.length - 1];
        if (lastArgument.type === 'SpreadElement' ||
            lastArgument.type === 'FunctionExpression' ||
            lastArgument.type === 'ArrowFunctionExpression') {
            return true;
        }
    }
}
function checkDefaultValueInArrayDestructuring(node) {
    // 检查数组解构赋值的默认值
    if (node.type === 'AssignmentPattern' &&
        node.left &&
        node.left.type === 'ArrayPattern' &&
        node.left.elements &&
        node.left.elements.some(element => element.type === 'AssignmentPattern')) {
        return true;
    }
}
function checkStaticClassMembers(node) {
    // 检查类的静态成员
    if ((node.type === 'ClassProperty' && node.static) ||
        (node.type === 'MethodDefinition' && node.static)) {
        return true;
    }
}
function checkIterableObject(node) {
    // 检查可迭代对象（Iterable）
    if (node.type === 'ForOfStatement') {
        return true;
    }
}
function checkNestedDestructuringAssignment(node) {
    // 检查解构赋值的嵌套结构
    if (node.type === 'ArrayPattern' || node.type === 'ObjectPattern') {
        if (node.elements && node.elements.some(element => element.type === 'ArrayPattern' || element.type === 'ObjectPattern')) {
            return true;
        }
    }
}
function checkClassExtensionAndInheritanceSyntax(node) {
    // 检查类的扩展和继承语法
    if (node.type === 'ClassDeclaration' ||
        node.type === 'ClassExpression' ||
        (node.type === 'CallExpression' && node.callee && node.callee.name === 'extends')) {
        return true;
    }
}
function checkObjectLiteralShorthandSyntax(node) {
    // 检查对象字面量的简写语法
    if (node.type === 'ObjectExpression' && !node.properties.some(prop => prop.computed)) {
        return true;
    }
}
function checkSetAndMapDataStructureSyntax(node) {
    // 检查 Set 和 Map 数据结构语法
    if (node.type === 'NewExpression' &&
        node.callee &&
        (node.callee.name === 'Set' || node.callee.name === 'Map')) {
        return true;
    }
}
function checkIterableProtocol(node) {
    // 检查可迭代协议（Iterable Protocol）
    if (node.type === 'ForOfStatement' ||
        (node.type === 'CallExpression' && node.callee && node.callee.name === 'Symbol.iterator')) {
        return true;
    }
}
function checkPrivateFieldsSyntax(node) {
    // 检查类的私有字段（Private Fields）语法
    if (node.type === 'PrivateIdentifier') {
        return true;
    }
}
function checkDecoratorSyntax(node) {
    // 检查装饰器语法
    if (node.type === 'Decorator') {
        return true;
    }
}
const checkES6 = [
    checkConstDeclaration,
    checkLetDeclaration,
    checkArrowFunction,
    checkTemplateLiteral,
    checkDestructuringAssignment,
    checkDefaultParameters,
    checkSpreadSyntax,
    checkIterator,
    checkPromise,
    checkClassDeclaration,
    checkModuleSyntax,
    checkGeneratorFunction,
    checkAsyncAwait,
    checkComputedPropertyName,
    checkDynamicImport,
    checkDefaultExportSyntax,
    checkOptionalChaining,
    checkNullishCoalescing,
    checkPrivateFieldSyntax,
    checkBigIntDataType,
    checkNumericSeparator,
    checkStaticClassMethod,
    checkPromiseAllSettled,
    checkArrayFlatAndFlatMap,
    checkTaggedTemplateExpression,
    checkObjectPropertyShorthand,
    checkObjectComputedPropertyName,
    checkRestParameters,
    checkDefaultExportNamespaceImport,
    checkTailCallOptimization,
    checkDefaultValueInArrayDestructuring,
    checkStaticClassMembers,
    checkIterableObject,
    checkNestedDestructuringAssignment,
    checkClassExtensionAndInheritanceSyntax,
    checkObjectLiteralShorthandSyntax,
    checkSetAndMapDataStructureSyntax,
    checkIterableProtocol,
    checkPrivateFieldsSyntax,
    checkDecoratorSyntax
];
function scanConfig(node) {
    return checkES6.some(func => func(node));
}
exports.default = scanConfig;
