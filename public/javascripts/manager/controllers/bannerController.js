
app.controller('bannerController',function($scope,_http){
	_http({
        url:'/manager/getBanner',
        success:function(results){
        	// console.log(results)
            $scope.banners = results
        }
    })
    $scope.removeBanner = function(_id,index){
        _http({
            url:'/manager/removeBanner',
            data:{_id:_id},
            success:function(results){
                if(results == 1){
                	alert('移除成功')
                	$scope.banners.splice(index,1)
                }
            }
        })
    }

    // 增加图片
    $scope.uploadImg = function(){
        var inp = document.getElementsByClassName('uploadinp')[0]
        var img = inp.files[0]
        var reader = new FileReader()
        reader.readAsDataURL(img)//转换为base64
        reader.onload = function (e) {
            // console.log(this.result)

            _http({
                url:'/manager/addBanner',
                type:'post',
                data:{
                    title:$scope.title,
                    imgdata:this.result
                    
                },success:function(results){
                    // console.log(results)
                    if(results){
                        alert('上传成功')
                        $scope.banners.push(results[0])
                        $scope.isUploadShow = false
                    }
                }
            })
        }
    }
})