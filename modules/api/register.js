

const register = (db,res,params)=>{

	let users = db.collection('users') //找见了集合

	users.find({username:params.username}).toArray((err,results)=>{
		// console.log('haha')
		if(err) throw err;
		if(results.length){
       //这个用户已经存在了
       res.send('0')
       db.close()
     }else{
        users.insertOne(params,(err,result)=>{
          if(result.insertedCount==1){//插入条数
            //注册成功
            res.send('1')
          }else{res.send('0')}
          
          db.close()
        })

     }
	})
}

module.exports = register