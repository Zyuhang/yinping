"use strict";var _createClass=function(){function s(t,i){for(var n=0;n<i.length;n++){var s=i[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(t,i,n){return i&&s(t.prototype,i),n&&s(t,n),t}}();function _classCallCheck(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}!function(o){function t(){_classCallCheck(this,t),this.carousel=o(".carousel"),this.oUl=o(".carousel ul"),this.picli=o(".carousel ul li"),this.btnli=o(".carousel ol li"),this.index=0,this.timer=null}function i(){_classCallCheck(this,i),this.btns=o(".tab a"),this.items=o(".download .item")}function n(){_classCallCheck(this,n),this.top=o("#top01")}function s(){_classCallCheck(this,s),this.ul=o(".crown ul"),this.ol=o(".crown ol"),this.a=o("h2 a"),this.strhtml="",this.resarr=null}function a(){_classCallCheck(this,a),this.ol=o(".crown ol"),this.strhtml="",this.resarr=null}function l(){_classCallCheck(this,l),this.music_rander=o(".music_rander"),this.strhtml="",this.resarr=null}(new(_createClass(t,[{key:"init",value:function(){var t=this;this.btnli.on("click",function(){t.index=o(this).index(),t.tebswitch()}),this.timer=setInterval(function(){t.right(),t.tebswitch()},2e3),this.carousel.hover(function(){clearInterval(t.timer)},function(){t.timer=setInterval(function(){t.right(),t.tebswitch()},2e3)})}},{key:"right",value:function(){this.index++,this.index>this.btnli.length-1&&(this.index=0)}},{key:"tebswitch",value:function(){this.btnli.eq(this.index).addClass("active").siblings("ol li").removeClass("active"),this.picli.eq(this.index).stop(!0).animate({opacity:1}).siblings("ul li").stop(!0).animate({opacity:0})}}]),t)).init(),(new(_createClass(i,[{key:"init",value:function(){var t=this;this.btns.on("mouseover",function(){o(this).addClass("active").siblings("a").removeClass("active"),t.items.eq(o(this).index()).show().siblings(".item").hide()})}}]),i)).init(),(new(_createClass(n,[{key:"init",value:function(){var t=this;o(window).on("scroll",function(){800<=o(window).scrollTop()?t.top.stop(!0).animate({top:0}):t.top.stop(!0).animate({top:-100})})}}]),n)).init(),(new(_createClass(s,[{key:"init",value:function(){var t=this,n=this;console.log(this.ul),o.ajax({type:"get",url:"http://localhost/JS-2002/yinping_project/php/taobaodata.php"}).done(function(t){n.resarr=JSON.parse(t),console.log(n.resarr);for(var i=0;i<5;i++)n.strhtml+='\n                            <li>\n                                <div class="music">\n                                    <a href="./list.html" target="_blank">\n                                        <img class="lazy" data-original="'+n.resarr[i].url+'" width="160" height="160"/>\n                                        <p class="p">'+n.resarr[i].title+"</p>\n                                    </a>\n                                    <span>￥"+n.resarr[i].price+"</span>\n                                </div>\n                            </li>\n                        ";n.ul.html(n.strhtml),o(function(){o(".crown ul img.lazy").lazyload({effect:"fadeIn"})})}),this.a.on("click",function(){"block"==t.ul.css("display")?(t.ul.css({display:"none"}),t.ol.css({display:"block"})):(t.ul.css({display:"block"}),t.ol.css({display:"none"}))})}}]),s)).init(),(new(_createClass(a,[{key:"init",value:function(){var n=this;o.ajax({type:"get",url:"http://localhost/JS-2002/yinping_project/php/taobaodata.php"}).done(function(t){n.resarr=JSON.parse(t);for(var i=5;i<10;i++)n.strhtml+='\n                            <li>\n                                <div class="music">\n                                    <a href="./list.html" target="_blank">\n                                        <img class="lazy" data-original="'+n.resarr[i].url+'" width="160" height="160"/>\n                                        <p class="p">'+n.resarr[i].title+"</p>\n                                    </a>\n                                    <span>￥"+n.resarr[i].price+"</span>\n                                </div>\n                            </li>\n                        ";n.ol.html(n.strhtml),o(function(){o(".crown ol img.lazy").lazyload({effect:"fadeIn"})})})}}]),a)).init(),(new(_createClass(l,[{key:"init",value:function(){var r=this;o.ajax({type:"get",url:"http://localhost/JS-2002/yinping_project/php/taobaodata.php"}).done(function(t){r.resarr=JSON.parse(t);var i=!0,n=!1,s=void 0;try{for(var a,l=r.resarr[Symbol.iterator]();!(i=(a=l.next()).done);i=!0){var e=a.value;r.strhtml+='\n                        <div class="music_left">\n                            <a href="./list.html" target="_blank">\n                                <div class="top_left">\n                                    <p class="p1">限时立减249元 操作简单快速</p>\n                                    <p class="p2">'+e.title+"</p>\n                                    <span>￥"+e.price+'</span>\n                                </div>\n                                <div class="top_right">\n                                    <img class="lazy" data-original="'+e.url+'" width="160" height="160"/>\n                                </div>\n                            </a>\n                        </div>\n                        '}}catch(t){n=!0,s=t}finally{try{!i&&l.return&&l.return()}finally{if(n)throw s}}r.music_rander.html(r.strhtml),o(function(){o(".music_rander img.lazy").lazyload({effect:"fadeIn"})})})}}]),l)).init()}(jQuery);