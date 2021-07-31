#########指令简介：

开发环境 : webpack ./src/index.js -o ./build/build.js --mode=development
webpack会以./src/index.js 为入口开始打包，打包后输出到./build.js,整体打包环境是开发环境

生产环境 : webpack ./src/index.js -o ./build/build.js --mode=production
webpack会以./src/index.js 为入口开始打包，打包后输出到./build.js,整体打包环境是生产环境

指定打包模式：--mode=development


######## webpack 默认可以打包JS,JSON 文件 不能打包css,less,vue...等其他文件，其他文件文件要用loader翻译

######## 打包css文案件

######## 使用webpack.config.js配置文件,该文件指示wenpck怎么工作，所有构件工具都是基于node环境运行的，模块化默认使用common.js

######## 打包CSS文件loader  npm i style-loader -D  npm i css-loader -D
         style-loader:创建style标签，将js中的样式资源进行插入到head中生效
         css-loader:将css文件以common.js模块规范加载到js文件中，里面的内容是样式字符串
         配置:
    {
        test:/\.css$/,
        use:[
          'style-loader','css-loader'
        ]
    }

######## 打包less文件资源 npm i less -D  npm i less-loader -D
         less-loader:将less文件编译成css文件 然后css-loader接着工作，在接着style.css接着工作
         配置：
    {
        test:/\.less$/,
        use:[ MiniCssExtractPlugin.loader,'css-loader','less-loader'],
    },

######## 打包html文件资源 npm i html-webpack-plugin -D
         html-webpack-plugin:默认会创建一个空的html文件，自动引入打包输出的所有资源（JS/CSS）
         当我们需要有结构的html文件时，需要给html-webpack-plugin传递参数
        new HtmlWebpckPlugin({
            # 作用:复制./src/index.html，并自动引入打包输出的所有资源
            # 工作原理:
            template:'./src/index.html',
            # 压缩HTML配置
            minify:{
              # 移除空格
              collapseWhitespace:true,
              # 移除注释
              removeComments:true
            }
        }),


