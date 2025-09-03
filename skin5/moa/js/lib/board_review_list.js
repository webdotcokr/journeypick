$(function() {
    var reviewFlag = $(window).width() > 768 ? 3 : 1;
    
    if ($('.best-review .main-review__item').length > reviewFlag) {
        var bestReviewSlide = new Swiper('.jsBestRVSlide', {
            loop: false,
            grabCursor: true,
            slidesPerView: '4',
            spaceBetween: 20,
            navigation: {
                nextEl: ".jsBestNext",
                prevEl: ".jsBestPrev",
            },
            lazyLoading: true,
            lazy: {
                loadPrevNext: true,
            },
            breakpoints: {
                1024: {
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                767: {
                    slidesPerView: 2.1,
                    spaceBetween: 10,
                }
            }
        });
    }
});