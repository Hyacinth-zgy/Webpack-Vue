#########指令简介：

开发环境 : webpack ./src/index.js -o ./build/build.js --mode=development
webpack会以./src/index.js 为入口开始打包，打包后输出到./build.js,整体打包环境是开发环境

生产环境 : webpack ./src/index.js -o ./build/build.js --mode=production
webpack会以./src/index.js 为入口开始打包，打包后输出到./build.js,整体打包环境是生产环境

指定打包模式：--mode=development


######## webpack 默认可以打包JS,JSON 文件 不能打包css,less,vue...等其他文件，其他文件文件要用loader翻译

######## 打包css文案件
