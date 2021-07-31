// webpack的配置文件
// 运行webpakck是会加载此文件

const { resolve }  = require('path');
const config = {
  resolve: {
    // 在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在。  resolve.extensions 用于配置在尝试过程中用到的后缀列表，默认是：
    extensions: ['.js', '.ts', '.json'],
  },
  // mode: 'production', 这里不指定mode，通过脚本命令传递参数进来
  entry: './src/index.js',
  output: {
    filename:'build.js',
    path:resolve(__dirname,'build')
  },
  module: {
    rules: [
      {
        test:/\.css$/,
        use:[
          'style-loader','css-loader'
        ]
      },
      {
        test:/\.less$/,
        use:['style-loader','css-loader','less-loader'],
      }
    ],
  },
  plugins: [],
};

module.exports = (env, argv) => {
    if(argv.mode==='development'){
    config.output.path = resolve(__dirname,'devbuild')
    }

  return config;
};