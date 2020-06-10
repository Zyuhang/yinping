!function($){
    function showlist(sid, num) { //sid：编号  num：数量
        $.ajax({
            url: 'http://localhost/JS-2002/yinping_project/php/taobaodata.php'
        }).done(function(data) {
            let res = JSON.parse(data);             
            $.each(res, function(index, value) {
                if (sid == value.sid) {
                    let $clonebox = $('.repeat:hidden').clone(true, true); //克隆隐藏元素
                    $clonebox.find('.img10').find('img').attr('src', value.url);
                    $clonebox.find('.img10').find('img').attr('sid', value.sid);
                    $clonebox.find('.title').find('span').html(value.title);
                    $clonebox.find('.three').find('.qian').html(value.price);
                    $clonebox.find('.jia').find('input').val(num);
                    //计算单个商品的价格
                    $clonebox.find('.three').find('.span01').html((value.price * num).toFixed(2));
                    $clonebox.css('display', 'block');
                    $('#repeat01').append($clonebox);
                    // calcprice(); //计算总价
                }
            });

        });
    }

    //2.获取cookie渲染数据
    if ($.cookie('cookiesid') && $.cookie('cookienum')) {
        let s = $.cookie('cookiesid').split(','); //获取cookie 同时转换成数组[1,2]
        let n = $.cookie('cookienum').split(','); //获取cookie 同时转换成数组[10,20]
        $.each(s, function(index, value) {
            showlist(s[index], n[index]);
        });
    }
}(jQuery)