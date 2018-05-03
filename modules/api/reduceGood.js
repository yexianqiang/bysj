var connect_mongo = require("../connect_mongo")
//处理前台请求减少购物车商品的操作
const reduceGood = ({uid,goodid,num},res)=>{
    //找到这个用户在cars集合里对应的文档
    // console.log(goodid)
    num = parseFloat(num)
    connect_mongo((db)=>{
      let cars = db.collection("cars")
      cars.find({uid}).toArray((err,results)=>{
        if(err) throw err       // cars 里面好几条用户的数据
          let ucar = results[0]     // ucar 数组里的 需要用户的数据
          let  goods = ucar.goods
          for(var i =0;i<goods.length;i++) {
            if(goods[i].goodid==goodid){   // console.log(goods[i].goodid)这里面打印的字符 

              goods[i].num--;
              if(goods[i].num==0){
                goods.splice(i,1) // 截取整个数组里面的对象
              }
              break;
            }
          }
          //更新用户的购物车数据
          cars.update({uid},{$set:{goods:ucar.goods}},(err,results)=>{
            if(err) throw err;
            // console.log(results)
              res.send(goods)
          })
        })


    })


}

module.exports = reduceGood



