// 检查常量声明（const）
function checkConstDeclaration(node):boolean{
  if (node.type === 'VariableDeclaration' && node.kind === 'const') {
    return true
  }
}

// 检查块级作用域变量声明（let）
function checkLetDeclaration(node):boolean {
  if (node.type === 'VariableDeclaration' && node.kind === 'let') {
    return true
  }
}

// 检查箭头函数
function checkArrowFunction(node):boolean {
  if (node.type === 'ArrowFunctionExpression') {
    return true
  }
}

// 检查模板字面量
function checkTemplateLiteral(node):boolean {
  if (node.type === 'TemplateLiteral') {
    return true
  }
}

// 检查解构赋值（数组和对象）
function checkDestructuringAssignment(node):boolean {
  if (node.type === 'ArrayPattern' || node.type === 'ObjectPattern') {
    return true
  }
}

// 检查函数默认参数
function checkDefaultParameters(node):boolean {
  if (node.type === 'AssignmentPattern') {
    return true
  }
}

// 检查展开语法（Spread）
function checkSpreadSyntax(node):boolean {
  if (node.type === 'SpreadElement') {
    return true
  }
}

// 检查迭代器（Iterator）
function checkIterator(node):boolean {
  if (node.type === 'ForOfStatement') {
    return true
  }
}

// 检查 Promise 对象
function checkPromise(node):boolean {
  if (node.type === 'NewExpression' &&
    node.callee &&
    node.callee.name === 'Promise') {
    return true
  }
}

// 检查类定义
function checkClassDeclaration(node):boolean {
  if (node.type === 'ClassDeclaration') {
    return true
  }
}

// 检查模块化语法（import 和 export）
function checkModuleSyntax(node):boolean {
  if (
    node.type === 'ImportDeclaration' ||
    node.type === 'ExportDeclaration' ||
    node.type === 'ExportNamedDeclaration' ||
    node.type === 'ExportDefaultDeclaration' ||
    node.type === 'ExportAllDeclaration'
  ) {
    return true
  }
}

// 检查生成器函数
function checkGeneratorFunction(node):boolean {
  if (node.type === 'FunctionDeclaration' && node.generator) {
    return true
  }
}

// 辅助方法：检查await关键字
function checkAsyncAwait(node):boolean {
  function hasAwaitKeyword(node):boolean {
    if (!node.body) return false
    if (node.body.type === 'AwaitExpression') return true
    if (Array.isArray(node.body.body)) {
      return node.body.body.some(hasAwaitKeyword)
    }
    return false
    // 检查 async/await
  }
  if ((node.type === 'FunctionDeclaration' && node.async) ||
    (node.type === 'FunctionExpression' && node.async) ||
    (node.type === 'ArrowFunctionExpression' && node.body.type === 'BlockStatement' && hasAwaitKeyword(node.body)) ||
    (node.type === 'ArrowFunctionExpression' && node.body.type !== 'BlockStatement' && node.body.async)
  ) {
    return true
  }
}

// 检查可计算的属性名
function checkComputedPropertyName(node):boolean {
  if (node.type === 'Property' && node.computed) {
    return true
  }
}

// 检查模块化的动态导入
function checkDynamicImport(node):boolean {
  if (node.type === 'ImportExpression' ||
    (node.type === 'CallExpression' && node.callee && node.callee.name === 'import')
  ) {
    return true
  }
}

// 检查默认导出语法
function checkDefaultExportSyntax(node):boolean {
  if (node.type === 'ExportDefaultDeclaration') {
    return true
  }
}

// 检查可选链操作符（Optional Chaining）
function checkOptionalChaining(node):boolean {
  if (node.type === 'ChainExpression') {
    return true
  }
}

// 检查空值合并操作符（Nullish Coalescing）
function checkNullishCoalescing(node):boolean {
  if (node.type === 'BinaryExpression' && node.operator === '??') {
    return true
  }
}

// 检查类的私有字段语法
function checkPrivateFieldSyntax(node):boolean {
  if (node.type === 'ClassProperty' && node.key &&
    node.key.name && node.key.name.startsWith('#')) {
    return true
  }
}

// 检查BigInt数据类型
function checkBigIntDataType(node):boolean {
  if (node.type === 'Literal' && typeof node.value === 'bigint') {
    return true
  }
}

// 检查数值分隔符
function checkNumericSeparator(node):boolean {
  if (node.type === 'Literal' && node.raw && node.raw.includes('_')) {
    return true
  }
}

// 检查静态类方法
function checkStaticClassMethod(node):boolean {
  if (node.type === 'MethodDefinition' && node.static) {
    return true
  }
}

// 检查Promise.allSettled(node):boolean
function checkPromiseAllSettled(node):boolean {
  if (
    node.type === 'CallExpression' &&
    node.callee &&
    node.callee.property &&
    node.callee.property.name === 'allSettled'
  ) {
    return true
  }
}

// 检查数组的 flat(node):boolean、flatMap(node):boolean 方法
function checkArrayFlatAndFlatMap(node):boolean {
  if (
    node.type === 'CallExpression' &&
    node.callee &&
    node.callee.property &&
    (node.callee.property.name === 'flat' || node.callee.property.name === 'flatMap')
  ) {
    return true
  }
}

// 检查字符串模板标签函数
function checkTaggedTemplateExpression(node):boolean {
  if (node.type === 'TaggedTemplateExpression') {
    return true
  }
}

// 检查对象属性的简写语法
function checkObjectPropertyShorthand(node):boolean {
  if (node.type === 'Property' && node.shorthand) {
    return true
  }
}

// 检查对象属性的计算属性名
function checkObjectComputedPropertyName(node):boolean {
  if (node.type === 'Property' && node.computed) {
    return true
  }
}

// 检查剩余参数（Rest parameters）
function checkRestParameters(node):boolean {
  if (node.type === 'RestElement') {
    return true
  }
}

// 检查默认导出的命名空间导入
function checkDefaultExportNamespaceImport(node):boolean {
  if (
    node.type === 'ImportSpecifier' &&
    node.imported &&
    node.imported.name === 'default' &&
    node.local &&
    node.local.name !== 'default'
  ) {
    return true
  }
}

// 检查尾调用优化
function checkTailCallOptimization(node):boolean {
  if (node.type === 'CallExpression' && node.arguments.length > 0) {
    const lastArgument = node.arguments[node.arguments.length - 1]
    if (
      lastArgument.type === 'SpreadElement' ||
      lastArgument.type === 'FunctionExpression' ||
      lastArgument.type === 'ArrowFunctionExpression'
    ) {
      return true
    }
  }
}

// 检查数组解构赋值的默认值
function checkDefaultValueInArrayDestructuring(node):boolean {
  if (
    node.type === 'AssignmentPattern' &&
    node.left &&
    node.left.type === 'ArrayPattern' &&
    node.left.elements &&
    node.left.elements.some(element => element.type === 'AssignmentPattern')
  ) {
    return true
  }
}

// 检查类的静态成员
function checkStaticClassMembers(node):boolean {
  if (
    (node.type === 'ClassProperty' && node.static) ||
    (node.type === 'MethodDefinition' && node.static)
  ) {
    return true
  }
}

// 检查可迭代对象（Iterable）
function checkIterableObject(node):boolean {
  if (node.type === 'ForOfStatement') {
    return true
  }
}

// 检查解构赋值的嵌套结构
function checkNestedDestructuringAssignment(node):boolean {
  if (node.type === 'ArrayPattern' || node.type === 'ObjectPattern') {
    if (
      node.elements && node.elements.some(element => element.type === 'ArrayPattern' || element.type === 'ObjectPattern')
    ) {
      return true
    }
  }
}

// 检查类的扩展和继承语法
function checkClassExtensionAndInheritanceSyntax(node):boolean {
  if (
    node.type === 'ClassDeclaration' ||
    node.type === 'ClassExpression' ||
    (node.type === 'CallExpression' && node.callee && node.callee.name === 'extends')
  ) {
    return true
  }
}

// 检查对象字面量的简写语法
function checkObjectLiteralShorthandSyntax(node):boolean {
  if (node.type === 'ObjectExpression' && !node.properties.some(prop => prop.computed)) {
    return true
  }
}

// 检查 Set 和 Map 数据结构语法
function checkSetAndMapDataStructureSyntax(node):boolean {
  if (
    node.type === 'NewExpression' &&
    node.callee &&
    (node.callee.name === 'Set' || node.callee.name === 'Map')
  ) {
    return true
  }
}

// 检查可迭代协议（Iterable Protocol）
function checkIterableProtocol(node):boolean {
  if (
    node.type === 'ForOfStatement' ||
    (node.type === 'CallExpression' && node.callee && node.callee.name === 'Symbol.iterator')
  ) {
    return true
  }
}

// 检查类的私有字段（Private Fields）语法
function checkPrivateFieldsSyntax(node):boolean {
  if (node.type === 'PrivateIdentifier') {
    return true
  }
}

// 检查装饰器语法
function checkDecoratorSyntax(node):boolean {
  if (node.type === 'Decorator') {
    return true
  }
}

const checkES6:Function[] = [
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
]

function scanConfig(node):boolean{
  return checkES6.some(func => func(node))
}

export default scanConfig
