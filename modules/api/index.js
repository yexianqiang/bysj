
var login = require('./login')
var register = require('./register')
var getGoods = require('./getGoods')
var getGoodsInList = require('./getGoodsInList')
var addGood = require('./addGood')
var removeGood = require('./removeGood')


var reduceGood = require('./reduceGood')
var getBanner = require('./getBanner')
var removeBanner = require('./removeBanner')
var addBanner = require('./addBanner')
var addNewGood = require('./addNewGood')
var updateGood = require('./updateGood')
var page = require('./page')

const api_handler = {
    login,register,getGoods,getGoodsInList,addGood,reduceGood,removeGood,getBanner,removeBanner,addBanner,addNewGood,updateGood,page
}

module.exports = api_handler