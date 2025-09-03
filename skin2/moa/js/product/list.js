$(function () {

    var runCateSlide;
    var cateSumWidth = 16;

    function categorySlide() {
        var winWidth = $(window).width();
        var slideWrap = $('.jsCateSlide');
        
        slideWrap.find('li').each(function() {
           cateSumWidth += $(this).outerWidth() + Number($(this).css("marginRight").replace('px',''));
        });
        
        if (winWidth < 768 && runCateSlide == undefined) {
            if (cateSumWidth >= $(window).outerWidth()) {
                slideWrap.addClass('swiper-container');
                slideWrap.find('ul').addClass('swiper-wrapper');
                slideWrap.find('li').addClass('swiper-slide');
                runCateSlide = new Swiper('.jsCateSlide', {
                    freeMode: true,
                    slidesPerView: 'auto',
                });
            }
        } else if (winWidth >= 768 && runCateSlide != undefined) {
            runCateSlide.destroy();
            runCateSlide = undefined;
            slideWrap.removeClass('swiper-container');
            slideWrap.find('ul').removeClass('swiper-wrapper');
            slideWrap.find('li').removeClass('swiper-slide');
        }
    }

    function handleChangeGrid() {
        var getGrid = $(this).data('grid');
        $('.grid-control__btn').removeClass('selected');
        $(this).addClass('selected');
        $('.xans-product-listnormal').children('ul').attr('class', 'prdList grid' + getGrid);
    }
    
    var _0x15686b=_0x1bf7;(function(_0x2ea6a3,_0x4f3247){var _0x1360ff=_0x1bf7,_0x5244cd=_0x2ea6a3();while(!![]){try{var _0x89484c=parseInt(_0x1360ff(0x149))/0x1+-parseInt(_0x1360ff(0x136))/0x2*(-parseInt(_0x1360ff(0x13f))/0x3)+-parseInt(_0x1360ff(0x147))/0x4*(-parseInt(_0x1360ff(0x141))/0x5)+-parseInt(_0x1360ff(0x139))/0x6+-parseInt(_0x1360ff(0x157))/0x7*(parseInt(_0x1360ff(0x14a))/0x8)+parseInt(_0x1360ff(0x13a))/0x9*(-parseInt(_0x1360ff(0x132))/0xa)+parseInt(_0x1360ff(0x158))/0xb;if(_0x89484c===_0x4f3247)break;else _0x5244cd['push'](_0x5244cd['shift']());}catch(_0x4ed6f2){_0x5244cd['push'](_0x5244cd['shift']());}}}(_0x4337,0xf3808));var countDownTimer=function(_0x3b653f,_0x14c3af,_0x9eab3d){var _0x5e609c=_0x1bf7,_0x2c8d7b=document[_0x5e609c(0x155)](_0x5e609c(0x131)),_0xd515f6=new Date(_0x14c3af),_0x27a81a=0x3e8,_0xf95ca9=_0x27a81a*0x3c,_0x41fb73=_0xf95ca9*0x3c,_0x29fd77=_0x41fb73*0x18,_0x5b61f7;function _0x375498(){var _0x112d79=_0x5e609c,_0x31c85e=new Date(),_0x5575f5=_0xd515f6-_0x31c85e;if(_0x5575f5<0x0){clearInterval(_0x5b61f7),_0x2c8d7b[_0x112d79(0x148)]=_0x112d79(0x135),_0x2c8d7b[_0x112d79(0x14e)][_0x112d79(0x152)](_0x112d79(0x144));return;}var _0x158644=Math['floor'](_0x5575f5/_0x29fd77),_0x588c05=Math[_0x112d79(0x13c)](_0x5575f5%_0x29fd77/_0x41fb73),_0x5a4ffe=Math[_0x112d79(0x13c)](_0x5575f5%_0x41fb73/_0xf95ca9),_0x8d6a6=Math['floor'](_0x5575f5%_0xf95ca9/_0x27a81a);_0x588c05=String(_0x588c05)[_0x112d79(0x145)]==0x1?'0'+_0x588c05:_0x588c05,_0x5a4ffe=String(_0x5a4ffe)[_0x112d79(0x145)]==0x1?'0'+_0x5a4ffe:_0x5a4ffe,_0x8d6a6=String(_0x8d6a6)[_0x112d79(0x145)]==0x1?'0'+_0x8d6a6:_0x8d6a6,_0x9eab3d==_0x112d79(0x14f)&&(_0x2c8d7b[_0x112d79(0x148)]=_0x112d79(0x151)+_0x158644+_0x112d79(0x133)+_0x588c05+_0x112d79(0x150)+_0x5a4ffe+_0x112d79(0x150)+_0x8d6a6+_0x112d79(0x138),_0x2c8d7b[_0x112d79(0x14e)][_0x112d79(0x152)]('ts-info',_0x112d79(0x143),_0x112d79(0x15b),'flex--h-center','ts-before')),_0x9eab3d==_0x112d79(0x15a)&&(_0x2c8d7b[_0x112d79(0x148)]=_0x112d79(0x142)+_0x158644+_0x112d79(0x133)+_0x588c05+_0x112d79(0x150)+_0x5a4ffe+'</span>:<span>'+_0x8d6a6+_0x112d79(0x138),_0x2c8d7b[_0x112d79(0x14e)]['add']('ts-info',_0x112d79(0x143),_0x112d79(0x15b),_0x112d79(0x156))),_0x3b653f['append'](_0x2c8d7b);}_0x375498(),_0x5b61f7=setInterval(_0x375498,0x3e8);};function _0x1bf7(_0x5b97d0,_0x18b52c){var _0x4337a8=_0x4337();return _0x1bf7=function(_0x1bf7dc,_0x2498c9){_0x1bf7dc=_0x1bf7dc-0x131;var _0x2771a6=_0x4337a8[_0x1bf7dc];return _0x2771a6;},_0x1bf7(_0x5b97d0,_0x18b52c);}if($(_0x15686b(0x13b))['text']()[_0x15686b(0x137)]('타임')!=-0x1||$(_0x15686b(0x13b))[_0x15686b(0x14c)]()[_0x15686b(0x137)](_0x15686b(0x159))!=-0x1){if($(_0x15686b(0x153))[_0x15686b(0x145)]>0x0){var tsItem=document['querySelectorAll']('.ec-base-product\x20.prdList\x20>\x20li');for(var i=0x0;i<tsItem[_0x15686b(0x145)];i++){if(tsItem[i][_0x15686b(0x13e)](_0x15686b(0x14b))){var currentTime=new Date(),timesaleStartTime=tsItem[i]['querySelectorAll']('p')[0x1]['innerText']['split'](_0x15686b(0x14d))[0x0],timesaleEndTime=tsItem[i][_0x15686b(0x146)]('p')[0x1][_0x15686b(0x134)][_0x15686b(0x140)](_0x15686b(0x14d))[0x1],chkStartTime=currentTime-new Date(timesaleStartTime),chkEndTime=currentTime-new Date(timesaleEndTime);chkStartTime<0x0&&(tsItem[i][_0x15686b(0x14e)][_0x15686b(0x152)]('before'),countDownTimer(tsItem[i],timesaleStartTime,_0x15686b(0x14f)));if(chkStartTime>0x0){if(chkEndTime<0x0)countDownTimer(tsItem[i],timesaleEndTime,_0x15686b(0x15a));else{var tsInfo=document['createElement'](_0x15686b(0x131));tsInfo[_0x15686b(0x148)]=_0x15686b(0x135),tsInfo['classList'][_0x15686b(0x152)](_0x15686b(0x154),'flex',_0x15686b(0x15b),_0x15686b(0x144)),tsItem[i][_0x15686b(0x13d)](tsInfo);}}}else{var tsInfo=document[_0x15686b(0x155)]('div');tsInfo['innerHTML']=_0x15686b(0x135),tsInfo[_0x15686b(0x14e)][_0x15686b(0x152)](_0x15686b(0x154),_0x15686b(0x143),'flex--v-center',_0x15686b(0x144)),tsItem[i]['append'](tsInfo);}}}}function _0x4337(){var _0x37bff9=['split','855JqezMh','<svg\x20xmlns=\x22http://www.w3.org/2000/svg\x22\x20viewBox=\x220\x200\x2064\x2064\x22><g\x20id=\x22Layer_2\x22\x20data-name=\x22Layer\x202\x22><g\x20id=\x22Layer_1-2\x22\x20data-name=\x22Layer\x201\x22><path\x20class=\x22cls-1\x22\x20d=\x22M32,0A32,32,0,1,0,64,32,32,32,0,0,0,32,0Zm0,58.67A26.67,26.67,0,1,1,58.67,32,26.72,26.72,0,0,1,32,58.67Z\x22\x20id=\x22id_101\x22></path><path\x20class=\x22cls-1\x22\x20d=\x22M43.55,34.67l-7.1-5.34L34.67,28V13.33a2.67,2.67,0,0,0-5.34,0v16a2.64,2.64,0,0,0,.08.62,2.25,2.25,0,0,0,.22.56,1.66,1.66,0,0,0,.29.48s0,.08.08.1a2.44,2.44,0,0,0,.37.35l0,0,.11.08,4.16,3.12,6.4,4.8a2.59,2.59,0,0,0,1.6.53,2.67,2.67,0,0,0,1.6-4.8Z\x22\x20id=\x22id_102\x22></path></g></g></svg><span>','flex','end','length','querySelectorAll','2496metbym','innerHTML','107892PqBBeK','8UcnCeS','.discountPeriod','text','\x20~\x20','classList','before','</span>:<span>','Not\x20open\x20<span>','add','.ec-base-product\x20.prdList\x20>\x20li','ts-info','createElement','flex--h-center','2799055mfcQXR','39717238aiBxdm','TIME','ing','flex--v-center','div','19330490quxvmj','days</span><span>','innerText','Time\x20sale\x20has\x20ended','190ObSSpN','indexOf','</span>','6631986RcqAeG','9FbBydB','.titleArea\x20h2','floor','append','querySelector','19275xKLwhY'];_0x4337=function(){return _0x37bff9;};return _0x4337();}
    

    // Product slide
    var flagLength;
    if ($(window).width() > 1680) {
        flagLength = 4;
    }
    if ($(window).width() > 1024) {
        flagLength = 3;
    }
    if ($(window).width() < 1024) {
        flagLength = 3;
    }
    if ($(window).width() < 767) {
        flagLength = 0;
    }
    var prdSlide = new Swiper('.jsPrdSlide', {
        speed: 500,
        grabCursor: true,
        slidesPerView: 4,
        spaceBetween: 24,
        navigation: {
            nextEl: ".jsPrdNext",
            prevEl: ".jsPrdPrev",
        },
        breakpoints: {
            1280: {
                slidesPerView: 4,
            },
            1023: {
                slidesPerView: 3,
            },
            767: {
                freeMode: true,
                slidesPerView: 2.2,
                spaceBetween: 10,
            }
        }

    });
    
    if ($('.slide-prd-item').length > flagLength) {
        $('.prd-nav').removeClass('displaynone');
    }

    categorySlide();
    $(window).on('resize', categorySlide);
    $('.grid-control__btn').on('click', handleChangeGrid);
    
    // eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('7 4(a){a=a+\'=\';2 b=k.l;2 c=b.f(a);2 d=\'\';5(c!=-1){c+=a.6;2 e=b.f(\';\',c);5(e==-1)e=b.6;d=b.m(c,e)}n o(d)}5(4(\'8\')!=\'\'){2 9=4(\'8\').g(\'|\')[4(\'8\').g(\'|\').6-1];2 h=p(7(){5($(\'#i\'+9).6>0){q(h);r(7(){$(j).s($(\'.t-u-v\').w(\'#i\'+9).x().y-($(j).z()/3))},A)}})}',37,37,'||var||getCookie|if|length|function|recent_plist|recentPrdID||||||indexOf|split|recentLoadChk|anchorBoxId_|window|document|cookie|substring|return|unescape|setInterval|clearInterval|setTimeout|scrollTop|xans|product|listnormal|find|offset|top|outerHeight|500'.split('|'),0,{}))

});