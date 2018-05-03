var connect_mongo = require("../connect_mongo")
//处理前台请求商品的操作
const page = (params,res)=>{
    let {classid} = params//classid为类型 order为排序依据
    connect_mongo((db)=>{
      let goods = db.collection("goods")
      //console.log(goods)
      // console.log(goods.find({}))
      // if(parseFloat(classid)){
      //    //
      // }
      // 
      classid = parseFloat(classid) // classid 一定要把它 转出 数值类型
      goods.find({classid}).toArray((err,results)=>{
        if(err) throw err;
        // console.log(results)
        res.send(results)
        db.close()
      })
    })

}

module.exports = page



