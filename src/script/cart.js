!function ($) {
    const $quan = $(".quan");
    const $jian = $(".jian");
    const $jia = $(".jia01");
    

    function showlist(sid, num) {
        $.ajax({
            url: 'http://localhost/JS-2002/yinping_project/php/taobaodata.php'
        }).done(function (data) {
            let res = JSON.parse(data);
            $.each(res, function (index, value) {
                if (sid == value.sid) {
                    let $clonebox = $('.repeat:hidden').clone(true, true);
                    $clonebox.find('.img10').find('img').attr('src', value.url);
                    $clonebox.find('.img10').find('img').attr('sid', value.sid);
                    $clonebox.find('.title').find('span').html(value.title);
                    $clonebox.find('.three').find('.qian').html(value.price);
                    $clonebox.find('.jia').find('input').val(num);
                    $clonebox.find('.select').find('input').prop("checked", true);

                    $clonebox.find('.three').find('.span01').html((value.price * num).toFixed(2));
                    $clonebox.css('display', 'block');
                    $('#repeat01').append($clonebox);
                    totalprice();
                }
            });

        });
    }

    if ($.cookie('cookiesid') && $.cookie('cookienum')) {
        let s = $.cookie('cookiesid').split(',');
        let number = $.cookie('cookienum').split(',');
        $.each(s, function (index, value) {
            showlist(s[index], number[index]);
        });
    }
    
    let arrsid = [];
    let arrnum = [];
    function arrcookie() {
        if ($.cookie("cookiesid") && $.cookie("cookienum")) {
            arrsid = $.cookie("cookiesid").split(",");
            arrnum = $.cookie("cookienum").split(",");
        } else {
            arrsid = [];
            arrnum = [];
        }
    }

    function setcookie(obj) {
        arrcookie();
        let $sid = obj.parents(".repeat").find(".img10").find("img").attr("sid");
        arrnum[$.inArray($sid, arrsid)] = obj.parents(".repeat").find(".input").val();
        $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
    }

    $quan.on("change", function () {
        $('.repeat:visible').find(".select input").prop("checked", $quan.prop("checked"));
        $quan.prop("checked", $(this).prop("checked"));
        totalprice()
    })
    let inputs = $(".repeat:visible").find(".select input")
    $(".repeat").on("change", inputs, function () {
        if ($(".repeat:visible").find(".select input").length === $(".repeat:visible").find("input:checked").length) {
            $quan.prop("checked", true);
        } else {
            $quan.prop("checked", false);
        }
        totalprice()
    })

    function xiaoji(element) {
        let $danjia = parseFloat(element.parents('.repeat').find('.three .qian').html());
        let $number = parseInt(element.parents('.repeat').find('.input').val());
        return ($danjia * $number).toFixed(2)
    }

    $jia.on("click", function () {
        let $num = $(this).parent().find(".input").val();
        $num++;
        if ($num <= 1) {
            $num = 1;
        }
        $(this).parent().find(".input").val($num);
        $(this).parents(".repeat").find(".span01").html(xiaoji($(this)));
        totalprice();
        setcookie($(this));
    })
    $jian.on("click", function () {
        let $num = $(this).parent().find(".input").val();
        $num--;
        if ($num <= 1) {
            $num = 1;
        }
        $(this).parent().find(".input").val($num);
        $(this).parents(".repeat").find(".span01").html(xiaoji($(this)));
        totalprice();
        setcookie($(this));
    })
    $(".jia .input").on("input", function () {
        let $reg = /^\d+$/g;
        let $value = $(this).val();
        if (!$reg.test($value)) {
            $(this).val(1);
        }
        if ($(this).val() <= 0) {
            $(this).val(1);
        }
        $(this).parents('.repeat').find('.span01').html(xiaoji($(this)));
        totalprice();
        setcookie($(this));
    })

    function totalprice() {
        let sum = 0;
        let total = 0;
        $('.repeat:visible').each(function (index, ele) {
            if ($(ele).find(".select input").prop("checked")) {
                sum += parseInt($(ele).find(".input").val());
                total += parseInt($(ele).find(".span01").html());
            }
        })
        $('.jiesuan').find(".span20").html(sum);
        $('.jiesuan').find(".span30").html(total.toFixed(2));
    }


    function delcookie(sid,arrsid){
        let $index = -1;
        $.each(arrsid,function(index,value){
            if(sid === value){
                $index = index;
            }
        })
        arrsid.splice($index,1);
        arrnum.splice($index,1);
        $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
        $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
    }

    $(".repeat").find(".three").find("a").on("click",function(){
        arrcookie();
        if(window.confirm("你确定要删除吗？")){
            $(this).parents(".repeat").remove();
            delcookie($(this).parents(".repeat").find(".img10").find("img").attr("sid"),arrsid);
        }
        totalprice();
    })

    $(".jiesuan").find("a").on("click",function(){
        arrcookie();
        if(window.confirm("你确定要删除吗？")){
            $('.repeat:visible').each(function(){
                if($(this).find(".select input").prop("checked")){
                    $(this).remove();
                    delcookie($(this).find(".img10").find("img").attr("sid"),arrsid);
                }
            })
            totalprice();
        }
    })



}(jQuery)