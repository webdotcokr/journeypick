$('.agree-toggle').on('click', function() {
   if(!$(this).hasClass('on')) {
       $(this).addClass('on');
       $(this).closest('.title').next('.agree-cont-box').stop(true,true).slideDown();
   } else {
       $(this).removeClass('on');
       $(this).closest('.title').next('.agree-cont-box').stop(true,true).slideUp();
   }
});