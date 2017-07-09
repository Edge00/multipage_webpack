/**
 * Created by liuyang on 2017/5/24.
 */
//监听滚动距离，让产品导航悬浮在页面上方
window.onscroll=function(){
    var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
    if(scrollTop>=120){
        $('#navbar').css({
            'position':'fixed',
            'background':'#fff',
            'top':0,
            'left':0
        })
    }else{
        $('#navbar').css({
            'position':'',
            'background':''
        })
    }
}

$('.order-item-body>ul.lf>li').each(function(){
    var liLength=$(this).parent().find('li').length;
    $(this).parent().next().height(146*liLength);
    $(this).parent().next().find('div').css('padding-top',146*liLength/2-8+'px');
});

