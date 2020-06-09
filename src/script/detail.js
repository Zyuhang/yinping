!function ($) {
    let $sid = location.search.substring(1).split("=")[1];
    const $simg = $(".small img");
    const $bimg = $(".bimg");
    const $title = $(".title");
    const $span = $(".span");

    if (!$sid) {
        $sid = 1
    }
    $.ajax({
        type: "get",
        url: "http://localhost/JS-2002/yinping_project/php/detail.php",
        data: {
            sid: $sid
        }
    }).done(function (data) {
        let res = JSON.parse(data);
        $simg.attr("src", res.url);
        $simg.attr("sid", res.sid);
        $bimg.attr("src", res.url);
        $title.html(res.title);
        $span.html(res.price);

        let picarr = res.piclisturl.split(',');
        let strhtml = '';
        $.each(picarr, function (index, value) {
            strhtml += '<li><img src="' + value + '"/></li>';
        });
        $('.list ul').html(strhtml);
    })

    const $small = $(".small");
    const $shade = $(".shade");
    const $big = $(".big");
    const $particulars_left = $(".particulars_left");
    const $left = $('.a1');
    const $right = $('.a2');
    const $list = $('.list');

    $shade.width($big.width() * $simg.width() / $bimg.width());
    $shade.height($big.height() * $simg.height() / $bimg.height());
    let scale = $bimg.width() / $simg.width();

    $small.hover(function () {
        $shade.css('visibility', 'visible');
        $big.css('visibility', 'visible');
        $(this).on("mousemove", function (ev) {
            var ev = ev || window.event;
            let leftvalue = ev.pageX - $particulars_left.offset().left - $shade.width() / 2;
            let topvalue = ev.pageY - $particulars_left.offset().top - $shade.height() / 2;
            if (leftvalue < 0) {
                leftvalue = 0;
            } else if (leftvalue > $small.width() - $shade.width()) {
                leftvalue = $small.width() - $shade.width()
            }
            if (topvalue < 0) {
                topvalue = 0;
            } else if (topvalue > $small.height() - $shade.height()) {
                topvalue = $small.height() - $shade.height()
            }
            $shade.css({
                left: leftvalue,
                top: topvalue
            })
            $bimg.css({
                left: -leftvalue * scale,
                top: -topvalue * scale
            })
        })
    }, function () {
        $shade.css('visibility', 'hidden');
        $big.css('visibility', 'hidden');
    })


    $('.list ul').on('click', 'li', function () {
        //$(this):当前操作的li
        let $imgurl = $(this).find('img').attr('src');
        $simg.attr('src', $imgurl);
        $bimg.attr('src', $imgurl);
    });

    //左右箭头事件
    let $num = 4; //列表显示的图片个数
    $right.on('click', function () {
        let $lists = $('.list ul li');
        if ($lists.size() > $num) { //限制点击的条件
            $num++;
            $left.css('color', '#333');
            if ($lists.size() == $num) {
                $right.css('color', '#fff');
            }
            $('.list ul').animate({
                left: -($num - 4) * $lists.eq(0).outerWidth(true)
            });
        }
    });


    $left.on('click', function () {
        let $lists = $('.list ul li');
        if ($num > 4) { //限制点击的条件
            $num--;
            $right.css('color', '#333');
            if ($num <= 4) {
                $left.css('color', '#fff');
            }
            $('.list ul').animate({
                left: -($num - 4) * $lists.eq(0).outerWidth(true)
            });
        }
    });

    const $jia = $(".jian");
    const $jian = $(".jia01");
    const $input = $(".jia input");

    $jia.on("click", function () {
        let $num = $input.val();
        $num++;
        $input.val($num);
    })
    $jian.on("click", function () {
        let $num = $input.val();
        $num--;
        if ($num === 0) {
            $num = 1;
            return false;
        }
        $input.val($num);
    })
    $input.on("input", function () {
        if ($input.val() <= 0) {
            $input.val(1);
        }
    })


    let arrsid = [];
    let arrnum = [];
    const $btn = $(".jia_center button");
    const $btn01 = $(".jia_right button");

    $btn01.on("click",function(){
        location.href = "http://localhost/JS-2002/yinping_project/src/cart.html";
    })

    function arrcookie() {
        if ($.cookie("cookiesid") && $.cookie("cookienum")) {
            arrsid = $.cookie("cookiesid").split(",");
            arrnum = $.cookie("cookienum").split(",");
        } else {
            arrsid = [];
            arrnum = [];
        }
    }

    $btn.on("click", function () {
        let $sid = $simg.attr('sid');
        arrcookie();
        if ($.inArray($sid, arrsid) != -1) {
            let $num = parseInt(arrnum[$.inArray($sid, arrsid)]) + parseInt($input.val());
            arrnum[$.inArray($sid, arrsid)] = $num;
            $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
        } else {
            arrsid.push($sid);
            $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
            arrnum.push($input.val());
            $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
        }
        alert('已加入购物车');
    })
}(jQuery)