const estraverse = require('estraverse');
const acorn = require('acorn');

function hasES6Syntax(code) {
    // 是否包含ES6代码
    let hasES6 = false;

    // 通过acorn转换语法树
    const syntaxTree = acorn.parse(code, { ecmaVersion: 'latest' });

    // 通过estraverse遍历语法树
    estraverse.traverse(syntaxTree, {
        enter: function(node) {

            // 检查常量声明（const）
            if (node.type === 'VariableDeclaration' && node.kind === 'const') {
                hasES6 = true;
            }

            // 检查块级作用域变量声明（let）
            if (node.type === 'VariableDeclaration' && node.kind === 'let') {
                hasES6 = true;
            }

            // 检查箭头函数
            if (node.type === 'ArrowFunctionExpression') {
                hasES6 = true;
            }

            // 检查模板字面量
            if (node.type === 'TemplateLiteral') {
                hasES6 = true;
            }

            // 检查解构赋值（数组和对象）
            if (node.type === 'ArrayPattern' || node.type === 'ObjectPattern') {
                hasES6 = true;
            }

            // 检查函数默认参数
            if (node.type === 'AssignmentPattern') {
                hasES6 = true;
            }

            // 检查展开语法（Spread）
            if (node.type === 'SpreadElement') {
                hasES6 = true;
            }

            // 检查迭代器（Iterator）
            if (node.type === 'ForOfStatement') {
                hasES6 = true;
            }

            // 检查 Promise 对象
            if (node.type === 'NewExpression' &&
                node.callee &&
                node.callee.name === 'Promise') {
                hasES6 = true;
            }

            // 检查类定义
            if (node.type === 'ClassDeclaration') {
                hasES6 = true;
            }

            // 检查模块化语法（import 和 export）
            if (
                node.type === 'ImportDeclaration' ||
                node.type === 'ExportDeclaration' ||
                node.type === 'ExportNamedDeclaration' ||
                node.type === 'ExportDefaultDeclaration' ||
                node.type === 'ExportAllDeclaration'
            ) {
                hasES6 = true;
            }

            // 检查生成器函数
            if (node.type === 'FunctionDeclaration' && node.generator) {
                hasES6 = true;
            }

            // 检查 async/await
            if ((node.type === 'FunctionDeclaration' && node.async) ||
                (node.type === 'FunctionExpression' && node.async) ||
                (node.type === 'ArrowFunctionExpression' && node.body.type === 'BlockStatement' && hasAwaitKeyword(node.body)) ||
                (node.type === 'ArrowFunctionExpression' && node.body.type !== 'BlockStatement' && node.body.async)
            ) {
                hasES6 = true;
            }

            // 检查可计算的属性名
            if (node.type === 'Property' && node.computed) {
                hasES6 = true;
            }

            // 检查模块化的动态导入
            if (node.type === 'ImportExpression' ||
                (node.type === 'CallExpression' && node.callee && node.callee.name === 'import')
            ) {
                hasES6 = true;
            }

            // 检查默认导出语法
            if (node.type === 'ExportDefaultDeclaration') {
                hasES6 = true;
            }

            // 检查可选链操作符（Optional Chaining）
            if (node.type === 'ChainExpression') {
                hasES6 = true;
            }

            // 检查空值合并操作符（Nullish Coalescing）
            if (node.type === 'BinaryExpression' && node.operator === '??') {
                hasES6 = true;
            }

            // 检查类的私有字段语法
            if (node.type === 'ClassProperty' && node.key &&
                node.key.name && node.key.name.startsWith('#')) {
                hasES6 = true;
            }

            // 检查BigInt数据类型
            if (node.type === 'Literal' && typeof node.value === 'bigint') {
                hasES6 = true;
            }

            // 检查数值分隔符
            if (node.type === 'Literal' && node.raw &&node.raw.includes('_')) {
                hasES6 = true;
            }

            // 检查静态类方法
            if (node.type === 'MethodDefinition' && node.static) {
                hasES6 = true;
            }

            // 检查Promise.allSettled()
            if (
                node.type === 'CallExpression' &&
                node.callee &&
                node.callee.property &&
                node.callee.property.name === 'allSettled'
            ) {
                hasES6 = true;
            }

            // 检查数组的 flat()、flatMap() 方法
            if (
                node.type === 'CallExpression' &&
                node.callee && // 确保 callee 属性存在
                node.callee.property && // 确保 property 属性存在
                (node.callee.property.name === 'flat' || node.callee.property.name === 'flatMap')
            ) {
                hasES6 = true;
            }

            // 检查字符串模板标签函数
            if (node.type === 'TaggedTemplateExpression') {
                hasES6 = true;
            }

            // 检查对象属性的简写语法
            if (node.type === 'Property' && node.shorthand) {
                hasES6 = true;
            }

            // 检查对象属性的计算属性名
            if (node.type === 'Property' && node.computed) {
                hasES6 = true;
            }

            // 检查剩余参数（Rest parameters）
            if (node.type === 'RestElement') {
                hasES6 = true;
            }

            // 检查默认导出的命名空间导入
            if (
                node.type === 'ImportSpecifier' &&
                node.imported &&
                node.imported.name === 'default' &&
                node.local &&
                node.local.name !== 'default'
            ) {
                hasES6 = true;
            }

            // 检查尾调用优化
            if (node.type === 'CallExpression' && node.arguments.length > 0) {
                const lastArgument = node.arguments[node.arguments.length - 1];
                if (
                    lastArgument.type === 'SpreadElement' ||
                    lastArgument.type === 'FunctionExpression' ||
                    lastArgument.type === 'ArrowFunctionExpression'
                ) {
                    hasES6 = true;
                }
            }

            // 检查数组解构赋值的默认值
            if (
                node.type === 'AssignmentPattern' &&
                node.left &&
                node.left.type === 'ArrayPattern' &&
                node.left.elements &&
                node.left.elements.some(element => element.type === 'AssignmentPattern')
            ) {
                hasES6 = true;
            }

            // 检查类的静态成员
            if (
                (node.type === 'ClassProperty' && node.static) ||
                (node.type === 'MethodDefinition' && node.static)
            ) {
                hasES6 = true;
            }

            // 检查可迭代对象（Iterable）
            if (node.type === 'ForOfStatement') {
                hasES6 = true;
            }

            // 检查解构赋值的嵌套结构
            if (node.type === 'ArrayPattern' || node.type === 'ObjectPattern') {
                if (
                    node.elements && node.elements.some(element => element.type === 'ArrayPattern' || element.type === 'ObjectPattern')
                ) {
                    hasES6 = true;
                }
            }

            // 检查类的扩展和继承语法
            if (
                node.type === 'ClassDeclaration' ||
                node.type === 'ClassExpression' ||
                (node.type === 'CallExpression' && node.callee && node.callee.name === 'extends')
            ) {
                hasES6 = true;
            }

            // 检查对象字面量的简写语法
            if (node.type === 'ObjectExpression' && !node.properties.some(prop => prop.computed)) {
                hasES6 = true;
            }

            // 检查 Set 和 Map 数据结构语法
            if (
                node.type === 'NewExpression' &&
                node.callee &&
                (node.callee.name === 'Set' || node.callee.name === 'Map')
            ) {
                hasES6 = true;
            }

            // 检查可迭代协议（Iterable Protocol）
            if (
                node.type === 'ForOfStatement' ||
                (node.type === 'CallExpression' && node.callee && node.callee.name === 'Symbol.iterator')
            ) {
                hasES6 = true;
            }

            // 检查类的私有字段（Private Fields）语法
            if (node.type === 'PrivateIdentifier') {
                hasES6 = true;
            }

            // 检查装饰器语法
            if (node.type === 'Decorator') {
                hasES6 = true;
            }

        }
    });

    // 辅助方法：检查await关键字
    function hasAwaitKeyword(node) {
        if (!node.body) return false;
        if (node.body.type === 'AwaitExpression') return true;
        if (Array.isArray(node.body.body)) {
            return node.body.body.some(hasAwaitKeyword);
        }
        return false;
    }
    return hasES6;
}

module.exports = hasES6Syntax;
