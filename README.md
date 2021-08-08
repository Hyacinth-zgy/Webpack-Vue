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


######## 打包图片资源【样式文件】 下载url-loader file-loader:url-loader依赖于file-loader npm i url-loader file-loader -D
         配置:
      {
        test: /\.(png|jpg|gif)$/i,
        //如需从 asset loader 中排除来自新 URL 处理的 asset，请添加 dependency: { not: ['url'] } 到 loader 配置中。
        dependency: { not: ['url'] },
        use: [
          {
            loader: 'url-loader',
            options: {
              // limit:图片大小小于8KB，就会被base64处理,其他的大于8KB的会被打包进入build文件夹，
              // ------优点:减轻服务器压力
              // ------缺点:图片体积非常大，文件请求非常大
              limit: 8192,
              // 因为图片的引入是引入图片打包生成的唯一HASH值，名字比较长，所以可以配置name属性
              // [hash:10]:代表取hash值的前10位作为名字
              // [ext]:代表取文件的原扩展名，原来后缀是png就是png，是jpg就是jpg
              name:'[hash:10].[ext]',
            }
          },
        ],
        // 当在 webpack 5 中使用旧的 assets loader（如 file-loader/url-loader/raw-loader 等）和 asset 模块时，你可能想停止当前 asset 模块的处理，并再次启动处理，这可能会导致 asset 重复，你可以通过将 asset 模块的类型设置为 'javascript/auto' 来解决。
       type: 'javascript/auto'
      },

######## 打包图片资源【html文件中的图片】
      {
        test:/\.html$/,
        // html-loader:专门处理image图片（负责html文件中通过src引入的img，从而能被url-loader进行处理） npm i html-loader -D
        // 问题:url-loader默认使用ES6模块解析，而html-loader引入图片是commonJS
        // 解决: 关闭url-loader的ES6模块化，使用commonJS解析  esModule:false(最新的webapck版本不需要处理)
        loader:'html-loader'
      },

######## 配置打包其他资源
      {
        // 排除法：除了这些类型的文件
        exclude:/\.(css|js|html|less|json)$/,
        dependency: { not: ['url'] },
        loader:'file-loader',
        options: {
          name: '[hash:10].[ext]'
        },
        type: 'javascript/auto'
      },

######## devServer 开发服务器
    // 开发服务器:devServer:用来自动化打包（自动编译->监视文件的变化，用来自动打开浏览器，自动刷新浏览器） npm i webpack-dev-server -D
    // 特点:没有输出，只会在内存中编译打包，不会有任何输出
    // 启动devServer指令为：npx webpack-dev-server[废弃]   npx webpack serve[有效]
    因为webpack5.X与webpack-dev-server有些冲突，无法直接使用webpack-dev-server启动服务，只能通过这种方式去调用webpack-dev-server，并且这种方式不能使用 --open 自动打开浏览器，也有可能是我没找到正确打开方式
    // npx:局部安装的服务，需要用npx
    devServer:{
      // 项目构建后的路径
      contentBase:resolve(__dirname,'build'),
      // 启动gzip压缩
      compress:true,
      // 端口号
      port:3000,
      // 默认自动打开浏览器
      open:true,
      // HMR功能
      // 修改了webpack配置，新配置想要生效，必须重新启动webpack服务
      hot:true
    },

######## 生产环境提取CSS为单独文件
    // MiniCssExtractPlugin.loader:使用MiniCssExtractPlugin.loader替换style-loader，并会自动引入打包生成的资源
    // 作用:将JS中的CSS文件提取成单独的文件
    导入:
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    rules:
    {
      test:/\.css$/,
      use:[MiniCssExtractPlugin.loader,'css-loader']
    }
    plugin:
    // 将JS中的CSS提取出来的插件
    // npm i mini-css-extract-plugin -D
    new MiniCssExtractPlugin({
      // 配置提取出来的css文件名
      filename:'css/build.css'
    }),

######## 生产环境 CSS兼容性处理
      // 利用postcss 和postcss-preset-env[指定兼容浏览器]解决css的兼容性问题
      // 在pakage.json中配置:
        "browserslist": {
          "development": [
          "last 1 chrome version",
          "last 1 firefox version",
          "last 1 safari version"
          ],
        "production": [
          ">0.2%",
          "not dead",
          "not op_mini all"
        ]
      }
      配置:
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              [
                'postcss-preset-env',
                {
                  // 其他选项
                },
              ],
            ],
          },
        }}

######## 生产环境 压缩CSS
        使用 OptimizeCssAssetsPlugin


######## 生产环境 JS兼容性处理
          // JS兼容性处理
          // npm i babel-loader @babel/preset-env @babel/polyfill @babel/core -D
          // 01.基本JS兼容性处理----> @babel/preset-env ,但是只能转换基本语法，如Promise不能转换
          // 02.全部JS兼容性处理 ----> @babel/polyfill  该@babel/polyfill不需要配置,在入口文件引入即可  import '@babel/polyfill';
          // ------------------------问题:可以处理任何兼容性问题，但是将所有兼容代码引入，会使得打包后的JS文件体积变大
          // 03:需要做兼容性的就做：按需加载  -->core-js npm i core-js -D
          // ------------------------该方案使用后，舍弃掉第二种方案：@babel/polyfill


######## 生产环境 JS压缩
         // 生产环境自动启动jS代码压缩
                 HTML压缩
          查看【打包html】资源配置




// 优化配置
开发环境性能优化  1.优化webpack的打包构件速度 2.优化代码调试
生产环境性能优化  1.优化代码性能  2.优化打包构建速度



  // 性能优化配置
  // 开发环境性能优化:
  //------------------优化打包速度
  //---------------------------:HMR（hot module replacement）   热模块替换/模块热替换
  //----------------------------作用:一个模块发生变化，只会重新打包这一个模块（而不是重新打包所有模块）
  //----------------------------开起方法:在devServer中配置hot:true
  //----------------------------HMR生效的文件:
  //----------------------------------------:样式文件:可以使用HMR功能，因为style-loader内部实现了
  //----------------------------------------:JS文件:默认不使用HMR
  //---------------------------------------------解决:需要修改JS代码，添加支持HMR功能的代码（看index.js）
                        // 去全局找module找个全局变量
                        if(module.hot){
                          // 一旦module.hot为true，说明开启了HMR功能------>让HMR功能代码生效
                          module.hot.accept('./print.js',function(){
                            //监听print.js文件的变化，一旦发生变化，其他默认不会更新
                            //执行回调
                            print();
                          })
                        }
  //----------------------------------------:HTML文件:默认不使用HMR，同时导致html不能热更新了（b）
  //---------------------------------------------解决:修改entry入口，将html文件引入,就可以热跟新了，但是HRM依然不支持，也不需要支持，因为只有一个HTML文件


######## 开发环境 source-map

 // source-map 一种提供源代码到构件后代码的映射技术（如果构建后代码出错了，可以通过映射关系追踪错误代码的位置）
  // 主要有以下几种source-map 技术:
  // ----------------------------[inline- | hidden- | eval- ]source-map
  // ----------------------------[noSource-]source-map
  // ----------------------------[cheap-[moudle-]]source-map
  // 主要技术解析:
  // 外部:指的是生成一个单独的source-map文件
  // 内联:指的是在将映射关系生成在JS代码里面，内联构件速度快
  // source-map:                外部
  // --------------------       错误代码准确信息和源代码的错误位置
  // inline-source-map          内联
  // --------------------       错误代码准确信息，源代码的错误位置
  // hidden-source-map          外部
  // --------------------       错误代码，错误原因，但是没有错误代码位置，不能追踪源代码位置，只能提示到构建后代码的错误位置
  // eval-source-map            内联
  // --------------------       每一个文件都生成对应的source-map 都在eval。能提示错误代码准确信息和源代码的错误位置
  // nosource-source-map        外部
  // --------------------       错误代码准确信息，但是没有任何源代码信息
  // cheap-source-map           外部
  // --------------------       错误代码准确信息和源代码错误位置，只能精确到行
  // cheap-moudle-source-map    外部
  // --------------------       错误代码准确信息和源代码的错误位置
  // 选择:
  // 开发环境:速度快，调试更好
  // --------速度快  eval->inline->cheap->...
  // -------------:eval-cheap-source-map eval-source--map
  //---------调试更友好:
  //-------------------:source-map cheap-moudle-source-map cheap-source-map
  // 结论:eval-source-map/eval-cheap-source-map

  // 生产环境:源代码要不要隐藏？调试要不要更友好?
  // 内联会让代码体积更大，所以在生产环境不用内联
  // nosource-source-map 全部隐藏
  // hidden-source-map 只隐藏源代码，会提示构建后的错误信息
  // 看需求进行选择


######## 生产环境，oneof
  // oneof
  // 在webpack打包过程中，当配置loader后，所有的文件都会被配置的所有loader加载一遍，只不过有的loader处理不了，有的loader会被命中，显然这样不是很合理，需要优化
  // 优化方式，使用oneof
  // 详情请看配置文件


 // 生产环境缓存:
  // 01:babel缓存:
  //-------------babel会对我们写的代码进行编译处理（JS的兼容处理），假如有100个模块，当我们经过babel处理后开启babel缓存，
  //-------------babel缓存会将之前的100个模块缓存下来，当我们更改了其中一个文件其他99个没有改变，babel只会重新加载个更改的那个，其他99个读取缓存里面的，加快了生产环境的打包速度
  配置:
  在babelloader中开启    cacheDirectory:true
  //-------------其实可以理解为热更新

  // 02:文件资源缓存:
  // ----01:使用webpack构建时生成的唯一一个HASH值
  // -----------问题:因为JS和CSS同时使用一个HASH值，如果重新打包，会导致之前缓存的文件失效(因为根据HASH生成了新的文件)，而只改动了一个文件
  //-----02.使用chunckhash:跟俊chunk生成的hash值，如果打包源于同一个chunk，那么hash值就一样
  //------------问题:JS和CSS的HASH值还是一样的，因为css是在JS中被引入的，属于同一个chunk
  //-----03.使用contenthash:根据文件的内容生成hash值:不同文件的hash值一定不一样


  // 生产环境:tree shaking :去除无用代码
  // 前提:01必须使用ES6模块化 02开启production环境
  // 作用:减少代码体积,去除掉哪些在模块中书写但是没有使用到的代码块和函数
  // 在package.json中配置:
  // sideEffect:false 所有代码都没有副作用（都可以进行tree shaking）
  //-----------------：问题:可能会把css/@babel/ployfill（副作用）文件干掉
  // 修改sideEffect:配置为：sideEffect:["*.css"，".less"] //css,less文件不进行treeshaking
  











