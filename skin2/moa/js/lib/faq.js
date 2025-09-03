$(function () {

    var selectedIdx;
    var runCateSlide;

    $('.faq-category').append('<a class="faq-category__item hover-line" href="/board/faq/list.html?board_no=3">All</a>');
    if ($('#board_category').length > 0) {
        $('#board_category').find('option').each(function () {
            if ($(this).val()) {
                var cateCode = $(this).val();
                var cateTxt = $(this).text();
                $('.faq-category').append('<a class="faq-category__item hover-line" href="/board/faq/list.html?board_no=3&category_no=' + cateCode + '">' + cateTxt + '</a>');
                if ($(this).is(':selected')) {
                    selectedIdx = $(this).index();
                }
            } else {
                if ($(this).index() == 0) {
                    selectedIdx = 0;
                }
            }
        });
        $('.faq-category__item').eq(selectedIdx).addClass('on');
    }

    $('.faq__item').on('click', function () {
        if (!$(this).hasClass('on')) {
            $('.faq__item').removeClass('on');
            $(this).addClass('on');
            $('.faq__a').slideUp();
            $(this).find('.faq__a').slideDown();
        } else {
            $('.faq__item').removeClass('on');
            $('.faq__a').slideUp();
        }
    });


    function categorySlide() {
        var winWidth = $(window).outerWidth();
        var slideWrap = $('.jsCateSlide');
        if(winWidth < 768 && runCateSlide == undefined) {
            if (slideWrap.find('.faq-category__item').length > 4) {
                slideWrap.addClass('swiper-container');
                slideWrap.find('.faq-category').addClass('swiper-wrapper');
                slideWrap.find('.faq-category__item').addClass('swiper-slide');
                runCateSlide = new Swiper('.jsCateSlide', {
                    freeMode: true,
                    slidesPerView: 'auto',
                });
            }
        }
        else if(winWidth >= 768 && runCateSlide != undefined) {
            runCateSlide.destroy();
            runCateSlide = undefined;
            slideWrap.removeClass('swiper-container');
            slideWrap.find('.faq-category').removeClass('swiper-wrapper');
            slideWrap.find('.faq-category__item').removeClass('swiper-slide');
        }
    }

    categorySlide();
    $(window).on('resize', categorySlide);
    runCateSlide.slideTo(selectedIdx);

});
