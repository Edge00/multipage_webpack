/**
 * Created by shitengteng on 2017/5/19.
 *  工具函数集合
 **/

//art-template


/*时间格式化 函数*/

  const dateFormat= function (date, format) {

    date = new Date(date);

    var map = {
        "M": date.getMonth() + 1, //月份
        "d": date.getDate(), //日
        "h": date.getHours(), //小时
        "m": date.getMinutes(), //分
        "s": date.getSeconds(), //秒
        "q": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    format = format.replace(/([yMdhmsqS])+/g, function(all, t){
        var v = map[t];
        if(v !== undefined){
            if(all.length > 1){
                v = '0' + v;
                v = v.substr(v.length-2);
            }
            return v;
        }
        else if(t === 'y'){
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
}

//加密函数
 const encodeURI =(data)=>encodeURIComponent(data);


//把对象拼凑成字符串的方法 主要用来在跳转时传惨
 const paramType = data => {
     let paramArr = [];
     let paramStr = '';
     for (let attr in data) {
         paramArr.push(attr + '=' + data[attr]);
     }
     paramStr = paramArr.join('&');
     paramStr = '?' + paramStr;
     return paramStr
 }


 //内部跳转方法
 const  pushRouter=(path,postData)=>{
     let url =  path +paramType(postData);

     window.location.href=url;
 }


module.exports = {
    dateFormat,
    encodeURI,
    paramType,
    pushRouter
}