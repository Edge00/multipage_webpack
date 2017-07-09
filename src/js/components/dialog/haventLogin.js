// 该js文件对应  点击”登陆“链接时 出现的模态框

//加载模块css
require('./css/haventLogin.css');
//加载模板
var haventLogin = require('./tmpl/haventLogin.html');

module.exports = function() {
    $('body').append(haventLogin);
    $('.login>ul>li').on('click',function(){
        var index=$(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $('.login>div>div').hide();
        $('.login>div>div').eq(index).show();
    })
    $('.close').on('click',function(){
        $('.modal').hide(300);
    })

    $('#login-submit').on('click',function(){
        alert('执行post异步请求隐藏模态框');
        $('.modal').hide(300);
    })

    // var $dialog = $(html).clone();
    // $dialog.find('.close').on('click', function() {
    // 	$dialog.fadeOut(function() {
    // 		$(this).remove();
    // 	});
    // });
    // $('body').append($dialog);
    // $dialog.fadeIn();
}