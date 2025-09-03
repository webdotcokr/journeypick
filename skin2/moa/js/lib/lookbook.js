var modal = $('.lookbook-modal');
var modalCont = $('.lookbook-modal__cont');

function getLoadContent() {
    var getData = this.getAttribute('data-link');
    $.ajax({
        url: getData,
        dataType: 'html',
        success: function (result) {
            
            var contents = $(result).find('#lookbook-detail');
            
            contents.appendTo(modalCont);
            modal.addClass('on');
            
            contents.find('img').each(function() {
               var getSrc = $(this).attr('ec-data-src');
//                $(this).attr('src', getSrc);
                $(this).attr({src: getSrc});
            });
            
            contents.find('img').eq(0).addClass('show');
            contents.find('img').eq(1).addClass('show');
            
            modalCont.on('scroll', function() {
               var thisScroll = $(this).scrollTop();
                
                if(contents.find('img:not(.show)').first().length > 0) {
                    if(contents.find('img:not(.show)').first().position().top - (modalCont.outerHeight() * 0.8) < thisScroll) {
                        contents.find('img:not(.show)').first().addClass('show');
                    }
                }
            });
            

        }
    });
}

function closeContent() {
    modal.removeClass('on');
    setTimeout(function() {
        modalCont.empty();
    },400);
}

$('.lookbook__item').on('click', getLoadContent);
$('.lookbook-modal-bg, .jsModalClose').on('click', closeContent);