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


    class Tab{
        constructor(){
            this.btns = $(".tab a");
            this.items = $(".download .item");
        }
        init(){
            let _this = this;
            this.btns.on("mouseover",function(){                
                $(this).addClass("active").siblings("a").removeClass("active");
                _this.items.eq($(this).index()).show().siblings(".item").hide();
            })
        }
    }
    new Tab().init();
}(jQuery)