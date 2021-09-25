// webpack入口起点文件
import data from './data.json';
import { getLocaL } from './utill/hepler';
import './asset/style/index.css';
import './asset/less/index.less';
import './asset/style/iconfont.css';
import $JQ from 'jquery';

console.log($JQ);

window.getLocaL = getLocaL;
console.log(data.name);
export function add(x, y) {
  return x + y;
}
const a = add(1, 2);
console.log(a);
console.log(5);

// 去全局找module找个全局变量
if (module.hot) {
  // 一旦module.hot为true，说明开启了HMR功能------>让HMR功能代码生效
  module.hot.accept('./utill/hepler.js', () => {
    // 监听print.js文件的变化，一旦发生变化，其他默认不会更新
    // 执行回调
    print();
  });
}

// 注册serviceworker
// 处理兼容性问题，支持就用，不支出就不用
// 其他问题：
// 1.eslint不认识window navigator全局变量
// 解决：需要在pakage.json中配置，意义在于支持浏览器全局变量
// "env": {
//   "browser": true
// }

// servicework的代码必须要运行在服务器上，
// 1.————>nodejs 代码
// 2.npm i serve -g
// serve -s build 启动服务器，将build目录下的文件作为静态资源暴露出去
if ('serviceworker' in navigator) {
  window.addEventListener('add', () => {
    navigator.serviceWorker.register('./service-work.js').then(() => {
      console.log('serviceworker注册成功');
    }).catch(() => {
      console.log('serviceworker注册失败');
    });
  });
}
