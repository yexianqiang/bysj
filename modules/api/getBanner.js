
var connect_mongo = require("../connect_mongo")

const getBanner = (res)=>{
	connect_mongo((db)=>{
		db.collection('banner').find({}).toArray((err,banners)=>{
			if(err) throw err;
			res.send(banners)
		})
		db.close()
	})
}

module.exports = getBanner