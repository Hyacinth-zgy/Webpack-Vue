// webpack的配置文件
// 运行webpakck是会加载此文件
const { resolve }  = require('path');
const HtmlWebpckPlugin = require('html-webpack-plugin');

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
      },
      {
        test: /\.(png|jpg|gif)$/i,
        dependency: { not: ['url'] },
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8129,
              name:'img/[hash:10].[ext]', // 属于file-loader的属性
              outputPath: "images/", // 属于file-loader的属性
              publicPath: "images/",  // 属于file-loader的属性
            },
          },
        ],
        
       type: 'javascript/auto'
      },
      {
        test:/\.html$/,
        loader:'html-loader'
      },
      {
        exclude:/\.(css|js|html|less|json)$/,
        dependency: { not: ['url'] },
        loader:'file-loader',
        options: {
          name: '[hash:10].[ext]'
        },
        type: 'javascript/auto'
      },
    ],
  },
  plugins: [
    new HtmlWebpckPlugin({
      template:'./src/index.html',
      minify:{
        collapseWhitespace:true,
        removeComments:true
      }
  }),
  ],
};

module.exports = (env, argv) => {
    if(argv.mode==='development'){
    config.output.path = resolve(__dirname,'devbuild')
    }

  return config;
};