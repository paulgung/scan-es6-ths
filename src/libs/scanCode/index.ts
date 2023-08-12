import * as estraverse from 'estraverse'
import * as acorn from 'acorn'
import scanConfig from '../../config/scanConfig'

function scanCode(code) {
  // 是否包含ES6代码
  let hasES6 = false

  // 通过acorn转换语法树
  const syntaxTree = acorn.parse(code, { ecmaVersion: 'latest' })

  // 通过estraverse遍历AST语法树
  estraverse.traverse(syntaxTree, {
    enter: (node) => {
      hasES6 = scanConfig(node)
      hasES6 && estraverse.VisitorOption.Break
      return hasES6
    }
  })

  return hasES6
}

export default scanCode
