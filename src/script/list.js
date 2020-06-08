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
        console.log(resarr);
        let strhtml = '';
        for (let value of resarr) {
            strhtml += `
                <li>
                    <div class="music">
                        <a href="./detail.html?sid=${value.sid}" target="_blank">
                            <img class="lazy" data-original="${value.url}" width="160" height="160"/>
                            <p class="p">${value.title}</p>
                        </a>
                        <span>￥${value.price}</span>
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
                console.log(resarr);
                let strhtml = '';
                for (let value of resarr) {
                    strhtml += `
                        <li>
                            <div class="music">
                                <a href="./detail.html?sid=${value.sid}" target="_blank">
                                    <img class="lazy" data-original="${value.url}" width="160" height="160"/>
                                    <p class="p">${value.title}</p>
                                </a>
                                <span>￥${value.price}</span>
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
}(jQuery)