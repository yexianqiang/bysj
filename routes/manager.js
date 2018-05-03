var express = require('express');
var router = express.Router();
var connect_mongo = require('../modules/connect_mongo')
var api_handler = require("../modules/api")
var ObjectID = require('mongodb').ObjectID
/* GET users listing. */


router.get('/', function(req, res, next) {
   res.render('manager/login')
});
router.get('/main', function(req, res, next) {
    res.render('manager/main')
 });


 router.get('/login.do', function(req, res, next) {
   
   let params = req.query
    
   if(params.username=='admin'&&params.password=='123'){
        console.log('登陆成功')
        res.send('ok')
    }
 });
router.get('/getBanner',function(req,res,next){
	api_handler.getBanner(res)
})

 router.get('/removeBanner', function(req, res, next) {

     let params = req.query

    api_handler.removeBanner(params,res)
 });

 router.post('/addBanner', function(req, res, next) {
    let params = req.body
    // console.log(params,111)
   api_handler.addBanner(params,res)
});

router.get('/removeGood',function(req,res,next){
	let params = req.query;
	
	connect_mongo((db)=>{
		db.collection("goods").remove({_id:ObjectID(params._id)},(err)=>{
			if(err) throw err;
			res.send('1')
		}) 
		db.close()
	})
})

// 添加商品
router.post('/addNewGood', function(req, res, next) {
    let params = req.body
    // console.log(typeof params) 对象
    api_handler.addNewGood(params,res)
});
// 获取classes 分类
router.get('/getClasses', function(req, res, next) {
    // console.log('getClasses')
    connect_mongo((db)=>{
        db.collection("class").find({}).toArray((err,results)=>{
            if(err) throw err;
            // console.log(results)
            res.send(results)
        })
    })
});
router.get('/addClasses', function(req, res, next) {
    let params = req.query
    connect_mongo((db)=>{
        db.collection("class").insertOne({class:params.newclass,classid:parseFloat(params.classid)},(err,results)=>{
            if(err) throw err;
            console.log(results)
            res.send(results.ops)
        })
        db.close()
    })
});
router.get('/getGoodsById',function(req, res, next){

    let params = req.query
    connect_mongo((db)=>{
        db.collection("goods").find({_id:ObjectID(params._id)}).toArray((err,results)=>{
            if(err) throw err;
            // console.log(results[0])
            res.send(results[0])
        })
        db.close()
    })
})

router.post('/updateGood', function(req, res, next) {
    let params = req.body
    api_handler.updateGood(params,res)
});

// 后台分页特效
router.get('/page',function(req,res,next){
    let params = req.query;
    // console.log(params)
    api_handler.page(params,res)
})


module.exports = router;
