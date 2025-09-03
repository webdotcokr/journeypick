


$(function () {
    
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    var $window=$(window);
    var jsFixLayer=$('.jsMobileLayer');
    var $toggle=$('.jsFixToggle');
    var $dumy=$('.buy_dummy');
    var speed = 300;
    var gap = $window.outerWidth() <= 1023 ? 500 : 500;
    var height=jsFixLayer.outerHeight();
    var top = jsFixLayer.offset().top+height+gap;
    var $document=$(document);
    var eventMoved = false;
    var fixPVCLoaded = true;
    
    var runPrdThumbSlide = undefined;
    var thumbBtn = $('.list__item');
    var lastScroll = 0;
    
    if(!isMobile()) {
        document.getElementById('totalProducts').classList.add('is-pc');
    }
    
    if($window.outerWidth() <= 768 ) {
        $('.eventArea').appendTo($('.infoArea'));
    }
    
    (function(_0x32c0cc,_0x271144){var _0x29d2d7=_0x5433,_0x366f15=_0x32c0cc();while(!![]){try{var _0x446d0=-parseInt(_0x29d2d7(0x1df))/0x1*(-parseInt(_0x29d2d7(0x1e4))/0x2)+-parseInt(_0x29d2d7(0x1e7))/0x3*(parseInt(_0x29d2d7(0x1f4))/0x4)+parseInt(_0x29d2d7(0x1e9))/0x5+parseInt(_0x29d2d7(0x1ec))/0x6+parseInt(_0x29d2d7(0x1ed))/0x7+-parseInt(_0x29d2d7(0x1f8))/0x8+parseInt(_0x29d2d7(0x1f3))/0x9;if(_0x446d0===_0x271144)break;else _0x366f15['push'](_0x366f15['shift']());}catch(_0x4c0f0a){_0x366f15['push'](_0x366f15['shift']());}}}(_0x29f2,0x6d4e0));function _0x5433(_0x510964,_0x143659){var _0x29f22e=_0x29f2();return _0x5433=function(_0x54335b,_0x21df33){_0x54335b=_0x54335b-0x1de;var _0x399352=_0x29f22e[_0x54335b];return _0x399352;},_0x5433(_0x510964,_0x143659);}var today=new Date();function _0x29f2(){var _0x287da0=['3322314zEKVKl','326384ytNmaT','getFullYear','.infoArea','.jsViewCount','6611432pqacpI','getDate','floor','attr','getHours','#tvc','119359yrldfG','length','getTime','text','indexOf','4vCPFfD','each','.tvc__item','12aYjQYe','.prd-view','2802140GddQsH','fadeIn','getMonth','673872ZstmpU','2239447RVzGIN','data-prd-no','\x2000:00:00','split','slice','remove'];_0x29f2=function(){return _0x287da0;};return _0x29f2();}function todayBuyCount(){var _0x1fe53e=_0x5433;if($(_0x1fe53e(0x1de))[_0x1fe53e(0x1e0)]>0x0)var _0x1dcdc2=setInterval(function(){var _0x850c8c=_0x1fe53e;if($(_0x850c8c(0x1e6))[_0x850c8c(0x1e0)]>0x0){clearInterval(_0x1dcdc2);var _0x51f701=$(_0x850c8c(0x1f6))[_0x850c8c(0x1fb)](_0x850c8c(0x1ee)),_0x4f4128;$('.tvc__item')[_0x850c8c(0x1e5)](function(){var _0x31c182=_0x850c8c;_0x4f4128=$(this)[_0x31c182(0x1fb)]('data-url')[_0x31c182(0x1e3)]('/')!=-0x1?$(this)[_0x31c182(0x1fb)]('data-url')[_0x31c182(0x1f0)]('/')[$(this)[_0x31c182(0x1fb)]('data-url')[_0x31c182(0x1f0)]('/')[_0x31c182(0x1e0)]-0x1]:undefined;if(_0x4f4128==_0x51f701){var _0x289475=$(this)[_0x31c182(0x1e2)]()[_0x31c182(0x1e3)](',')!=-0x1?$(this)['text']()[_0x31c182(0x1f0)](','):[0x1,0x2,0x3,0x4],_0x4c2332=Number($(this)[_0x31c182(0x1fb)]('data-start')),_0x56fb32=Number(_0x289475[0x0]),_0x414f42=Number(_0x289475[0x1]),_0x485f97=Number(_0x289475[0x2]),_0x3a212f=Number(_0x289475[0x3]),_0x2fb3e6=new Date(),_0x318a3b=_0x2fb3e6[_0x31c182(0x1f5)](),_0x2df292=('0'+(_0x2fb3e6['getMonth']()+0x1))[_0x31c182(0x1f1)](-0x2),_0x175218=('0'+_0x2fb3e6[_0x31c182(0x1f9)]())['slice'](-0x2),_0x3f7390=new Date()[_0x31c182(0x1fc)](),_0x408adc=new Date(_0x318a3b+'-'+_0x2df292+'-'+_0x175218+_0x31c182(0x1ef))['getTime'](),_0x58dbe7=new Date(),_0xa0a5e6=+0x1;_0x58dbe7['setDate'](_0x58dbe7['getDate']()+_0xa0a5e6);var _0x386dc0=_0x58dbe7[_0x31c182(0x1f5)](),_0x2b92dd=('0'+(_0x58dbe7[_0x31c182(0x1eb)]()+0x1))[_0x31c182(0x1f1)](-0x2),_0x6dbddc=('0'+_0x58dbe7[_0x31c182(0x1f9)]())[_0x31c182(0x1f1)](-0x2),_0x16a740=new Date(_0x386dc0+'-'+_0x2b92dd+'-'+_0x6dbddc+'\x2000:00:00')[_0x31c182(0x1e1)](),_0x5d4648=_0x2fb3e6['getTime']()-_0x408adc,_0x41e38a=Math['floor'](_0x5d4648/0x3e8/0x3c),_0x324bd0=_0x16a740-_0x2fb3e6['getTime']();if(_0x324bd0>0x0){var _0x177a07=_0x2fb3e6['getHours'](),_0x240d32=Math[_0x31c182(0x1fa)](_0x41e38a/0xa);if(_0x41e38a<0x168)var _0x5e6a17=_0x240d32*_0x56fb32;if(_0x41e38a>=0x168&&_0x41e38a<0x2d0)var _0x5efa74=Math[_0x31c182(0x1fa)](_0x41e38a%0x168/0xa),_0x47a343=0x24*_0x56fb32,_0x534080=_0x5efa74*_0x414f42,_0x5e6a17=_0x47a343+_0x534080;if(_0x41e38a>=0x2d0&&_0x41e38a<0x438)var _0x5efa74=Math[_0x31c182(0x1fa)](_0x41e38a%0x168/0xa),_0x47a343=0x24*_0x56fb32,_0x534080=0x24*_0x414f42,_0x25bd20=_0x5efa74*_0x485f97,_0x5e6a17=_0x47a343+_0x534080+_0x25bd20;if(_0x41e38a>=0x438&&_0x41e38a<0x5a0)var _0x5efa74=Math['floor'](_0x41e38a%0x168/0xa),_0x47a343=0x24*_0x56fb32,_0x534080=0x24*_0x414f42,_0x25bd20=0x24*_0x485f97,_0x4131a5=_0x5efa74*_0x3a212f,_0x5e6a17=_0x47a343+_0x534080+_0x25bd20+_0x4131a5;}$(_0x31c182(0x1f7))[_0x31c182(0x1e2)](_0x5e6a17+_0x4c2332),$(_0x31c182(0x1e8))[_0x31c182(0x1ea)](),$(_0x31c182(0x1de))[_0x31c182(0x1f2)](),fixPVCLoaded=![];}});}},0x1f4);}
    
    // Calc Discount Per
    function calcDiscountPer() {
        var infoArea = $('.infoArea');
        var getPrice = infoArea.data('price');
        var getCustom = infoArea.data('custom');

        if ($('.prd_price_sale_css').length < 1) {
            if (Number(getPrice) < Number(getCustom)) {
                var calcPrice = 100 - (Number(getPrice) * 100 / Number(getCustom));
                var discountRate = Math.round(calcPrice);
                infoArea.find('.price-spec__item.product_price_css').prepend('<span class="discount-per">' + discountRate + '</span>');
            }
            if (Number(getPrice) == Number(getCustom)) {
                $('.price-spec__item.product_custom_css').addClass('displaynone');
            }
        }
        if($('#span_product_price_sale').length > 0) {
            var salePrice = $('#span_product_price_sale');
            var discountRate = salePrice.find('span').text();
            discountRate = discountRate.replace('%','');
            $('.price-spec').addClass('is-sale');
            infoArea.find('.price-spec__item.prd_price_sale_css').prepend('<span class="discount-per">' + discountRate + '</span>');
        }
    }

    // Thumbnail slide
    function thumbSlide() {
        var winWidth = $(window).outerWidth();
        var slideWrap = $('.jsPrdThumbSlide');
        if (slideWrap.find('li').length > 1) {
            slideWrap.addClass('swiper-container');
            slideWrap.find('.thumbnail__list').addClass('swiper-wrapper');
            slideWrap.find('li').addClass('swiper-slide');
            runPrdThumbSlide = new Swiper('.jsPrdThumbSlide', {
                //                        loop: true,
                speed: 600,
                grabCursor: true,
                slidesPerView: 1,
                pagination: {
                    el: ".jsThumbSlidePager",
                    clickable: true
                },
                navigation: {
                    nextEl: ".jsThumbNext",
                    prevEl: ".jsThumbPrev",
                },
                on: {
                    slideChangeTransitionStart: function () {
                        runThumbNavSlide.slideTo(this.realIndex);
                        $('.list__item').removeClass('current').eq(this.realIndex).addClass('current');
                    }
                }
            });

            if($('.jsThumbNav').find('.list__item').length > 1) {
                var runThumbNavSlide = new Swiper('.jsThumbNav', {
//                    slidesPerView: 6,
                    slidesPerView: 'auto',
                    direction: 'vertical',
                    spaceBetween: 10,
                    grabCursor: true,
                });
            }

            $('.list__item').first().addClass('current');

        }
    }
    
    function resizeThumbNav() {
        var thumbHeight = $('.xans-product-detail .imgArea .thumbnail .ThumbImage').outerHeight();
        $('.xans-product-detail .imgArea .listImg').css('max-height', thumbHeight);
    }

    // Thumbnail nav click to Scroll
    function handleThumbScroll() {
        var getIdx = $(this).index();
        if(runPrdThumbSlide) runPrdThumbSlide.slideTo(getIdx);
        $('.list__item').removeClass('current');
        $(this).addClass('current');
    }

    // Moblie Purchase layer : ON
    function mobileLayerOn() {
        if($('.jsMobileLayer').hasClass('fixed')) {
            $('.jsMobileLayer, .jsMobileLayerBG').addClass('on');
            if($window.outerWidth() <= 768) $('.jsMobileLayer').stop(true, true).animate({bottom: 0});
        } else {
            $('.buy-btn-wrap').find('a.btnSubmit').trigger('click');
            $('html, body').stop(true,true).animate({scrollTop: $('.buy-btn-wrap').position().top - ($(window).outerHeight() / 2)})
        }
    }

    // Moblie Purchase layer : OFF
    function mobileLayerOff() {
        $('.jsMobileLayer, .jsMobileLayerBG').removeClass('on');
        if($window.outerWidth() <= 768) $('.jsMobileLayer').stop(true, true).animate({bottom: '-100%'});
    }
    
    function scrollPageTo($target, getId) {
        var scrollHeight = document.body.scrollHeight;
        var headerHeight = $('.header__bottom').outerHeight();
        var scrollSpd = 300;
        var scrollVal = $(window).outerWidth() > 1023 ? headerHeight - 20 : headerHeight - 30;
        $('html, body').stop(true,true).animate({scrollTop: $('#'+getId).offset().top - (scrollVal) + 'px'}, scrollSpd, function() {
            if (scrollHeight !== document.body.scrollHeight) scrollPageTo($target, getId);
        })
    }
    
    // Tab control
    function handleTabControl() {
        var getId = $(this).data('link');
        var fixToggleTxt = $('.fix-toggle-txt');
        var goReviewBtn = $('.mobile-fix-footer').find('.jsGoReview');
        var reviewTxt = goReviewBtn.data('review-txt')
        var infoTxt = goReviewBtn.data('info-txt');
        
        if($(window).outerWidth() > 1024) {
            $('.detail-tab__item').removeClass('selected');
            $(this).addClass('selected');
        }
        scrollPageTo($(this), getId);
    
    }

    // Review&Info Toggle
    function handleReviewInfoToggle() {

        $('.detail-tab__item[data-link="prd-review"]').trigger('click');
    }

    var scrollIdx = -1;
    
    // Scroll Tab
    function scrollTab() {

        var getIdx = -1;
        var $this = $(this).scrollTop();
        var $header = $('.jsHeader').height();
        var $headerBottom = $(window).outerWidth() > 1023 ? $('.header__bottom').outerHeight() : 0;
        var $detailTab = $('.detail-tab');
        var $detailTop = $detailTab.offset().top;
        var $tab = $('#prdDetail').position().top - 38;

        $('.tab-content').each(function(key) {
            if($this >= $(this).offset().top - $detailTab.outerHeight()) {
                getIdx = $(this).index();
            }

        });

        if(getIdx-1 >= 0) {
            $('.detail-tab__item').removeClass('on');

            if($(window).outerWidth() <= 1023) {
                if(getIdx-1 == 2) {
                    $('.detail-tab__item').eq(1).addClass('on');
                } else {
                    $('.detail-tab__item').eq(getIdx-1).addClass('on');
                }
            } else {
                $('.detail-tab__item').eq(getIdx-1).addClass('on');
            }
        }

        if ($this > $detailTop - $headerBottom) {
            $('.header__wrap').addClass('up');
            $detailTab.find('.detail-tab__nav').addClass('fixed');
            
            var _0x13820c=_0x5465;(function(_0x2c6115,_0x5a7510){var _0x52bc13=_0x5465,_0x408ad9=_0x2c6115();while(!![]){try{var _0x3fe0cc=parseInt(_0x52bc13(0x121))/0x1*(parseInt(_0x52bc13(0x11d))/0x2)+-parseInt(_0x52bc13(0x126))/0x3*(-parseInt(_0x52bc13(0x12f))/0x4)+-parseInt(_0x52bc13(0x128))/0x5*(-parseInt(_0x52bc13(0x12d))/0x6)+parseInt(_0x52bc13(0x12c))/0x7*(parseInt(_0x52bc13(0x129))/0x8)+parseInt(_0x52bc13(0x11b))/0x9+-parseInt(_0x52bc13(0x122))/0xa*(-parseInt(_0x52bc13(0x11f))/0xb)+-parseInt(_0x52bc13(0x12e))/0xc;if(_0x3fe0cc===_0x5a7510)break;else _0x408ad9['push'](_0x408ad9['shift']());}catch(_0x1153a4){_0x408ad9['push'](_0x408ad9['shift']());}}}(_0x3856,0x7e37e));function _0x3856(){var _0x12748c=['647496ePGsOO','click','addClass','42jfbKad','204XCAFDz','25694700SqiZzB','72hsTOai','3989781QEGmls','removeClass','2jvdSki','#contents','110IJZmUp','html','512318xuFXXa','758280munYqK','<div\x20class=\x22fix-prd-view\x22><div\x20class=\x22fix-prd-view__detail\x20flex\x20flex--v-center\x20flex--h-center\x22>','.fix-prd-view','.fix-prd-view__progress','63267YiZDWZ','querySelector','11630wLwzFZ'];_0x3856=function(){return _0x12748c;};return _0x3856();}function _0x5465(_0xdb7c2f,_0xe1bcc5){var _0x38562a=_0x3856();return _0x5465=function(_0x54655f,_0xd28130){_0x54655f=_0x54655f-0x11b;var _0x23cf0b=_0x38562a[_0x54655f];return _0x23cf0b;},_0x5465(_0xdb7c2f,_0xe1bcc5);}if(!fixPVCLoaded){var pvcData=$('.prd-view')[_0x13820c(0x120)]();$(_0x13820c(0x11e))['append'](_0x13820c(0x123)+pvcData+'</div><div\x20class=\x22fix-prd-view__bar\x22><div\x20class=\x22fix-prd-view__progress\x22></div></div><div\x20class=\x22fix-prd-view__close\x22><svg\x20xmlns=\x22http://www.w3.org/2000/svg\x22\x20width=\x2236\x22\x20height=\x2236\x22\x20fill=\x22none\x22\x20viewBox=\x220\x200\x2024\x2024\x22><path\x20fill=\x22currentColor\x22\x20fill-rule=\x22evenodd\x22\x20d=\x22M16.95\x208.464a1\x201\x200\x201\x200-1.414-1.414L12\x2010.586\x208.465\x207.051A1\x201\x200\x200\x200\x207.05\x208.464L10.586\x2012\x207.05\x2015.535a1\x201\x200\x201\x200\x201.414\x201.414L12\x2013.414l3.536\x203.536a1\x201\x200\x200\x200\x201.414-1.415L13.414\x2012z\x22\x20clip-rule=\x22evenodd\x22></path></svg></div></div>'),setTimeout(function(){var _0x1d49ef=_0x13820c;$(_0x1d49ef(0x124))[_0x1d49ef(0x12b)]('on');},0xc8),document[_0x13820c(0x127)](_0x13820c(0x125))&&document[_0x13820c(0x127)](_0x13820c(0x125))['addEventListener']('animationend',()=>{var _0x48190f=_0x13820c;$(_0x48190f(0x124))[_0x48190f(0x11c)]('on');}),$(document)['on'](_0x13820c(0x12a),'.fix-prd-view__close',()=>{var _0x46f5ec=_0x13820c;$(_0x46f5ec(0x124))['hide']();}),fixPVCLoaded=!![];}
            
        }
        if ($this <= $detailTop - $headerBottom) {
            $('.header__wrap').removeClass('up');
            $detailTab.find('.detail-tab__nav').removeClass('fixed');
        }

        scrollIdx = getIdx;

    }
    
    function FixLayerOpen() {
        $('.jsFixToggle').addClass('displaynone');
        $('.buy-btn-wrap').addClass('on');
        $('.mobile-layer__inner').addClass('on');
        $('.opt-content').slideDown(300);
    }
    
    function FixLayerClose() {
        $('.jsFixToggle').removeClass('displaynone');
        $('.buy-btn-wrap').removeClass('on');
        $('.mobile-layer__inner').removeClass('on');
        if($(window).outerWidth() > 1023) {
            $('.opt-content').slideUp(300);
        } else {
            $('.opt-content').css('display', 'none');
        }
        mobileLayerOff();
    }
    
    function checkScroll(){
        var goReviewBtn = $('.mobile-fix-footer').find('.jsGoReview');

        if($window.outerWidth() < 1024) {
            var infoPos = $('.infoArea').offset().top;
            var infoHeight = $('.infoArea').outerHeight();
            top = infoPos+infoHeight;
        }

        if($document.scrollTop()>top){
            if(!jsFixLayer.hasClass('fixed')){
                height=jsFixLayer.outerHeight();
            }
            $dumy.css('height',height);
            jsFixLayer.addClass('fixed');
            $('.jsQuickMenu').addClass('up');
            if($window.outerWidth() > 1024) {
                $('.app-pay-wrap').appendTo($('.fix-pc-r'));
            }
        }else{
            $dumy.css('height',0);
            jsFixLayer.removeClass('fixed');
            $('.jsQuickMenu').removeClass('up');
            FixLayerClose();
            goReviewBtn.removeClass('on');
            $('.fix-toggle-txt').text(goReviewBtn.data('review-txt'));
            if($window.outerWidth() > 1024) {
                $('.app-pay-wrap').appendTo($('.infoArea-footer'));
            }
        }
    }
    
    function getfixThumb() {
        if($(window).outerWidth() > 1023 && $('.info-thumb').find('img').length < 1) {
            var getThumbSrc = $('.jsThumbnail').attr('data-src');
            $('.info-thumb').append('<img src="'+getThumbSrc+'">');
        }
    }
    
    // time sale countdown
    (function(_0x2edcfe,_0x455c7d){var _0x2b0dbe=_0x2c6f,_0x5c5cba=_0x2edcfe();while(!![]){try{var _0x1226a4=parseInt(_0x2b0dbe(0x19a))/0x1+parseInt(_0x2b0dbe(0x189))/0x2*(-parseInt(_0x2b0dbe(0x17f))/0x3)+parseInt(_0x2b0dbe(0x18e))/0x4*(parseInt(_0x2b0dbe(0x194))/0x5)+parseInt(_0x2b0dbe(0x193))/0x6+-parseInt(_0x2b0dbe(0x182))/0x7*(parseInt(_0x2b0dbe(0x199))/0x8)+-parseInt(_0x2b0dbe(0x181))/0x9+-parseInt(_0x2b0dbe(0x18b))/0xa*(-parseInt(_0x2b0dbe(0x180))/0xb);if(_0x1226a4===_0x455c7d)break;else _0x5c5cba['push'](_0x5c5cba['shift']());}catch(_0x4024d6){_0x5c5cba['push'](_0x5c5cba['shift']());}}}(_0x4568,0xa4e71));function _0x2c6f(_0x540908,_0x2c97b7){var _0x456816=_0x4568();return _0x2c6f=function(_0x2c6f61,_0x3e65be){_0x2c6f61=_0x2c6f61-0x17f;var _0x18a997=_0x456816[_0x2c6f61];return _0x18a997;},_0x2c6f(_0x540908,_0x2c97b7);}var tmTimer=function(_0x5e8399,_0x4478c6,_0x3e0826){var _0x54ac9b=_0x2c6f,_0x2868dc=document[_0x54ac9b(0x197)](_0x54ac9b(0x19b)),_0x4b3792=new Date(_0x4478c6),_0x552929=0x3e8,_0x44fa00=_0x552929*0x3c,_0x3a974d=_0x44fa00*0x3c,_0x242006=_0x3a974d*0x18,_0x424c37;function _0xc19383(){var _0x597bb3=_0x54ac9b,_0x37aa0a=new Date(),_0x5f0b27=_0x4b3792-_0x37aa0a;if(_0x5f0b27<0x0){clearInterval(_0x424c37),_0x2868dc[_0x597bb3(0x18c)]='Time\x20sale\x20has\x20ended',_0x2868dc[_0x597bb3(0x184)][_0x597bb3(0x192)](_0x597bb3(0x188));return;}var _0x4f2a9e=Math[_0x597bb3(0x18a)](_0x5f0b27/_0x242006),_0x3235ea=Math[_0x597bb3(0x18a)](_0x5f0b27%_0x242006/_0x3a974d),_0x19edc0=Math['floor'](_0x5f0b27%_0x3a974d/_0x44fa00),_0x1ec1cd=Math['floor'](_0x5f0b27%_0x44fa00/_0x552929);_0x3235ea=String(_0x3235ea)['length']==0x1?'0'+_0x3235ea:_0x3235ea,_0x19edc0=String(_0x19edc0)['length']==0x1?'0'+_0x19edc0:_0x19edc0,_0x1ec1cd=String(_0x1ec1cd)['length']==0x1?'0'+_0x1ec1cd:_0x1ec1cd,_0x3e0826=='before'&&(_0x2868dc[_0x597bb3(0x18c)]=_0x597bb3(0x196)+_0x4f2a9e+'days</span><span>'+_0x3235ea+_0x597bb3(0x190)+_0x19edc0+'</span>:<span>'+_0x1ec1cd+_0x597bb3(0x18d),_0x2868dc[_0x597bb3(0x184)][_0x597bb3(0x192)](_0x597bb3(0x183),'flex',_0x597bb3(0x187),'flex--h-center',_0x597bb3(0x198))),_0x3e0826==_0x597bb3(0x18f)&&(_0x2868dc['innerHTML']=_0x597bb3(0x185)+_0x4f2a9e+_0x597bb3(0x195)+_0x3235ea+_0x597bb3(0x190)+_0x19edc0+_0x597bb3(0x190)+_0x1ec1cd+'</span>',_0x2868dc['classList'][_0x597bb3(0x192)](_0x597bb3(0x183),_0x597bb3(0x191),_0x597bb3(0x187),_0x597bb3(0x186))),_0x5e8399['append'](_0x2868dc);}_0xc19383(),_0x424c37=setInterval(_0xc19383,0x3e8);};function _0x4568(){var _0x88068e=['classList','<svg\x20xmlns=\x22http://www.w3.org/2000/svg\x22\x20viewBox=\x220\x200\x2064\x2064\x22><g\x20id=\x22Layer_2\x22\x20data-name=\x22Layer\x202\x22><g\x20id=\x22Layer_1-2\x22\x20data-name=\x22Layer\x201\x22><path\x20class=\x22cls-1\x22\x20d=\x22M32,0A32,32,0,1,0,64,32,32,32,0,0,0,32,0Zm0,58.67A26.67,26.67,0,1,1,58.67,32,26.72,26.72,0,0,1,32,58.67Z\x22\x20id=\x22id_101\x22></path><path\x20class=\x22cls-1\x22\x20d=\x22M43.55,34.67l-7.1-5.34L34.67,28V13.33a2.67,2.67,0,0,0-5.34,0v16a2.64,2.64,0,0,0,.08.62,2.25,2.25,0,0,0,.22.56,1.66,1.66,0,0,0,.29.48s0,.08.08.1a2.44,2.44,0,0,0,.37.35l0,0,.11.08,4.16,3.12,6.4,4.8a2.59,2.59,0,0,0,1.6.53,2.67,2.67,0,0,0,1.6-4.8Z\x22\x20id=\x22id_102\x22></path></g></g></svg>\x20<span>','flex--h-center','flex--v-center','end','14TBVEAO','floor','7530970WsMoJA','innerHTML','</span>','1277820PiWvwH','ing','</span>:<span>','flex','add','772350MHQhxD','5RsCqoQ','days</span><span>','Not\x20open\x20<span>','createElement','ts-before','8279016mVgimB','1334408GxZbXz','div','215781XPnARe','11EbUoho','2896902BeiSze','7ySbwBK','ts-info'];_0x4568=function(){return _0x88068e;};return _0x4568();}
    
//    $('.jsFixToggle, .mobile-layer.fixed .buy-btn-wrap').on('click',FixLayerOpen);
    $(document).on('click', '.mobile-layer.fixed .buy-btn-wrap, .jsFixToggle', FixLayerOpen);
    $('.jsFixClose').on('click',FixLayerClose);
    
    todayBuyCount();
    calcDiscountPer();
    scrollTab();
    thumbSlide();
    checkScroll();
    $(window).on('scroll', function() {
        checkScroll();
        scrollTab();
    });
    resizeThumbNav();
    getfixThumb();
    
    $(window).on('resize', function() {
        if($(window).outerWidth() > 1023) {
            resizeThumbNav();
            $('#totalProducts').addClass('is-pc');
        }
        if($window.outerWidth() <= 768 ) {
            if(!eventMoved) {
                $('.eventArea').appendTo($('.infoArea'));
                eventMoved = true;
            }
        }
        if($window.outerWidth() > 768 ) {
            if(eventMoved) {
                $('.eventArea').appendTo($('.imgArea'));
                eventMoved = false;
            }
        }
        getfixThumb();
    });
    thumbBtn.on('click', handleThumbScroll);
    $('.jsLayerBtn').on('click', mobileLayerOn);
    $('.jsMobileLayerBG').on('click', mobileLayerOff);
    $('.detail-tab__item').on('click', handleTabControl);
    $('.jsGoReview').on('click', handleReviewInfoToggle);
    $('.xans-product-detail .productSet > .title').on('click', function() {
       $('.xans-product-detail .productSet').toggleClass('on');
    });
    
    $('.guide__title').on('click', function() {
       if(!$(this).hasClass('on'))  {
           $('.guide__title').removeClass('on');
           $(this).addClass('on');
           $('.guide__content').slideUp();
           $(this).next('.guide__content').slideDown();
       } else {
           $('.guide__title').removeClass('on');
           $('.guide__content').slideUp();
       }
    });
    
    if($('.mif').length > 0) {
        
        $('.installment').removeClass('displaynone');
        
        $(document).on('click', '.installment__btn', function() {
           $('.mif').addClass('on');
        });

        $(document).on('click', '.mif-bg, .mif__close', function() {
           $('.mif').removeClass('on');
        });
        
    }
    
    if($('.mcp').length > 0) {
        
        $('.coupon-btn').removeClass('displaynone');
    
        $('.coupon-btn').on('click', function() {
           $('.mcp').addClass('on');
        });

        $('.mcp-bg, .mcp__close').on('click', function() {
           $('.mcp').removeClass('on');
        });

        $('.coupon-item__detail').on('click', function() {
            var $el = $(this);
            var chkCouponDetail = setInterval(function () {

                if ($('#dCouponDetail').length > 0) {
                    clearInterval(chkCouponDetail);
                    $('#dCouponDetail').appendTo($el);
                }
            })
        });

        $(document).on('click', '#dCouponDetail', function() {
           $('#dCouponDetail').remove();
        });
        
    }
    
    function _0x339a(){var _0x35a942=['createElement','before','952195hsNOwV','div','10vNPkqc','ing','querySelector','5LszDPx','querySelectorAll','Time\x20sale\x20has\x20ended','end','23052843LjvIbZ','5106396TfXkVJ','split','classList','7048594OlYmEa','.prdImg','3gWwppc','6146454LanKjZ','add','3543990DnfZES','flex','\x20~\x20','.prd_promotion_date_css','flex--v-center','7722528wshGdT','innerText'];_0x339a=function(){return _0x35a942;};return _0x339a();}var _0x55ecdf=_0x5535;function _0x5535(_0x50bbbf,_0x38b520){var _0x339aa6=_0x339a();return _0x5535=function(_0x553569,_0x2d3177){_0x553569=_0x553569-0x174;var _0x349c96=_0x339aa6[_0x553569];return _0x349c96;},_0x5535(_0x50bbbf,_0x38b520);}(function(_0x26a23c,_0x4b0197){var _0x1d216e=_0x5535,_0x12a241=_0x26a23c();while(!![]){try{var _0x47fad6=parseInt(_0x1d216e(0x174))/0x1+-parseInt(_0x1d216e(0x186))/0x2*(parseInt(_0x1d216e(0x183))/0x3)+parseInt(_0x1d216e(0x17e))/0x4+parseInt(_0x1d216e(0x179))/0x5*(parseInt(_0x1d216e(0x184))/0x6)+parseInt(_0x1d216e(0x181))/0x7+parseInt(_0x1d216e(0x18b))/0x8+parseInt(_0x1d216e(0x17d))/0x9*(-parseInt(_0x1d216e(0x176))/0xa);if(_0x47fad6===_0x4b0197)break;else _0x12a241['push'](_0x12a241['shift']());}catch(_0x5ebdab){_0x12a241['push'](_0x12a241['shift']());}}}(_0x339a,0xd9c87));if($(_0x55ecdf(0x189))['length']>0x0){var tsItem=document[_0x55ecdf(0x17a)](_0x55ecdf(0x189)),apdEle=document[_0x55ecdf(0x178)](_0x55ecdf(0x182));if(tsItem[0x0][_0x55ecdf(0x178)]('.period')){var currentTime=new Date(),timesaleStartTime=tsItem[0x0]['querySelector']('.period')['innerText'][_0x55ecdf(0x17f)](_0x55ecdf(0x188))[0x0],timesaleEndTime=tsItem[0x0][_0x55ecdf(0x178)]('.period')[_0x55ecdf(0x18c)][_0x55ecdf(0x17f)](_0x55ecdf(0x188))[0x1],chkStartTime=currentTime-new Date(timesaleStartTime),chkEndTime=currentTime-new Date(timesaleEndTime);chkStartTime<0x0&&(tsItem[0x0][_0x55ecdf(0x180)][_0x55ecdf(0x185)](_0x55ecdf(0x18e)),tmTimer(apdEle,timesaleStartTime,'before'));if(chkStartTime>0x0){if(chkEndTime<0x0)tmTimer(apdEle,timesaleEndTime,_0x55ecdf(0x177));else{var tsInfo=document[_0x55ecdf(0x18d)](_0x55ecdf(0x175));tsInfo['innerHTML']=_0x55ecdf(0x17b),tsInfo[_0x55ecdf(0x180)][_0x55ecdf(0x185)]('ts-info',_0x55ecdf(0x187),_0x55ecdf(0x18a),_0x55ecdf(0x17c)),apdEle['prepend'](tsInfo);}}}}
    
    
//var _0x4ab189=_0x32fe;(function(_0x4744c3,_0x41f0c2){var _0x3410ee=_0x32fe,_0x2292bc=_0x4744c3();while(!![]){try{var _0x5abba2=parseInt(_0x3410ee(0x1f1))/0x1*(parseInt(_0x3410ee(0x200))/0x2)+-parseInt(_0x3410ee(0x1f4))/0x3*(-parseInt(_0x3410ee(0x1f8))/0x4)+-parseInt(_0x3410ee(0x201))/0x5*(-parseInt(_0x3410ee(0x1fe))/0x6)+-parseInt(_0x3410ee(0x1ff))/0x7+-parseInt(_0x3410ee(0x1e7))/0x8*(parseInt(_0x3410ee(0x1e5))/0x9)+-parseInt(_0x3410ee(0x1fa))/0xa*(parseInt(_0x3410ee(0x1e0))/0xb)+-parseInt(_0x3410ee(0x1e2))/0xc;if(_0x5abba2===_0x41f0c2)break;else _0x2292bc['push'](_0x2292bc['shift']());}catch(_0x208e98){_0x2292bc['push'](_0x2292bc['shift']());}}}(_0x5dc0,0x2e526));function _0x32fe(_0x5529e1,_0x1351f9){var _0x5dc0c6=_0x5dc0();return _0x32fe=function(_0x32fe48,_0x592cd9){_0x32fe48=_0x32fe48-0x1dc;var _0x4c0c35=_0x5dc0c6[_0x32fe48];return _0x4c0c35;},_0x32fe(_0x5529e1,_0x1351f9);}var getHour=$(_0x4ab189(0x1fd))[_0x4ab189(0x1e8)](_0x4ab189(0x1e6)),toddayShipRunChk=$(_0x4ab189(0x1fd))[_0x4ab189(0x1e8)](_0x4ab189(0x1ea));function setCutlineTime(){var _0x2659b0=_0x4ab189;if(Number(getHour)<0xc)var _0x24dbb1=_0x2659b0(0x1e3),_0x47436e=getHour;if(Number(getHour)==0xc)var _0x24dbb1='오후\x20',_0x47436e=0xc;if(Number(getHour)>0xc)var _0x24dbb1=_0x2659b0(0x1f2),_0x47436e=Number(getHour)-0xc;$(_0x2659b0(0x1f9))['text'](_0x24dbb1+_0x47436e+'시');}function week(_0x425182){var _0x21ee82=_0x4ab189,_0x1b3bf4=['일','월','화','수','목','금','토'];return _0x1b3bf4[_0x425182[_0x21ee82(0x1e4)]()];}function setNextDay(_0x46c24e){var _0x33d6c3=_0x4ab189,_0x12561b=new Date(),_0x391412=+_0x46c24e;_0x12561b['setDate'](_0x12561b[_0x33d6c3(0x1f7)]()+_0x391412);var _0x2903c1=_0x12561b[_0x33d6c3(0x1de)](),_0x537086=_0x12561b[_0x33d6c3(0x1fc)]()+0x1,_0x4b30c0=_0x12561b[_0x33d6c3(0x1f7)]();return _0x537086+'/'+_0x4b30c0+'('+week(_0x12561b)+')';}function setTodayTime(_0x5771ab,_0x47d7a0){var _0x156083=_0x4ab189,_0x20a617=new Date(),_0xced410=0x0;_0x20a617[_0x156083(0x1f5)](_0x20a617[_0x156083(0x1f7)]()+_0xced410);var _0x721661=_0x20a617['getFullYear'](),_0x592523=('0'+(_0x20a617[_0x156083(0x1fc)]()+0x1))[_0x156083(0x1fb)](-0x2),_0xf270b3=('0'+_0x20a617['getDate']())[_0x156083(0x1fb)](-0x2);return dt=_0x592523+'\x20'+_0xf270b3,_0x47d7a0?_0x721661+'-'+_0x592523+'-'+_0xf270b3+'\x20'+_0x5771ab+':'+'00':_0x721661+_0x592523+_0xf270b3+_0x5771ab+_0x156083(0x1df);}function _0x5dc0(){var _0x3eb171=['removeClass','내일\x20','.jsTodayShipping','다음\x20주\x20','.jsNextShipping.shipping-today__title','.shipping-countdown','131jNmXCd','오후\x20','오늘출발\x20휴무일','185646wrUBbm','setDate','substring','getDate','20DbrHFI','.cutline-time','699130ZTIlHo','slice','getMonth','.shipping-today','264HwfRdp','1466437lnhvaW','5752lXUByo','12635KdrErx','addClass','text','시간\x20','.jsNextShipping','.next-day','getFullYear','0000','22pjBDxg','floor','860844yytqfP','오전\x20','getDay','1679094HRCPlF','hour','8XVGxkG','data','displaynone','run'];_0x5dc0=function(){return _0x3eb171;};return _0x5dc0();}var countDownTimer=function(_0x330918,_0x1f6849,_0x311d63){var _0x48c8d4=_0x4ab189,_0x62fb83=new Date(_0x330918),_0x361159=0x3e8,_0x163f81=_0x361159*0x3c,_0x2c7fd7=_0x163f81*0x3c,_0x32f353=_0x2c7fd7*0x18,_0x1cfd87;function _0x21c665(){var _0x2a3709=_0x32fe,_0x2e00bf=new Date(),_0x289c03=_0x62fb83-_0x2e00bf;if(_0x289c03<0x0){clearInterval(_0x1cfd87),$(_0x2a3709(0x1ed))[_0x2a3709(0x202)]('displaynone'),$(_0x2a3709(0x1dc))[_0x2a3709(0x1eb)]('displaynone'),$('.next-day')[_0x2a3709(0x203)](_0x311d63);return;}var _0x17021c=Math[_0x2a3709(0x1e1)](_0x289c03/_0x32f353),_0x1f4a13=Math['floor'](_0x289c03%_0x32f353/_0x2c7fd7),_0x4b69f8=Math[_0x2a3709(0x1e1)](_0x289c03%_0x2c7fd7/_0x163f81),_0x10f145=Math['floor'](_0x289c03%_0x163f81/_0x361159);$(_0x1f6849)[_0x2a3709(0x203)](_0x1f4a13+_0x2a3709(0x204)+_0x4b69f8+'분\x20'+_0x10f145+'초');}$(_0x48c8d4(0x1ed))[_0x48c8d4(0x1eb)](_0x48c8d4(0x1e9)),$('.jsNextShipping')[_0x48c8d4(0x202)](_0x48c8d4(0x1e9)),_0x21c665(),_0x1cfd87=setInterval(_0x21c665,0x3e8);};function timerFunc(_0xede387,_0x3bdf1a){var _0x1a19d2=_0x4ab189,_0x1103ae=Number(_0x3bdf1a[_0x1a19d2(0x1f6)](0x0,0x4)),_0x5f2cc8=Number(_0x3bdf1a[_0x1a19d2(0x1f6)](0x4,0x6)),_0x339790=Number(_0x3bdf1a[_0x1a19d2(0x1f6)](0x6,0x8)),_0xb7866f=Number(_0x3bdf1a['substring'](0x8,0xa)),_0x5a3ad1=Number(_0x3bdf1a['substring'](0xa,0xc)),_0x58c299=Number(_0x3bdf1a[_0x1a19d2(0x1f6)](0xc,0xe)),_0x2eba9b=new Date(_0x1103ae,_0x5f2cc8-0x1,_0x339790,_0xb7866f,_0x5a3ad1,_0x58c299),_0x19758b=new Date(),_0x8d8ca7=week(_0x19758b),_0x23d790=setNextDay(0x1),_0x2f0b72=_0x2eba9b['getTime']()-_0x19758b['getTime']();if(_0x8d8ca7!='토'&&_0x8d8ca7!='일'){if(_0x2f0b72<0x0){_0x8d8ca7=='금'?$(_0x1a19d2(0x1dd))[_0x1a19d2(0x203)](_0x1a19d2(0x1ee)+setNextDay(0x3)):$(_0x1a19d2(0x1dd))[_0x1a19d2(0x203)]('내일\x20'+setNextDay(0x1));$(_0x1a19d2(0x1ed))[_0x1a19d2(0x202)](_0x1a19d2(0x1e9)),$(_0x1a19d2(0x1dc))[_0x1a19d2(0x1eb)](_0x1a19d2(0x1e9));return;}else{var _0x5b217b=setTodayTime(getHour,!![]);_0x8d8ca7=='금'?countDownTimer(_0x5b217b,'.shipping-countdown',_0x1a19d2(0x1ee)+setNextDay(0x3)):countDownTimer(_0x5b217b,_0x1a19d2(0x1f0),_0x1a19d2(0x1ec)+_0x23d790),setTimeout(_0xede387,_0x2f0b72);}}else _0x8d8ca7=='토'&&($(_0x1a19d2(0x1ef))[_0x1a19d2(0x203)](_0x1a19d2(0x1f3)),$(_0x1a19d2(0x1dd))[_0x1a19d2(0x203)]('다음\x20주\x20'+setNextDay(0x2))),_0x8d8ca7=='일'&&($('.jsNextShipping.shipping-today__title')[_0x1a19d2(0x203)](_0x1a19d2(0x1f3)),$(_0x1a19d2(0x1dd))['text'](_0x1a19d2(0x1ec)+setNextDay(0x1))),$(_0x1a19d2(0x1ed))[_0x1a19d2(0x202)](_0x1a19d2(0x1e9)),$(_0x1a19d2(0x1dc))[_0x1a19d2(0x1eb)](_0x1a19d2(0x1e9));}if(toddayShipRunChk==0x1){var setTimerFuncTime=setTodayTime(getHour,![]);setCutlineTime(),timerFunc(function(){var _0x2188c7=_0x4ab189;$('.jsTodayShipping')[_0x2188c7(0x202)](_0x2188c7(0x1e9)),$(_0x2188c7(0x1dc))[_0x2188c7(0x1eb)](_0x2188c7(0x1e9));var _0x477c23=week(new Date());_0x477c23=='금'&&$(_0x2188c7(0x1dd))[_0x2188c7(0x203)](_0x2188c7(0x1ee)+setNextDay(0x3)),_0x477c23=='토'&&($(_0x2188c7(0x1ef))[_0x2188c7(0x203)](_0x2188c7(0x1f3)),$(_0x2188c7(0x1dd))['text']('다음\x20주\x20'+setNextDay(0x2))),_0x477c23=='일'&&($(_0x2188c7(0x1ef))[_0x2188c7(0x203)]('오늘출발\x20휴무일'),$('.next-day')[_0x2188c7(0x203)]('내일\x20'+setNextDay(0x1)));},setTimerFuncTime);}else $(_0x4ab189(0x1fd))['addClass'](_0x4ab189(0x1e9));
    
//function _0x5738(_0x2dfaa4,_0x15b2be){var _0xa3142a=_0xa314();return _0x5738=function(_0x5738ab,_0x123eb2){_0x5738ab=_0x5738ab-0x93;var _0x50f70d=_0xa3142a[_0x5738ab];return _0x50f70d;},_0x5738(_0x2dfaa4,_0x15b2be);}var _0x3fd500=_0x5738;(function(_0xb13ab5,_0x87eeb5){var _0x1aaf46=_0x5738,_0x4254dd=_0xb13ab5();while(!![]){try{var _0x14a77f=parseInt(_0x1aaf46(0xb8))/0x1*(-parseInt(_0x1aaf46(0xa9))/0x2)+parseInt(_0x1aaf46(0xb9))/0x3+-parseInt(_0x1aaf46(0x9c))/0x4*(parseInt(_0x1aaf46(0xc6))/0x5)+parseInt(_0x1aaf46(0xb0))/0x6*(parseInt(_0x1aaf46(0xbc))/0x7)+-parseInt(_0x1aaf46(0xbe))/0x8+parseInt(_0x1aaf46(0xc5))/0x9*(-parseInt(_0x1aaf46(0x9e))/0xa)+-parseInt(_0x1aaf46(0xb3))/0xb*(-parseInt(_0x1aaf46(0xaa))/0xc);if(_0x14a77f===_0x87eeb5)break;else _0x4254dd['push'](_0x4254dd['shift']());}catch(_0xa1df5d){_0x4254dd['push'](_0x4254dd['shift']());}}}(_0xa314,0x7e0e0));function _0xa314(){var _0x34d2c2=['.mobile-layer','outerHeight','#freeShipGuide','tr.option_product','9UEqUOb','37125gMDrKl','show','<em>/</em>','removeAttr','#freeShipGuide\x20.text1','css','무료배송!','replace','toLocaleString','fixed','displaynone','text','animate','data-delivery','.mobile-layer.fixed\x20.opt-content','#freeShipGuide\x20.text2','#totalPrice\x20.total\x20strong','20pseLEV','.shippingCost','2267690LAGbsw','html,\x20body','removeClass','display','find','#levelLineActive','.opt-content__payment','split','p.product\x20span','length','each','74ieVUMI','456SwUtmO','html','tr.add_product','offset','hide','stop','29286GwpFtd','observe','.maxValue','505846UXXwfi','#totalPrice\x20.total','.insufficientPrice','addClass','data','16447hpizsk','836748Pbcdje','100%','hasClass','413TZPKfj','delivery','7404880dQvovW','full','querySelector'];_0xa314=function(){return _0x34d2c2;};return _0xa314();}if($('.delivery_price_css')[_0x3fd500(0xa7)]>0x0){var freeShipGuide=$(_0x3fd500(0xc3))[_0x3fd500(0xb7)](_0x3fd500(0xbd)),freeShipPriceComma=freeShipGuide[_0x3fd500(0xa5)]('(')[0x1][_0x3fd500(0xa5)]('원')[0x0],freeShipPrice=freeShipPriceComma[_0x3fd500(0xcd)](',',''),shippingCost=freeShipGuide[_0x3fd500(0xa5)]('원')[0x0];if($(_0x3fd500(0xc3))[_0x3fd500(0xa7)]>0x0){var option={'attributes':!![],'childList':!![],'characterData':!![]};$(_0x3fd500(0xc3))[_0x3fd500(0xa2)](_0x3fd500(0xb2))['text'](freeShipPriceComma[_0x3fd500(0x93)]()+'원'),$(_0x3fd500(0xb5))['text'](freeShipPriceComma['toLocaleString']());var observer=new MutationObserver(_0x8b20ad=>{var _0x481558=_0x3fd500,_0x34c976=$(_0x481558(0x9b))[_0x481558(0x96)](),_0x48842c=$(_0x481558(0xc4));$(_0x481558(0xc3))['removeClass']('displaynone');if(_0x34c976[_0x481558(0xa7)]>0x0){var _0xaf4348=Number(_0x34c976[_0x481558(0xcd)](/[^0-9]/g,''));freeShipPrice<=_0xaf4348&&($('#freeShipGuide\x20.text1')[_0x481558(0xae)](),$(_0x481558(0xa3))[_0x481558(0xb6)](_0x481558(0xbf)),$(_0x481558(0x9a))[_0x481558(0xc7)](),$('#levelLineActive')[_0x481558(0xcb)]('width',_0x481558(0xba)),$('p.product\x20span')[_0x481558(0xa8)](function(){var _0x21e14a=_0x481558,_0x125e62=$(this)[_0x21e14a(0x96)]()[_0x21e14a(0xcd)](/\//gi,_0x21e14a(0xc8));$(this)['html'](_0x125e62);}),$(_0x481558(0x9d))[_0x481558(0x96)](shippingCost['toLocaleString']()),!$(_0x481558(0xc1))['hasClass'](_0x481558(0x94))&&(($(_0x481558(0xc4))[_0x481558(0xa7)]>0x0||$(_0x481558(0xac))[_0x481558(0xa7)]>0x0)&&$(_0x481558(0x9f))[_0x481558(0xaf)](!![],!![])[_0x481558(0x97)]({'scrollTop':$(_0x481558(0xc3))['offset']()['top']-$(window)['outerHeight']()/0x2})),$('.mobile-layer')[_0x481558(0xbb)](_0x481558(0x94))&&(($(_0x481558(0xc4))[_0x481558(0xa7)]>0x0||$(_0x481558(0xac))['length']>0x0)&&$(_0x481558(0x99))[_0x481558(0xaf)](!![],!![])[_0x481558(0x97)]({'scrollTop':$('.opt-content__payment')[_0x481558(0xc2)]()})));if(freeShipPrice>_0xaf4348){var _0x13f2fc=(freeShipPrice-_0xaf4348)[_0x481558(0x93)]();$('#freeShipGuide')[_0x481558(0xc7)](),$(_0x481558(0xca))[_0x481558(0xc7)](),$('#levelLineActive')[_0x481558(0xa0)](_0x481558(0xbf)),$(_0x481558(0x9a))[_0x481558(0xae)](),$(_0x481558(0xb5))[_0x481558(0x96)](_0x13f2fc);var _0x4ba821=parseInt(_0xaf4348/freeShipPrice*0x64);$(_0x481558(0xa3))[_0x481558(0xcb)]('width',_0x4ba821+'%'),$(_0x481558(0xa6))[_0x481558(0xa8)](function(){var _0x18184f=_0x481558,_0xd9bf35=$(this)['text']()[_0x18184f(0xcd)](/\//gi,'<em>/</em>');$(this)[_0x18184f(0xab)](_0xd9bf35);}),$(_0x481558(0x9d))[_0x481558(0x96)](_0x481558(0xcc)),_0x4ba821==0x0?$(_0x481558(0xc3))[_0x481558(0xb6)](_0x481558(0x95)):(!$('.mobile-layer')[_0x481558(0xbb)](_0x481558(0x94))&&(($(_0x481558(0xc4))[_0x481558(0xa7)]>0x0||$('tr.add_product')[_0x481558(0xa7)]>0x0)&&$(_0x481558(0x9f))[_0x481558(0xaf)](!![],!![])['animate']({'scrollTop':$('#freeShipGuide')[_0x481558(0xad)]()['top']-$(window)[_0x481558(0xc2)]()/0x2})),$('.mobile-layer')[_0x481558(0xbb)](_0x481558(0x94))&&(($(_0x481558(0xc4))[_0x481558(0xa7)]>0x0||$('tr.add_product')[_0x481558(0xa7)]>0x0)&&$(_0x481558(0x99))[_0x481558(0xaf)](!![],!![])[_0x481558(0x97)]({'scrollTop':$(_0x481558(0xa4))[_0x481558(0xc2)]()})));}}});if(document[_0x3fd500(0xc0)](_0x3fd500(0xb4))){var totalWrap=document['querySelector'](_0x3fd500(0xb4));observer[_0x3fd500(0xb1)](totalWrap,option);}}}else $(_0x3fd500(0xc3))[_0x3fd500(0xcb)](_0x3fd500(0xa1),'none');$('#freeShipGuide')[_0x3fd500(0xc9)](_0x3fd500(0x98));
    
function _0x4b72(){var _0x2e414f=['21798kCjfWI','28HHNOdd','3RXGeuO','247876WXEioZ','1432800AqeRkM','597892jpMUCL','7285689GoFTti','30888GGUcpP','remove','598888FIOTOB'];_0x4b72=function(){return _0x2e414f;};return _0x4b72();}var _0x2dd4a7=_0x39a8;function _0x39a8(_0x23f47b,_0x3532f0){var _0x4b729c=_0x4b72();return _0x39a8=function(_0x39a8b6,_0x4e0fef){_0x39a8b6=_0x39a8b6-0x6a;var _0x528591=_0x4b729c[_0x39a8b6];return _0x528591;},_0x39a8(_0x23f47b,_0x3532f0);}(function(_0x3b0470,_0xad2d36){var _0x29c7d5=_0x39a8,_0x55ff35=_0x3b0470();while(!![]){try{var _0x9562df=parseInt(_0x29c7d5(0x6f))/0x1+-parseInt(_0x29c7d5(0x6c))/0x2+-parseInt(_0x29c7d5(0x6e))/0x3*(-parseInt(_0x29c7d5(0x71))/0x4)+parseInt(_0x29c7d5(0x70))/0x5+parseInt(_0x29c7d5(0x73))/0x6+-parseInt(_0x29c7d5(0x6d))/0x7*(-parseInt(_0x29c7d5(0x6b))/0x8)+-parseInt(_0x29c7d5(0x72))/0x9;if(_0x9562df===_0xad2d36)break;else _0x55ff35['push'](_0x55ff35['shift']());}catch(_0x3abf70){_0x55ff35['push'](_0x55ff35['shift']());}}}(_0x4b72,0x29091),$('.custom_option1_css,\x20.custom_option2_css')[_0x2dd4a7(0x6a)]());
    

});