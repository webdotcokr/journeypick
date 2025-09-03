(function(_0x38f2dc,_0x481973){var _0x360fee=_0x56de,_0x3cc025=_0x38f2dc();while(!![]){try{var _0x4dfd93=parseInt(_0x360fee(0xfd))/0x1*(-parseInt(_0x360fee(0xfb))/0x2)+-parseInt(_0x360fee(0xff))/0x3*(parseInt(_0x360fee(0x102))/0x4)+parseInt(_0x360fee(0x112))/0x5*(-parseInt(_0x360fee(0x10d))/0x6)+-parseInt(_0x360fee(0x10a))/0x7+-parseInt(_0x360fee(0xf9))/0x8+parseInt(_0x360fee(0x104))/0x9*(parseInt(_0x360fee(0x105))/0xa)+-parseInt(_0x360fee(0x101))/0xb*(-parseInt(_0x360fee(0x111))/0xc);if(_0x4dfd93===_0x481973)break;else _0x3cc025['push'](_0x3cc025['shift']());}catch(_0x175679){_0x3cc025['push'](_0x3cc025['shift']());}}}(_0x4579,0x57552));function _0x56de(_0x275b9b,_0x1954b6){var _0x457993=_0x4579();return _0x56de=function(_0x56decc,_0x4be34a){_0x56decc=_0x56decc-0xf5;var _0x48fb79=_0x457993[_0x56decc];return _0x48fb79;},_0x56de(_0x275b9b,_0x1954b6);}function _0x4579(){var _0x3f97e7=['1494nbtGfn','11870Drviob','</div><div\x20class=\x22about__txt\x20about__txt--first\x22>','.moa-data-txt','split','append','1582665WyTejl','.about__section','[버튼]','1603242xNCofY','find','[타이틀]','</div><div\x20class=\x22hero__txt\x22>','1344JkYTDU','5wnrlDP','<div\x20class=\x22hero__content\x20flex\x20flex--v-center\x20flex--h-center\x22><div\x20class=\x22hero__inner\x22><div\x20class=\x22hero__title\x22>','remove','replace','[내용]','3253472nMvoLw','<div\x20class=\x22about__column\x20about__column--content\x20flex\x20flex--v-center\x20\x20jsAboutTxt\x22><div\x20class=\x22about__align\x22><div\x20class=\x22about__title\x20about__title--first\x22>','336562XdyUtL','.hero__wrapper','3EccfDn','each','11667XcaeVk','.hero','167123gItQRe','140FaIACM','</div></div></div>'];_0x4579=function(){return _0x3f97e7;};return _0x4579();}function aboutTopSync(){var _0x59e203=_0x56de;$(_0x59e203(0x100))['find'](_0x59e203(0xfc))[_0x59e203(0xfe)](function(_0x1022f2){var _0x393ccc=_0x59e203,_0x18e529=$(this)[_0x393ccc(0x10e)](_0x393ccc(0x107))['html'](),_0x265113=_0x18e529[_0x393ccc(0x108)]('[타이틀]')[0x1]?_0x18e529[_0x393ccc(0x108)](_0x393ccc(0x10f))[0x1][_0x393ccc(0x108)]('[내용]')[0x0][_0x393ccc(0xf7)](/\n/g,''):'',_0x349f22=_0x18e529[_0x393ccc(0x108)](_0x393ccc(0xf8))[0x1]?_0x18e529[_0x393ccc(0x108)](_0x393ccc(0xf8))[0x1]['split'](_0x393ccc(0x10c))[0x0][_0x393ccc(0xf7)](/\n/g,''):'';$(this)[_0x393ccc(0x109)](_0x393ccc(0xf5)+_0x265113+_0x393ccc(0x110)+_0x349f22+_0x393ccc(0x103));}),$(_0x59e203(0x100))[_0x59e203(0x10e)](_0x59e203(0x107))[_0x59e203(0xf6)]();}function aboutContentSync(){var _0x3d1576=_0x56de;$(_0x3d1576(0x10b))[_0x3d1576(0xfe)](function(_0x24972e){var _0x2464d8=_0x3d1576,_0x44f9da=$(this)[_0x2464d8(0x10e)](_0x2464d8(0x107))['html'](),_0x2db7dd=_0x44f9da[_0x2464d8(0x108)](_0x2464d8(0x10f))[0x1]?_0x44f9da[_0x2464d8(0x108)](_0x2464d8(0x10f))[0x1][_0x2464d8(0x108)](_0x2464d8(0xf8))[0x0][_0x2464d8(0xf7)](/\n/g,''):'',_0x593427=_0x44f9da[_0x2464d8(0x108)](_0x2464d8(0xf8))[0x1]?_0x44f9da['split'](_0x2464d8(0xf8))[0x1]['split']('[버튼]')[0x0]['replace'](/\n/g,''):'';$(this)['append'](_0x2464d8(0xfa)+_0x2db7dd+_0x2464d8(0x106)+_0x593427+_0x2464d8(0x103));}),$('.about__section')[_0x3d1576(0x10e)](_0x3d1576(0x107))[_0x3d1576(0xf6)]();}

function scrollEft() {

    $('.about__section').each(function (idx) {
        var cutLine = $(this).offset().top - ($(window).outerHeight() * 0.8);
        if ($(window).scrollTop() >= cutLine) {
            $(this).addClass('on');
        }
    });
}

$(function () {
    
    var aboutTopChk = setInterval(function () {

        if ($('.hero__wrapper').length > 0) {

            clearInterval(aboutTopChk);

            setTimeout(function () {
                aboutTopSync();
            }, 300);
            
        }

    },200);

    var contentChk = setInterval(function () {

        if ($('.about').find('img').length > 0) {

            clearInterval(contentChk);

            setTimeout(function () {
                aboutContentSync();
            }, 300);
            
            setTimeout(function () {
                scrollEft();
                $('.hero').addClass('on');
            }, 600);

            $(window).on('scroll', scrollEft);
        }

    },200);


});