import * as process from 'process'
import * as path from 'path'
import minimist from 'minimist' // 导入处理命令行参数方法
import scanFolder from './libs/scanFolder' // 导入主方法
import scanHelper from './libs/scanHelper' // 导入帮助方法

function main(): void {
  // 获取命令行参数
  const argv = minimist(process.argv.slice(2))
  // 获取目录路径
  const cwd = process.cwd()

  // 用户输入-h或-help时
  if (argv.h || argv.help) {
    scanHelper()
  } else {
    // 获取相对路径
    const relativePath = argv.p || argv.path || 'dist'
    // 拼接绝对路径
    const folderPath = path.join(cwd, relativePath)
    // 运行主方法
    scanFolder(folderPath)
  }
}

try {
  main()
} catch (error) {
  console.error('An error occurred in es6-check plugin:', error)
}



