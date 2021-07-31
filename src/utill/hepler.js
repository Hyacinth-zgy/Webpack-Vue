export const  getLocaL = (key)=>{
    return  JSON.parse(localStorage.getItem(key)) 
}