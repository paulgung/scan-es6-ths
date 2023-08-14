import * as estraverse from 'estraverse'
import * as acorn from 'acorn'
import scanConfig from '../../config/scanConfig'

function scanCode(code):boolean {
  // 是否包含ES6代码
  let hasES6:boolean = false

  // 通过acorn转换语法树
  const syntaxTree:acorn.Node = acorn.parse(code, { ecmaVersion: 'latest' })

  // 通过estraverse遍历AST语法树
  estraverse.traverse(syntaxTree, {
    enter: (node) => {
      // 遍历每个语法树节点，如果出现ES6语法，标记为true
      if (scanConfig(node)){
        hasES6 = true
        return estraverse.VisitorOption.Break
      }
    }
  })

  return hasES6
}

export default scanCode
