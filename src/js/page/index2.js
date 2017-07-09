
//引入css
require('../../css/lib/reset.css')
require('../../css/lib/iconfont.css')
require('../../css/page/index2.css')
require('../../css/common/common.css')
require('../until/common.js')

import {urlUtil,request,getQueryString,untilFunction} from '../until' //引用工具库的方法
import runtime from 'art-template/lib/runtime'//为art-tempalte 添加 helper 方法
import template from './lib/template-web'

/*用require的方式导入页头和页脚等公用模块*/
var header=require('../components/header.html');
var footer=require('../components/footer.html');
var navigation=require('../components/navigation.html');
$('.header-container').html(header);
$('.footer-container').html(footer);
$('#navbar').html(navigation)

require('./navigation.js');

//import login from '../components/dialog/login'
//login();

//
runtime.encodeURI =  untilFunction.encodeURI;


//跳转方法的 调用
// Function.pushRouter("./view/soybeanMilkMachine.html",{"sss":"sss"})

//
// console.log(artTemplate)
// artTemplate.encodeURI()



//商品分类信息 获取
//     request(urlUtil.getURL("classification"),{
//             type:"get",
//             data:{}
//     }).then((result)=>{
//
//
//         let html = template('classification', result.data);
//         $('#classification_c').html(html);
//     }).catch((err)=>{
//         alert(err)
//     })


//首页 广告的获取
    request(urlUtil.getURL("homebanner"),{
        type:"get",
        data:{}
    }).then((result)=>{
        //console.log(result)
        let html = template('homebanner', result.data);
        $('#banner').html(html);


        // 图片轮播组件

        var i=0;
        var timer=null;
        var firstimg=$('.view li').first().clone(); //复制第一张图片
        $('.view').append(firstimg).width($('.view li').length*($('.view img').width())); //将第一张图片放到最后一张图片后，设置ul的宽度为图片张数*图片宽度

//定时器自动播放
        timer=setInterval(function(){
            i++;
            if (i==$('.view li').length) {
                i=1;
                $('.view').css({left:0});
            };
            $('.view').stop().animate({left:-i*1220},1000);
            if (i==$('.view li').length-1) {
                $('.circle li').eq(0).addClass('active').siblings().removeClass('active');
            }else{
                $('.circle li').eq(i).addClass('active').siblings().removeClass('active');
            }
        },3000)
//鼠标移入，暂停自动播放，移出，开始自动播放


        $('.circle li').hover(function(){
            clearInterval(timer);
            var _index=$(this).index();
            $('.view').stop().animate({left:-_index*1220},1000);
            $('.circle li').eq(_index).addClass('active').siblings().removeClass('active');
        },function(){
            timer=setInterval(function(){
                i++;
                if (i==$('.view li').length) {
                    i=1;
                    $('.view').css({left:0});
                };
                $('.view').stop().animate({left:-i*1220},1000);
                if (i==$('.view li').length-1) {
                    $('.circle li').eq(0).addClass('active').siblings().removeClass('active');
                }else{
                    $('.circle li').eq(i).addClass('active').siblings().removeClass('active');
                }
            },3000)
        })
    }).catch((err)=>{
        alert(err)
    })

/*加载商品分组*/
request(urlUtil.getURL("goGroup"),{
    type:"get",
    data:{}
}).then((result)=>{
    if(result && result.code == '1'){
        let html1 = template('hot-goods-template', result.data);
        let html2 = template('goGroup-template', result.data);
        //console.log(html1)
        $('#hot-goods').html(html1);
        $('#hot-goods').append(html2);
    }

}).catch((err)=>{
    alert(err)
});


/*点击加入购物车后  页面发生更改*/
$('.add-cart').on('click',function(){
    $('.page-init').hide();
    $('.add-cart-success').show();
})