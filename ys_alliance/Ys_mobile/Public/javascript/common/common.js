function Common(){
    this.init();
}
Common.prototype={
    constructor:Common,
    //页面刷新加载事件
    init:function(){
        this.winResize();
        this.reWindow();
        this.leftNav();
    },
    //计算rem值
    winResize:function(){
        var docEl = document.documentElement,
            docMax=docEl.offsetWidth>750?750:docEl.offsetWidth,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            maxWidth=24*(750 / 375);
            recalc = function () {
                if(docEl.offsetWidth<=750){
                    //设置根字体大小
                    docEl.style.fontSize = 24 * (docEl.clientWidth / 375) + 'px';
                }else{
                    docEl.style.fontSize=maxWidth+'px';
                }
            };
        recalc();
        window.addEventListener(resizeEvt, recalc, false);
    },
    //页面加载触发
    reWindow:function(){
        var That=this;
        $(window).ready(function(){
            That.bgColor();
            That.clickTab();
        });
    },
    //检测页面是否有背景
    bgColor:function(){
        var page=$('.page');
        if(page.data('color')=='undefined' || page.data('color')=='') return;
        $('html,body').css('background-color',page.data('color'));
    },
    //检测是否有切换tab
    clickTab:function(){
        var a=$('a[data-toggle="tab"]');
        if(a.length === 0) return;
        a.on('click',function(){
            $(this).addClass('active').siblings().removeClass('active');
        });
    },
    //backTop
    leftNav:function(){
        var navBox=$('.left-navBox'),
            backtop=$('#backtop'),
            navFooter=$('.navbar-fixed-bottom');
        if(backtop.length == 0){return;}

        $(window).scroll(function(){
            if($(document).scrollTop()>50){
                backtop.fadeIn();
            }else{
                backtop.fadeOut();
            }
        })
        backtop.on('click',function(){
            $('body,html').animate({scrollTop:0},200);
        });
        if(navFooter.length!==0){
            navBox.find('a').eq(2).css('display','none');
        }


        this.animateNav('.left-navBox')
    },
    //backTop  长按拖动
    animateNav:function(obj){
        var obj=$(obj),
            timer=null,
            startX,
            startY,
            btn=false,
            oDiv_left,
            oDiv_top;

        function setTimer(){
            btn=true;
            obj.css({
                transition:'transform 0.2s',
                left:oDiv_left,
                top:oDiv_top,
                transform:'scale(1.5)'
            });
        };
        obj.on('touchstart',function(e){
            oDiv_left=$(this).position().left;
            oDiv_top=$(this).position().top;
            startX= e.changedTouches[0].pageX;
            startY= e.changedTouches[0].pageY;
            timer=setTimeout(setTimer,200);
        });

        obj.on('touchmove',function(e){
            e.preventDefault();
            if(!btn){
                return
            }else{
                var moveX= e.changedTouches[0].pageX,
                    moveY= e.changedTouches[0].pageY;
                $(this).css('left',moveX- (startX-oDiv_left));
                $(this).css('top',moveY - (startY-oDiv_top));
            }
        });

        obj.on('touchend',function(){
            if(btn){
                obj.css({
                    transition:'0.2s',
                    transform:'scale(1)',
                    'left':'90%',
                    'top':obj.position().top
                });
            }
            clearTimeout(timer);
            timer=null;
            btn=false;
        });
    }
}

window.onload= function () {
    new Common().init();
}