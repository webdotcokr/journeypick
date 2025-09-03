function lazyLoadThumb() {
    var objects = document.getElementsByClassName('asyncImage');
    
    if ($('.asyncImage').length > 0) {
        clearInterval(lazyLoadThumb);
        Array.from(objects).map((item) => {
            var img = new Image();
            img.src = item.dataset.src;
            img.onerror = () => {
                item.classList.remove('asyncImage');
                return false;
            }
            img.onload = () => {
                item.classList.remove('asyncImage');
                return item.nodeName === 'IMG' ?
                    item.src = item.dataset.src :
                    item.setAttribute.src = `${item.dataset.src}`;
            };
        });
    }
}

$(function() {

    var repeatLazyLoad = setInterval(lazyLoadThumb);

    $('.btnMore').on('click', function() {
        repeatLazyLoad = setInterval(lazyLoadThumb);
    });

});