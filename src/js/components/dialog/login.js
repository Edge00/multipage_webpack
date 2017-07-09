// 该js文件对应  点击”登陆“链接时 出现的模态框
//加载模块css
require('./css/login.css');
//加载模板
var login = require('./tmpl/login.html');
import {urlUtil, request, getQueryString, untilFunction} from '../../until' //引用工具库的方法


module.exports = function (loginCallback) {
    $('body').append(login);
    $('.modal').on('click',closeLogin);

    $('.login>ul>li').on('click', function () {
        var index = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $('.login>div>div').hide();
        $('.login>div>div').eq(index).show();
    })

    /*登陆*/
    $('#login-submit').on('click', function () {
        request(urlUtil.getURL("loginByTelephone"), {
            type: "post",
            data: {
                telephone: "13283072226",
                message: "123456"
            }
        }).then((result) => {
            if (result && result.code === '1') {
                sessionStorage.setItem("customer", JSON.stringify(result.data.customer))
                $('.modal').hide();
                loginCallback();
                $('.modal').off('click',closeLogin);
            } else {
                alert(result.msg);
            }
        }).catch((err) => {
            alert(err)
        });
    });

    /*发送验证码*/
    $('#send_message_a').on('click', function () {
        request(urlUtil.getURL("sendValidateCode"), {
            type: "post",
            data: {
                telephone: "13283072226"
            }
        }).then((result) => {
            if (result && result.code === '1') {
                var i = 30;
                $(this).html("重新获取(" + (i--) + "s)")
                var time = setInterval(() => {
                    if (i < 0) {
                        $(this).html("发送手机验证码");
                        clearInterval(time);
                    } else {
                        $(this).html("重新获取(" + (i--) + "s)")
                    }
                }, 1000);
            } else {
                alert(result.msg);
            }
        }).catch((err) => {
            alert(err)
        });
    })

    /*弹框取消*/

    function closeLogin(e) {
        let $target = $(e.target);
        if ($('.login').has($target).length == 0) {
            $('.modal').hide();
        }
    }


    // var $dialog = $(html).clone();
    // $dialog.find('.close').on('click', function() {
    // 	$dialog.fadeOut(function() {
    // 		$(this).remove();
    // 	});
    // });
    // $('body').append($dialog);
    // $dialog.fadeIn();
}