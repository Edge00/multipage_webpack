import {urlUtil,request,getQueryString,artTemplate,untilFunction} from '../until'
import runtime from 'art-template/lib/runtime'//为art-tempalte 添加 helper 方法
import template from './lib/template-web'
import login from '../components/dialog/login'


runtime.encodeURI =  untilFunction.encodeURI;


request(urlUtil.getURL("category"),{
    type:"get",
    data:{}
}).then((result)=>{
    console.log(result)
    if(result && result.code == '1'){
        let html = template('category-template', result.data);
        //console.log(html)
        $('#navbar').find('ul:eq(0)').html(html);
        return Promise.resolve()
    }else{
        alert(result.msg);
    }
}).then(()=>{
    let currentCategoryId = decodeURIComponent(getQueryString("categoryId"));
    if(currentCategoryId && currentCategoryId !== 'null'){
        $('#navbar').find('ul:eq(0)').find('li:gt(0)').each(function (i,item) {
            var p = /\?categoryId=(.*)/g;
            var href = $(this).find('a').attr('href');
            var categoryId = p.exec(href)[1];
            console.log(href + '>>' + categoryId);
            if(currentCategoryId == categoryId){
                $(this).addClass("active")
            }
        });
    }else{
        $('#navbar').find('ul:eq(0)').find('li').first().addClass("active")
    }
}).catch((err)=>{
    alert(err)
})

//
//sessionStorage.clear();

/*登陆状态检测*/
var customer = sessionStorage.getItem("customer");
if(!customer){
    $('#login_before_div').show();
    $('#login_after_div').hide();
    $('#login_after_myorder_div').hide();
}else{
    //console.log(JSON.parse(user));
    $('#login_before_div').hide();
    $('#login_after_div').show();
    $('#login_after_myorder_div').show();
    $('#shopping-cart-num').html(JSON.parse(customer).shoppingCarCount);
}

/*登陆事件*/
$('#login_before_div').on('click',function () {
    login(function () {
        var customer = sessionStorage.getItem("customer");
        console.log("customer>" + customer);
        $('#login_before_div').hide();
        $('#login_after_div').show();
        $('#login_after_myorder_div').show();
        $('#shopping-cart-num').html(JSON.parse(customer).shoppingCarCount);
    });
})

/*退出登陆*/
$('.out').on('click',function(){
    $(".modal").remove();
    sessionStorage.removeItem("customer");
    $('#login_before_div').show();
    $('#login_after_div').hide();
    $('#login_after_myorder_div').hide();
    $('#shopping-cart-num').html("0");
});

/*点击购物车按钮*/
$('.shopping-cart').on('click',function () {
    var customer = sessionStorage.getItem("customer");
    if(!customer){
        $('#login_before_div').click();
    }else{
        untilFunction.pushRouter="/dist/view/shoppingCart.html";
    }
})