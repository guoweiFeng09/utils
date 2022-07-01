// node 递归获取当前目录所有文件
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

function readFileList(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  console.log(files);
  files.forEach((item, index) => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      readFileList(path.join(dir, item), filesList); // 递归读取文件
    } else {
      filesList.push(fullPath);
    }
  });
  return filesList;
}
const filesList = [];
readFileList(__dirname, filesList);
console.log(filesList);
console.log(
  filesList
    .filter(i => i.indexOf('view.jsx') !== -1)
    .map(i => i.split('/component/')[1])
    .map(i => i.split('/view.jsx')[0])
    .join('\n'),
);
console.log(
  filesList
    .filter(i => i.indexOf('view.jsx') !== -1)
    .length,
);