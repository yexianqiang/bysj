

//处理登陆操作的函数，第一个参数是库对象，第二个是响应对象，第三个是参数

const login = (db,res,params)=>{
	//获取到对应的集合collection
	
	let users = db.collection('users')
	
	console.log(params)
	users.find({username:params.username,password:params.password}).toArray((err,results)=>{  // 如果可以找到 用户名和密码 数据库 返回所有信息
		if(err) throw err;
		// console.log(results)
		if(results.length){
			// res.send('1')
			if(results[0].isOnline){
				res.send('1') // 判断有没有登录 在login.ejs 里面判断
			}else{  // 没人登录的操作
				users.update({username:params.username},{$set:{isOnline:true}},(err)=>{
					res.send({uid:results[0]._id,nickname:results[0].nickname}) //express会处理为字符串
				})
			}
			
			
		}else{
			res.send('0')
		}
		db.close() // 断开数据库
	})
	
}



module.exports = login


