var connect_mongo = require("../connect_mongo")
const fs = require('fs')
// console.log(fs)
//添加图片
const addBanner = ({title,imgdata},res)=>{
   //1. 将imgdata这个base64格式图片转换成真正的图片存在资源库里
   // res.send('world')
   var base64Data = imgdata.replace(/^data:image\/\w+;base64,/, "");
   var dataBuffer = new Buffer(base64Data, 'base64');
   var reg = /\/(.+?);/g

   var ext = imgdata.match(reg)[0].replace('/','').replace(';','')
   var time = Date.now()
   fs.writeFile("./public/images/banners/banner"+Date.now()+'.'+ext, dataBuffer, function(err) {
     if(err){
       console.log(err)
     }


     	connect_mongo(function(db){

	      db.collection("banner").insertOne({title,imgurl:'/images/banners/banner'+time+'.'+ext},(err,results)=>{
	        if(err) throw err;
	        res.send(results.ops)
	      })

	     })
   });
   
   // console.log(__dirname)
   // res.send('1')
   //2. 添加到数据库

}

module.exports = addBanner



