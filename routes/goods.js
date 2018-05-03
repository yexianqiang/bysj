var express = require('express');
var router = express.Router();
var connect_mongo = require('../modules/connect_mongo')
var api_handler = require("../modules/api")
/* GET users listing. */


router.get('/getGoods', function(req, res, next) {
    let params = req.query
    api_handler.getGoods(params,res)
});

router.get('/getGoodsInList', function(req, res, next) {
    let params = req.query
    api_handler.getGoodsInList(params,res)
});

router.get('/addGood', function(req, res, next) {
    let params = req.query // 原来是  get地址 url req 中 传的
    api_handler.addGood(params,res)
});

// 购物车减少商品
router.get('/reduceGood', function(req, res, next) {
    let params = req.query
    api_handler.reduceGood(params,res)
});

// remove 商品
router.get('/removeGood',(req,res,next)=>{
	let params = req.query
	api_handler.removeGood(params,res)
})
module.exports = router;
