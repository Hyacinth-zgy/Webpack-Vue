// webpack入口起点文件
import data from './data.json'
import {getLocaL} from './utill/hepler'
import './asset/style/index.css'
import './asset/less/index.less'
window.getLocaL = getLocaL;
console.log(data.name)
export function add(x,y){
    return x+y
}
const a =add(1,2)
console.log(a)
console.log(5)