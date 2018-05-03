
app.service("data",function(){

})
app.controller('goodsController',function($scope,_http,$rootScope,data){
    $scope.isUpdateShow = {flag:false}
	$scope.newgood = {};
    $scope.classes = []
    $scope.newgood.classid = 1
	_http({
		url:"/goods/getGoods",
		success:function(results){
			$scope.goods = results
		}
	})
	// 删除商品
	$scope.removeGood = function(_id,index){

		// alert('删除成功')
		_http({
			url:"/manager/removeGood",
			data:{_id:_id},
			success:function(results){
				if(results == '1'){
					alert('删除成功')
					$scope.goods.splice(index,1)
				}
			}
		})
	}
	// 添加 商品
	$scope.addGood = function () {
        var inp = document.getElementsByClassName('uploadinp_add')[0]
        var img = inp.files[0]
        var reader = new FileReader()
        reader.readAsDataURL(img)//转换为base64
        reader.onload = function (e) {
        	// console.log(this.result)
            $scope.newgood.imgdata = this.result
            // console.log($scope.newgood)
            _http({
                url:'/manager/addNewGood',
                type:'post',
                data:{
                    newgood:$scope.newgood   // 这里面$scope.newgood 是一个对象里面包含各种数据
                },success:function(results){
                	console.log(results)
                    if(results){
                        alert('添加成功')
                        $scope.goods.push(results[0])
                        $scope.isModalShow = false
                    }
                }
            })
        }
    }
    // 作出分类
    _http({
        url:"/manager/getClasses",
        success:function(results){
            // console.log(results)  // [{…}, {…}, {…}, {…}, {…}, {…}]
            $scope.classes = results
            // console.log($scope.classes)  // [{…}, {…}, {…}, {…}, {…}, {…}]
            data.classes = results // 添加全局变量
            // console.log($scope.classes)
        }
    })    
    // 添加 分类
    $scope.addClasses=function(){
        // alert('hello')
        _http({
            url:"/manager/addClasses",
            data:{newclass:$scope.newclass,classid:$scope.classes.length+1},
            success:function(results){
                
                if(results){

                    $scope.classes.push(results[0])

                }
            }
        })
    }
    $scope.updateShow = function(_id){

        $scope.isUpdateShow.flag = true
        //获取此商品的信息，在updateController里面用
        _http({
            url:'/manager/getGoodsById',
            data:{_id:_id},
            success:function(good){
                // console.log(good)
                $rootScope.nowgood = good  //   该商品中的信息 并把它们放在编辑框中
                // console.log($rootScope.nowgood)
            }
        })


    }
    $scope.page = function(classid){
        // console.log(classid)
        _http({
            type:'GET',
            url:'/manager/page',
            data:{classid:classid},
            success:function(results){
                // console.log(results)
                $scope.goods = results
            }
        })
    }
    

    
})
app.controller("updateController",function($scope,_http,data,$rootScope){
    $scope.data = data   //  这是一个空对象
    // console.log($scope.data.classes)
    $scope.addClasses= function(){
        // console.log($scope.data.classes.length) 
        // 怎么删除 添加的 分类呢呢
        _http({
            url:"/manager/addClasses",
            data:{newclass:$scope.newclass,classid:$scope.data.classes.length+1},
            success:function(results){ 
                if(results){
                    $scope.data.classes.push(results[0])
                }
            }
        })
    }
    $scope.update = function (){
        // console.log($rootScope.nowgood)
        var inp = document.getElementsByClassName('uploadinp_update')[0]
        if(inp.files.length){
            var img = inp.files[0]
            var reader = new FileReader()
            reader.readAsDataURL(img)//转换为base64
            reader.onload = function (e) {
                $rootScope.nowgood.imgdata = this.result
                updateGood($rootScope)
            }
        }else{
            updateGood($rootScope) // $rootScope 就是一个 内置对象
            // console.log($rootScope)
        }     
    }
    function updateGood($rootScope) {
        _http({
            url:'/manager/updateGood',
            type:'post',
            data:{
                nowgood:$rootScope.nowgood
            },success:function(results){
                // console.log(results)
                if(results){
                    alert('更改成功')
                    //更改页面中的此商品
                    for(var i=0;i<$scope.goods.length;i++){
                        if($scope.goods[i]._id==results._id){
                            $scope.goods[i]=results
                            break;
                        }
                    }
                    $scope.isUpdateShow.flag = false
                }
            }
        })
    }
    

})



// db.class.deleteMany({"classid":4})
// db.class.update({"class":"图片"},{$set:{"classid":5}})
// 
// 
//  做后台分类商品
