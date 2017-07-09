/**
 * Created by shitengteng on 2017/5/19.
 * 获取浏览器地址 参数
 */



export default  (name)=>{
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2];
    return null;
};
