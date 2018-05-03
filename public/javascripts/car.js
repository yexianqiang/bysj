//处理购物车操作的js


var car = {
    init:function(){
        this.addEvent()
        
        $(".goods").delegate(".add-btn","click",function(e){
           
        })
        
    },
    addGood:function(params,cb){
        //发送请求到服务端
        $.ajax({
            url:"/goods/addGood",
            data:params,
            success:cb
        })
    },

    addEvent:function(){
        let that = this
        $(".goods").delegate(".add-btn","click",function(e){
            // 这里用户名通过cookie 拿出来 传到数据库中
            let inp = this
            var user_info = $.cookie("user_info")?JSON.parse($.cookie("user_info")):{}
            if(user_info.uid){//登陆验证成功后传入用户id和商品id
                that.addGood({uid:user_info.uid,goodid:$(this).data('id')},function(results){
                    // console.log(results)
                    let $img = $(inp).parents('.thumbnail').find('img')                   
                    $img.removeClass("jello")
                    setTimeout(function () {//给浏览器提个醒
                        $img.addClass("jello")
                    },100)
                })
            }else{
                alert('请登陆后操作')
                window.location.href="/login"
            }
            
        })

       
    },
    reduceGood:function(params,cb){
        $.ajax({
            url:"/goods/reduceGood",
            data:params,
            success:cb
        })
    },
    // 移除商品
    removeGood:function(params,callback){
        $.ajax({
            url:"/goods/removeGood",
            data:params,
            success:callback
        })
    }
}

