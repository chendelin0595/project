/*
 * @Author: Wu
 * @Date:   2016-09-27 20:42:04
 * @Last Modified by:   Wu
 * @Last Modified time: 2016-10-20 15:21:38
 */

'use strict';
var max__width = 750,
    unit = max__width / 10,
    clock;
// set base font size
function rem() {
    if (window.innerWidth > max__width) {
        $('html').css('font-size', unit + 'px');
    } else {
        $('html').css('font-size', window.innerWidth / 10 + 'px');
    }
}
rem()
$(window).resize(function(event) {
    //debounce
    clearTimeout(clock);
    clock = setTimeout("rem()", 200);
});
jQuery(document).ready(function($) {
    $('[class*=height],[class*=pdh],[class*=pdw],[class*=mgh],[class*=mgw],[class*=mg],[class*=pd]').each(function(index, el) {
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
                    $(el).css('height', value / unit + 'rem');
                    break;
                case 'pdh':
                    value = value / unit;
                    $(el).css({
                        'padding-top': value + 'rem',
                        'padding-bottom': value + 'rem'
                    });
                    break;
                case 'pdw':
                    value = value / unit;
                    $(el).css({
                        'padding-left': value + 'rem',
                        'padding-right': value + 'rem'
                    });
                    break;
                case 'mgh':
                    value = value / unit;
                    $(el).css({
                        'margin-top': value + 'rem',
                        'margin-bottom': value + 'rem'
                    });
                    break;
                case 'mgw':
                    value = value / unit;
                    $(el).css({
                        'margin-left': value + 'rem',
                        'margin-right': value + 'rem'
                    });
                    break;
                case 'pd':
                    $(el).css('padding', value / unit + 'rem');
                    break;
                case 'mg':
                    $(el).css('margin', value / unit + 'rem');
                    break;
            }
        });
    });
});
