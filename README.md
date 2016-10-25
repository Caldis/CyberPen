CyberPen
========
[![npm version](https://img.shields.io/npm/v/npm.svg)](https://github.com/Caldis/CyberPen) [![license](https://img.shields.io/npm/l/express.svg)](https://github.com/Caldis/CyberPen) [![Build](https://img.shields.io/badge/Build-Electron-lightgrey.svg)](https://github.com/electron/electron) [![Style](https://img.shields.io/badge/Style-Material--UI-brightgreen.svg)](https://github.com/callemall/material-ui)

> A extreme simple example boilerplate with react.js



## 介绍
- 一个用于本地构建图标字体的工具, 可以将SVG文件打包生成可以引用的SVG/TTF/WOFF文件, 并附带说明页, 采用Electron构建



## 开发与构建
由于包含了Electron, ```npm install``` 的执行时间可能会很久(需要从官方源下载各个版本的electron源文件), 可以自行修改国内源加速下载, 详情参考: [这些教程](https://www.google.com.hk/search?q=electron+install+%E9%95%9C%E5%83%8F&oq=electron+install+%E9%95%9C%E5%83%8F&aqs=chrome..69i57.13989j0j4&{google:bookmarkBarPinned}sourceid=chrome&{google:omniboxStartMarginParameter}ie=UTF-8)
#### DEV:
```shell
git clone https://github.com/Caldis/CyberPen
cd cyberPen-master
npm install
npm run dev
npm run start
```
#### Build:
```shell
git clone https://github.com/Caldis/CyberPen
cd cyberPen-master
npm install
npm run dist
npm run package
```
打包输出的可执行文件在dist目录内


## 使用说明
- 打开界面后, 直接拖拽SVG文件或上次导出的JSON项目文件到主界面内, 然后可以编辑/命名/分组管理等操作
- 点击导出, 可以选择导出文件的类型
  导出项目文件会生成一个JSON项目文件, 便于保存这次的图标组, 如果下次需要继续添加, 可以导出项目文件, 待下次使用时导入本次的项目文件继续添加
  导出图标字体文件会生成四个格式的图标字体文件(SVG/WOFF/TTF/EOT), 和一个包含介绍与使用说明的HTML页面
- 图标的具体使用说明可以参考导出后的HTML文件内的介绍



## Dependencies
- ```font-carrier```(https://github.com/purplebamboo/font-carrier)
- ```electron``` (https://github.com/electron/electron)
- ```material-ui``` (https://github.com/callemall/material-ui)
- ```immutable-js``` (https://github.com/facebook/immutable-js/)
- ```react``` (https://github.com/facebook/react)
- ```webpack``` (https://github.com/webpack/webpack)


## Credit
- 感谢灵点的各位小伙伴的支持~
