!function ($) {
    $("#header").load("header.html");
    $("#footer").load("footer.html");
    let array_default = [];
    let array = [];
    let prev = null;
    let next = null;
    const $oUl = $(".crown ul");
    $.ajax({
        type: "get",
        url: "http://localhost/JS-2002/yinping_project/php/listdata.php"
    }).done(function (res) {
        let resarr = JSON.parse(res);
        let strhtml = '';
        for (let value of resarr) {
            strhtml += `
                <li>
                    <div class="music">
                        <a href="./detail.html?sid=${value.sid}" target="_blank">
                            <img class="lazy" data-original="${value.url}" width="160" height="160"/>
                            <p class="p">${value.title}</p>
                        </a>
                        <span id="price">￥${value.price}</span>
                    </div>
                </li>
            `
        }
        $oUl.html(strhtml);
        $(function () {
            $(".crown img.lazy").lazyload({ effect: "fadeIn" });
        });

        array_default = [];//排序前的li数组
        array = [];//排序中的数组
        prev = null;
        next = null;
        //将页面的li元素加载到两个数组中
        $('.crown li').each(function (index, element) {
            array[index] = $(this);
            array_default[index] = $(this);
        });
    })


    $('.page').pagination({
        pageCount: 4,//总的页数
        jump: true,//是否开启跳转到指定的页数，布尔值。
        coping: true,//是否开启首页和尾页，布尔值。
        prevContent: '上一页',
        nextContent: '下一页',
        homePage: '首页',
        endPage: '尾页',
        callback: function (api) {
            console.log(api.getCurrent());//获取的页码给后端
            $.ajax({
                url: 'http://localhost/JS-2002/yinping_project/php/listdata.php',
                data: {
                    page: api.getCurrent()
                }
            }).done(function (res) {
                let resarr = JSON.parse(res);
                let strhtml = '';
                for (let value of resarr) {
                    strhtml += `
                        <li>
                            <div class="music">
                                <a href="./detail.html?sid=${value.sid}" target="_blank">
                                    <img class="lazy" data-original="${value.url}" width="160" height="160"/>
                                    <p class="p">${value.title}</p>
                                </a>
                                <span id="price">￥${value.price}</span>
                            </div>
                        </li>
                    `
                }
                $oUl.html(strhtml);
                $(function () {
                    $(".crown img.lazy").lazyload({ effect: "fadeIn" });
                });

                array_default = [];//排序前的li数组
                array = [];//排序中的数组
                prev = null;
                next = null;

                //将页面的li元素加载到两个数组中
                $('.crown li').each(function (index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });
            })
        }
    });

    $('.btn1').on('click', function () {
        $.each(array_default, function (index, value) {
            $('.crown ul').append(value);
        });
        return;
    });
    $('.btn2').on('click', function () {
       
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                // alert(parseFloat(array[j].find('#price').html().toString().substring(1)))
                prev = parseFloat(array[j].find('#price').html().toString().substring(1));
                next = parseFloat(array[j + 1].find('#price').html().toString().substring(1));
                //通过价格的判断，改变的是li的位置。
                if (prev > next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        //清空原来的列表，将排序后的数据添加上去。
        //empty() : 删除匹配的元素集合中所有的子节点。
        // $('.list ul').empty();//清空原来的列表
        //这里能够省略empty
        //append在追加的时候，如果追加的是jquery的元素对象，而jquery元素对象在你追加的元素中存在，直接取出存在的元素，从后面追加。
        //如果追加的是内容结构，依然和appendChild一样，后面继续追加。
        $.each(array, function (index, value) {
            console.log(value);//n.fn.init [li, context: li]
            $('.crown ul').append(value);
        });
    });
    $('.btn3').on('click', function () {
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('#price').html().toString().substring(1));
                next = parseFloat(array[j + 1].find('#price').html().toString().substring(1));
                //通过价格的判断，改变的是li的位置。
                if (prev < next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        //清空原来的列表，将排序后的数据添加上去。
        //empty() : 删除匹配的元素集合中所有的子节点。
        // $('.list ul').empty();//清空原来的列表
        $.each(array, function (index, value) {
            $('.crown ul').append(value);
        });
    })
}(jQuery)