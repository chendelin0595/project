/**
 * Created by Administrator on 2016/11/22 0022.
 */
function Common(){
    this.init();
}

Common.prototype={
    constructor:Common,

    init:function(){
        this.leftNav();
    },
    //backTop
    leftNav:function(){
        var navBox=$('.left-navBox'),
            backtop=$('#backtop'),
            navFooter=$('.footer-nav');
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
                    'left':'88%',
                    'top':obj.position().top
                });
            }
            clearTimeout(timer);
            timer=null;
            btn=false;
        });
    }

}

$(function(){
    var c1=new Common();
    c1.init();
});