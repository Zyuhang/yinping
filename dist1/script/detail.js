"use strict";!function(l){var i=location.search.substring(1).split("=")[1],c=l(".small img"),e=l(".bimg"),a=l(".title"),n=l(".span"),i=i||1;l.ajax({type:"get",url:"http://localhost/JS-2002/yinping_project/php/detail.php",data:{sid:i}}).done(function(i){var t=JSON.parse(i);c.attr("src",t.url),c.attr("sid",t.sid),e.attr("src",t.url),a.html(t.title),n.html(t.price);var o=t.piclisturl.split(","),s="";l.each(o,function(i,t){s+='<li><img src="'+t+'"/></li>'}),l(".list ul").html(s)});var s=l(".small"),r=l(".shade"),t=l(".big"),h=l(".particulars_left"),o=l(".a1"),u=l(".a2");l(".list");r.width(t.width()*c.width()/e.width()),r.height(t.height()*c.height()/e.height());var p=e.width()/c.width();s.hover(function(){r.css("visibility","visible"),t.css("visibility","visible"),l(this).on("mousemove",function(i){var t=(i=i||window.event).pageX-h.offset().left-r.width()/2,o=i.pageY-h.offset().top-r.height()/2;t<0?t=0:t>s.width()-r.width()&&(t=s.width()-r.width()),o<0?o=0:o>s.height()-r.height()&&(o=s.height()-r.height()),r.css({left:t,top:o}),e.css({left:-t*p,top:-o*p})})},function(){r.css("visibility","hidden"),t.css("visibility","hidden")}),l(".list ul").on("click","li",function(){var i=l(this).find("img").attr("src");c.attr("src",i),e.attr("src",i)});var f=4;u.on("click",function(){var i=l(".list ul li");i.size()>f&&(f++,o.css("color","#333"),i.size()==f&&u.css("color","#fff"),l(".list ul").animate({left:-(f-4)*i.eq(0).outerWidth(!0)}))}),o.on("click",function(){var i=l(".list ul li");4<f&&(f--,u.css("color","#333"),f<=4&&o.css("color","#fff"),l(".list ul").animate({left:-(f-4)*i.eq(0).outerWidth(!0)}))});var v=l(".jian"),d=l(".jia01"),g=l(".jia input");v.on("click",function(){var i=g.val();i++,g.val(i)}),d.on("click",function(){var i=g.val();if(0===--i)return!(i=1);g.val(i)}),g.on("input",function(){g.val()<=0&&g.val(1)});var k=[],m=[],w=l(".jia_center button");l(".jia_right button").on("click",function(){location.href="http://localhost/JS-2002/yinping_project/src/cart.html"}),w.on("click",function(){var i,t=c.attr("sid");m=l.cookie("cookiesid")&&l.cookie("cookienum")?(k=l.cookie("cookiesid").split(","),l.cookie("cookienum").split(",")):(k=[],[]),-1!=l.inArray(t,k)?(i=parseInt(m[l.inArray(t,k)])+parseInt(g.val()),m[l.inArray(t,k)]=i):(k.push(t),l.cookie("cookiesid",k,{expires:10,path:"/"}),m.push(g.val())),l.cookie("cookienum",m,{expires:10,path:"/"}),alert("已加入购物车")})}(jQuery);