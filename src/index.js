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
