/**
 * Created by shitengteng on 2017/5/17.
 * URL目前全部是json文件 以后连调将修改为接口路径
 */



var Map1=function(){
    this.mapArr={};
    this.arrlength=0;
    //假如有重复key，则不存入
    this.put=function(key,value){
        if(!this.containsKey(key)){
            this.mapArr[key]=value;
            this.arrlength=this.arrlength+1;
        }
    }
    this.get=function(key){
        return this.mapArr[key];
    }
    //传入的参数必须为Map结构
    this.putAll=function(map){
        if(Map.isMap(map)){
            var innermap=this;
            map.each(function(key,value){
                innermap.put(key,value);
            })
        }else{
            alert("传入的非Map结构");
        }
    }
    this.remove=function(key){
        delete this.mapArr[key];
        this.arrlength=this.arrlength-1;
    }
    this.size=function(){
        return this.arrlength;
    }

    //判断是否包含key
    this.containsKey=function(key){
        return (key in this.mapArr);
    }
    //判断是否包含value
    this.containsValue=function(value){
        for(var p in this.mapArr){
            if(this.mapArr[p]==value){
                return true;
            }
        }
        return false;
    }
    //得到所有key 返回数组
    this.keys=function(){
        var keysArr=[];
        for(var p in this.mapArr){
            keysArr[keysArr.length]=p;
        }
        return keysArr;
    }
    //得到所有value 返回数组
    this.values=function(){
        var valuesArr=[];
        for(var p in this.mapArr){
            valuesArr[valuesArr.length]=this.mapArr[p];
        }
        return valuesArr;
    }

    this.isEmpty=function(){
        if(this.size()==0){
            return false;
        }
        return true;
    }
    this.clear=function(){
        this.mapArr={};
        this.arrlength=0;
    }
    //循环
    this.each=function(callback){
        for(var p in this.mapArr){
            callback(p,this.mapArr[p]);
        }

    }


}
//判断是否是map对象
Map1.isMap=function(map){
    return  (map instanceof Map1);
}

let map=new Map1();
let IP='./';

/*测试环境*/


// // 研发环境


//正式环境


/*let head_2 = 'http://jymall.joyoung.com';
 let head_1 = 'http://jymall.joyoung.com';
 map.put("appid", "wx7534ac023f47ef84");
 map.put("domainName", "http://jymall.joyoung.com");*/

//商品分类
map.put("classification", IP+"../../src/json/classification.json");
map.put("homebanner", IP+"../../src/json/homebanner.json");
map.put("category", IP+"../../src/json/category.json");
map.put("categoryGoods", IP+"../../src/json/categoryGoods.json");
map.put("goGroup", IP+"../../src/json/goGroup.json");
map.put("goodsImage", IP+"../../src/json/goodsImage.json");

map.put("goodsDetail", IP+"../../src/json/goodsDetail.json");
map.put("reviewList", IP+"../../src/json/reviewList.json");
map.put("propertieValues", IP+"../../src/json/propertieValues.json");
map.put("recommandGoodsByGoodsDetail", IP+"../../src/json/recommandGoodsByGoodsDetail.json");

//加入购物车
map.put("addShoppingCart", IP+"../../src/json/addShoppingCart.json");
//删除购物车数据
map.put("removeShoppingCart", IP+"../../src/json/removeShoppingCart.json");
//结算 默认地址
map.put("defaultAddress", IP+"../../src/json/defaultAddress.json");
//满减券列表
map.put("couponList", IP+"../../src/json/couponList.json");
//提交订单
map.put("submitOrder", IP+"../../src/json/submitOrder.json");
map.put("recommandGoodsByGoodsDetail", IP+"../../src/json/recommandGoodsByGoodsDetail.json");

map.put("shoppingCarts", IP+"../../src/json/shoppingCarts.json");


map.put("loginByTelephone", IP+"../../src/json/loginByTelephone.json");
map.put("sendValidateCode", IP+"../../src/json/sendValidateCode.json");








let UrlUtil ={
    getURL(key) {
        return map.get(key);
    }
}
export default UrlUtil
