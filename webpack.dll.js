// 当运行 webpack时 ，默认查找 webpack.config.js 配置文件
// 需求： 需要运行webpack.dll.js文件
// 配置运行指令： webpack --config webpack.dll.js




// 使用dll技术对某些库单独打包（第三方库:jquery react vue... ） 进行单独打包
const {resolve}  = require('path');
const webpack = require('webpack');
module.exports = {
    entry:{
        // 最终打包生成的[name] --> otherpack
        // 要打包的库是['jquery']-->   这里是个数组，需要可以放更多的第三方包
        otherpakl:['jquery']
    },
    output:{
        filename:'[name].js',
        // 打包后的文件放在dll文件目录下就行了
        path:resolve(__dirname,'dll'),
        library:'[name]_[hash]',//打包的库里面向外暴露出去内容叫什么名字
    },




    plugins:[
      // 打包生产一个manifest.json 文件
      // 该文件提供一个映射关系，告诉webppak ，这些第三方库不需要被打包
      new webpack.DllPlugin({
        name:'[name]_[hash]' ,//映射库的暴露的内容名称
        path:resolve(__dirname,'dll/manifest.json') //输出文件路径
      })
    ],
    mode:'production'
}
