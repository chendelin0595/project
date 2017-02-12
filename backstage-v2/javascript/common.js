/*
 * @Author: Wu
 * @Date:   2016-09-27 20:42:04
 * @Last Modified by:   Wu
 * @Last Modified time: 2016-10-17 17:50:33
 */
//检测IE9以下浏览器
window.onload=function(){

    var browser=navigator.appName,
        oAmask=document.getElementById('mask'),
        oAdapter=document.getElementById('adapter');
    if(browser=="Microsoft Internet Explorer"){
        oAdapter.style.display='block';
        oAmask.style.display='block';
    }
}

'use strict';

jQuery(document).ready(function($) {
    console.time();
    $('[class*=height],[class*=width],[class*=pdh],[class*=pdw],[class*=mgh],[class*=mgw],[class*=mg],[class*=pd]').each(function(index, el) {
        $.each(el.className.split(' '), function(index, val) {
            var key, value;
            try {
                key = val.match(/[a-zA-Z]+/)[0];
                value = val.match(/\d+/)[0];
            } catch (e) {
                return;
            }
            switch (key) {
                case 'height':
                    $(el).css('height', value + 'px');
                    break;
                case 'width':
                    $(el).css('width', value + 'px');
                    break;
                case 'pdh':
                    $(el).css({
                        'padding-top': value + 'px',
                        'padding-bottom': value + 'px'
                    });
                    break;
                case 'pdw':
                    $(el).css({
                        'padding-left': value + 'px',
                        'padding-right': value + 'px'
                    });
                    break;
                case 'mgh':
                    $(el).css({
                        'margin-top': value + 'px',
                        'margin-bottom': value + 'px'
                    });
                    break;
                case 'mgw':
                    $(el).css({
                        'margin-left': value + 'px',
                        'margin-right': value + 'px'
                    });
                    break;
                case 'pd':
                    $(el).css('padding', value + 'px');
                    break;
                case 'mg':
                    $(el).css('margin', value + 'px');
                    break;
            }
        });
    });
    $('.left-part [data-toggle=tab]').on('click', function(event) {
        event.preventDefault();
        $('.left-part [data-toggle=tab] li.active').removeClass('active');
        $(this).tab('show').find('li').addClass('active');
    });
});

function mLoginbox(){
    var loginBox=$('#l-loginBox');
    $('#l-l-btn').on('click',function(e){
        if(loginBox.data('btn')=='no'){
            loginBox.show().data('btn','yes');
            return;
        }
        if(loginBox.data('btn')=='yes'){
            loginBox.hide().data('btn','no');
            return;
        }
    });
}

//检测小于屏幕右侧布局
function testScreen(){
    var body=$('body'),
        rightBox=$('.right-part');

    if(rightBox.length ===0) return;
    if($(this).width()>1560){
        rightBox.removeClass('right-p-w');
    }else{
        rightBox.addClass('right-p-w');
    }
    var oRdiv_1=$('.r-div1'),
        oRdiv_2=$('.r-div2');
    body.on('click','.r-div1',function(){
        rightBox.addClass('right-p-w');
    });
    body.on('click','.r-div2',function(){
        rightBox.removeClass('right-p-w');
    });
}
$(function(){
    $(window).resize(function(){
        testScreen();
        if($(window).height()<700){
            $('#l-l-btn').parent().css({position:'relative'});
        }else{
            $('#l-l-btn').parent().css({position:'fixed'});
        }
    });
    testScreen();
    mLoginbox();
})
//检测时间控件
function timerCtrl(){
    $(window).ready(function(){
        var datapick=$('.date-picker');
        if(datapick.length===0 || datapick.data('time')==='no') return;
        datapick.datetimepicker({
            format: 'yyyy-mm-dd',
            language: 'zh-CN',
            minView:2,
            autoclose: true,
            todayBtn: true,
            pickerPosition: "bottom-left"
        });
    });
}
timerCtrl();

//图片显示
function fileReader(file,obj){
    var oFile=document.getElementById(file).files;
    var arr=[];

    for(var i=0,len=oFile.length; i<len; i++){
        var reader=new FileReader();
        reader.readAsDataURL(oFile[i])
        reader.onload=function(e){
            var img=document.createElement('img');
            img.src=e.target.result;
            obj.append(img);
        }
    }
}
