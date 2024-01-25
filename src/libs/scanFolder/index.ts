import * as fs from 'fs';
import * as path from 'path';
import { globSync } from 'glob';
import * as acorn from 'acorn';

interface IEs6CheckRes {
  result: boolean;
  errArray: Array<{ errorInfo; fileName }>;
}

// 遍历读到的js文件
const traverseFiles = (jsfiles: string[]) => {
  // 错误栈
  const errArray = [];
  // 扫描结果
  let result = false;

  // jsfiles是文件名的字符串数组
  for (const fileName of jsfiles) {
    // 获取代码字符串
    const code: string = fs.readFileSync(fileName, 'utf-8');

    try {
      // 如果不符合ES5则会转化报错
      acorn.parse(code, { sourceType: 'script', ecmaVersion: 5 });
    } catch (error) {
      // 提取第一个换行符之前的错误信息
      const errorInfo = error.stack.split('\n')[0];
      const errorObj = {
        errorInfo,
        fileName,
      };
      errArray.push(errorObj);
      // ES6特性检查，只要有一个文件包含es6语法，则返回true
      result = true;
    }
  }

  return { result, errArray };
};

// 扫描文件夹中的所有 JavaScript 文件并检查是否包含 ES6 语法
const scanFolder = (folderPath: string): IEs6CheckRes => {
  // 使用glob获取所有.js结尾的文件
  const jsfiles: string[] = globSync(path.join(folderPath, '**/*.js'));
  return traverseFiles(jsfiles);
};

export default scanFolder;

