var connect_mongo = require("../connect_mongo")
const fs = require('fs')
const broadcast = require('../../bin/broadcast')
//添加图片
const addNewGood = ({newgood},res)=>{
   //1. 将imgdata这个base64格式图片转换成真正的图片存在资源库里
    // console.log(typeof newgood)  Object
    let {imgdata} = newgood
   //  console.log(newgood,'hello')
   // console.log(typeof imgdata) string
   var base64Data = imgdata.replace(/^data:image\/\w+;base64,/, "");
   var dataBuffer = new Buffer(base64Data, 'base64');
   var reg = /\/(.+?);/g

   var ext = imgdata.match(reg)[0].replace('/','').replace(';','')
   var time = Date.now()
   fs.writeFile("./public/images/goods/news/good"+time+'.'+ext, dataBuffer, function(err) {
     if(err){
       console.log(err)
     }
     //2. 添加到数据库
     delete newgood.imgdata
     newgood.imgurl = '/images/goods/news/good'+time+'.'+ext
     connect_mongo(function(db){
       // console.log(newgood,11111)
      db.collection("goods").insertOne(newgood,(err,results)=>{
        if(err) throw err;
        res.send(results.ops)

        broadcast.broad({type:'1',goodid:results.ops[0]._id})


      })

     })


   });

   

}

module.exports = addNewGood



