var connect_mongo = require("../connect_mongo")
//处理前台请求删除购物车商品的操作
const removeGood = ({uid,goodid},res)=>{
    //找到这个用户在cars集合里对应的文档
    connect_mongo((db)=>{
      let cars = db.collection("cars")
      cars.find({uid}).toArray((err,results)=>{
        if(err) throw err
          let ucar = results[0]   
          let goods = ucar.goods
          for(var i = 0;i<goods.length;i++) {
            if(goods[i].goodid==goodid){              
                goods.splice(i,1)
              break;
            }
          }
          // 
          cars.update({uid},{$set:{goods:ucar.goods}},(err,results)=>{
            if(err) throw err;
            res.send(goods)
          })
        })


    })


}

module.exports = removeGood



