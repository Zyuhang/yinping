!function ($) {

    class Lunbo {
        constructor() {
            this.carousel = $(".carousel");
            this.oUl = $(".carousel ul");
            this.picli = $(".carousel ul li");
            this.btnli = $(".carousel ol li");
            this.index = 0;
            this.timer = null;
        }
        init() {
            let _this = this;
            this.btnli.on("click", function () {
                _this.index = $(this).index();
                _this.tebswitch();
            })

            this.timer = setInterval(function () {
                _this.right();
                _this.tebswitch();
            }, 2000)

            this.carousel.hover(function () {
                clearInterval(_this.timer);
            }, function () {
                _this.timer = setInterval(function () {
                    _this.right();
                    _this.tebswitch();
                }, 2000)
            })
        }

        right() {
            this.index++;
            if (this.index > this.btnli.length - 1) {
                this.index = 0;
            }
        }

        tebswitch() {
            this.btnli.eq(this.index).addClass("active").siblings("ol li").removeClass("active");
            this.picli.eq(this.index).stop(true).animate({
                opacity: 1
            }).siblings("ul li").stop(true).animate({
                opacity: 0
            })
        }
    }
    new Lunbo().init();


    class Tab {
        constructor() {
            this.btns = $(".tab a");
            this.items = $(".download .item");
        }
        init() {
            let _this = this;
            this.btns.on("mouseover", function () {
                $(this).addClass("active").siblings("a").removeClass("active");
                _this.items.eq($(this).index()).show().siblings(".item").hide();
            })
        }
    }
    new Tab().init();

    class Top {
        constructor() {
            this.top = $("#top01");
        }
        init() {
            let _this = this;
            $(window).on("scroll", function () {
                let scrollTop = $(window).scrollTop();
                if (scrollTop >= 800) {
                    _this.top.stop(true).animate({
                        top: 0
                    })
                } else {
                    _this.top.stop(true).animate({
                        top: -100
                    })
                }
            })
        }
    }

    new Top().init();

    class Rander01 {
        constructor() {
            this.ul = $(".crown ul");
            this.ol = $(".crown ol");
            this.a = $("h2 a");
            this.strhtml = '';
            this.resarr = null;
        }
        init() {
            let _this = this;
            console.log(this.ul);
            $.ajax({
                type: "get",
                url: "http://localhost/JS-2002/yinping_project/php/taobaodata.php"
            }).done(function (res) {
                _this.resarr = JSON.parse(res);
                console.log(_this.resarr);
                for (let $i = 0; $i < 5; $i++) {
                    _this.strhtml += `
                            <li>
                                <div class="music">
                                    <a href="./list.html" target="_blank">
                                        <img class="lazy" data-original="${_this.resarr[$i].url}" width="160" height="160"/>
                                        <p class="p">${_this.resarr[$i].title}</p>
                                    </a>
                                    <span>￥${_this.resarr[$i].price}</span>
                                </div>
                            </li>
                        `
                }
                _this.ul.html(_this.strhtml);

                $(function () {
                    $(".crown ul img.lazy").lazyload({ effect: "fadeIn" });
                });
            })
            this.a.on("click", () => {
                if (this.ul.css("display") == "block") {
                    this.ul.css({
                        display: "none"
                    });
                    this.ol.css({
                        display: "block"
                    });
                } else {
                    this.ul.css({
                        display: "block"
                    });
                    this.ol.css({
                        display: "none"
                    });
                }

            })
        }
    }

    new Rander01().init();


    class Rander02 {
        constructor() {
            this.ol = $(".crown ol");
            this.strhtml = '';
            this.resarr = null;
        }
        init() {
            let _this = this;
            $.ajax({
                type: "get",
                url: "http://localhost/JS-2002/yinping_project/php/taobaodata.php"
            }).done(function (res) {
                _this.resarr = JSON.parse(res);
                for (let $i = 5; $i < 10; $i++) {
                    _this.strhtml += `
                            <li>
                                <div class="music">
                                    <a href="./list.html" target="_blank">
                                        <img class="lazy" data-original="${_this.resarr[$i].url}" width="160" height="160"/>
                                        <p class="p">${_this.resarr[$i].title}</p>
                                    </a>
                                    <span>￥${_this.resarr[$i].price}</span>
                                </div>
                            </li>
                        `
                }
                _this.ol.html(_this.strhtml);

                $(function () {
                    $(".crown ol img.lazy").lazyload({ effect: "fadeIn" });
                });
            })
        }
    }

    new Rander02().init();


    class Rander03 {
        constructor() {
            this.music_rander = $(".music_rander");
            this.strhtml = '';
            this.resarr = null;
        }
        init() {
            let _this = this;
            $.ajax({
                type: "get",
                url: "http://localhost/JS-2002/yinping_project/php/taobaodata.php"
            }).done(function (res) {
                _this.resarr = JSON.parse(res);
                for (let value of _this.resarr) {
                    _this.strhtml += `
                        <div class="music_left">
                            <a href="./list.html" target="_blank">
                                <div class="top_left">
                                    <p class="p1">限时立减249元 操作简单快速</p>
                                    <p class="p2">${value.title}</p>
                                    <span>￥${value.price}</span>
                                </div>
                                <div class="top_right">
                                    <img class="lazy" data-original="${value.url}" width="160" height="160"/>
                                </div>
                            </a>
                        </div>
                        `
                }
                _this.music_rander.html(_this.strhtml);
                $(function () {
                    $(".music_rander img.lazy").lazyload({ effect: "fadeIn" });
                });
            })
        }
    }

    new Rander03().init();

}(jQuery)