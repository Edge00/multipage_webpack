/**
 * Created by shitengteng on 2017/5/19.
 * 请求方法封装
 */


export default function request(url,options) {
    return new Promise((resolve,reject)=>{
        let ajaxSetting = {
            url: url,
            type:options.method || 'get',
            data:options.data || {},
            success: function (response) {
                resolve(response);
            },
            error: function (err,mesg) {
                reject(mesg);
            }
        }

        $.ajax(ajaxSetting)
    })
}