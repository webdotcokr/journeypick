var boardTabSlide;
var currentIdx = 0;
var cateSumWidth = 16;

function boardCateSlide(idx) {
    var winWidth = $(window).width();
    var boardTab = $('.board-tab');

    boardTab.find('li').each(function () {
        cateSumWidth += $(this).outerWidth() + Number($(this).css("marginRight").replace('px', ''));
    });

    if (winWidth <= 768 && boardTabSlide == undefined) {
        if (cateSumWidth >= $(window).outerWidth()) {
            boardTab.addClass('swiper-container');
            boardTab.find('.board-tab__wrapper').addClass('swiper-wrapper');
            boardTab.find('.board-tab__item').addClass('swiper-slide');
            boardTabSlide = new Swiper('.board-tab', {
                slidesPerView: 'auto',
                freeMode: true,
            });
            boardTabSlide.slideTo(idx, 0);
        }
    } else if (winWidth >= 768 && boardTabSlide != undefined) {
        boardTabSlide.destroy();
        boardTabSlide = undefined;
    }
}

$(function () {

    var runTabSlide = false;

    var currentTitle = $('.titleArea h2 font').length > 0 ? $('.titleArea h2 font').text() : $('.titleArea h2').text();

    $('.board-tab__item').each(function () {
        var thisBoardNo = $(this).find('a').attr('href').split('board_no=')[1];
        if (currentTitle == $(this).find('a').text()) {
            $(this).addClass('current');
            currentIdx = $(this).index();
        }
        if (thisBoardNo == '4') {
            $(this).find('a').attr('href', '/board/review/list_photo.html?board_no=4');
        }
        if (thisBoardNo == '3') {
            $(this).find('a').attr('href', '/board/faq/list.html?board_no=3');
        }
    });

    boardCateSlide(currentIdx);

});

/*
$(window).on('resize', function() {
    boardCateSlide(currentIdx);
});
*/