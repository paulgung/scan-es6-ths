import * as fs from 'fs'
import * as path from 'path'
import scanCode from '../scanCode'

// 扫描文件夹中的所有 JavaScript 文件并检查是否包含 ES6 语法
function scanFolder(folderPath) {

  // 鲁棒性检查，处理dist文件夹不存在的情况
  let files = null
  try {
    // 如果没有读到dist文件夹则提示用户并返回
    files = fs.readdirSync(folderPath, 'utf-8')
  }catch (e){
    console.log("没有读到dist文件夹，如果想指定目录，请使用--path，详细请运行命令:")
    console.log("es6-check --help")
    return
  }

  // 遍历读到的文件/文件夹
  for (const file of files) {
    const filePath = path.join(folderPath, file)
    const stats = fs.statSync(filePath)

    if (stats.isDirectory()) {
      // 递归扫描子文件夹
      scanFolder(filePath)
    } else if (stats.isFile() && file.endsWith('.js')) {
      try {
        // 读代码
        const code = fs.readFileSync(filePath, 'utf-8')
        console.log("弓少旭想看看code",code)
        // 扫描单文件代码
        const hasES6 = scanCode(code)
        if (hasES6) {
          console.log(`文件 ${filePath} 中包含 ES6 语法`)
        } else {
          console.log(`文件 ${filePath} 不包含 ES6 语法`)
        }
        // return hasES6
      } catch (error) {
        console.error(`读取文件 ${filePath} 失败：${error}`)
      }
    }
  }
}

export default scanFolder
