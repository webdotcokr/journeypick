// 상품상세 탭 이벤트
$('#tabProduct a').on('click', function(e){
    var oTarget = $(this).attr('href');
    $(this).parent('li').addClass('selected').siblings().removeClass('selected');

    $('#tabProduct a').each(function(){
        var oSiblings = $(this).attr('href');
        if (oTarget != oSiblings) {
            $(oSiblings).hide();
        } else {
            $(oTarget).show();
        }
    });
    removePagingArea(oTarget);
});

// 해당 게시판 읽기권한 없으면 페이징 삭제
function removePagingArea(oTarget)
{
    if ($(oTarget).length < 1 && (oTarget != '#prdReview' || oTarget != '#prdQna')) return;

    if ($(oTarget).css('display') == 'block') {
        if (oTarget == '#prdReview') {
            //var record = $('#prdReview .xans-record-:first', '.xans-product-review');
            var record = $('.xans-record-', '.xans-product-review').first();
            if (record.length < 1 || record.is(':not(:visible)')) {
                $('.xans-product-reviewpaging').remove();
            }
        } else if (oTarget == '#prdQnA') {
            //var record = $('#prdQnA .xans-record-:first', 'xans-product-qna');
            var record = $('.xans-record-', '.xans-product-qna').first();
            if (record.length < 1 || record.is(':not(:visible)')) {
                $('.xans-product-qnapaging').remove();
            }
        }
    }
}

$(function() {
    // 장바구니, 관심상품, 구매버튼 클론들 액션처리
    $('#actionCartClone, #actionWishClone, #actionBuyClone, #actionWishSoldoutClone').off().on('click', function() {
        try {
            var id = $(this).attr('id').replace(/Clone/g, '');
            if (typeof(id) !== 'undefined') $('#' + id).trigger('click');
            else return false;
        } catch(e) {
            return false;
        }
    });

    // 상품상세설명 없을때 원본보기 삭제
    function productDetailOrigin(){
        var imgChk = $('#prdDetailContent').find('img').length;
        if(imgChk <= 0){
            $('#prdDetailBtn').remove();
        }
    }
    productDetailOrigin();

    // 추가 이미지에 이미지 꾸미기 아이콘 적용
    var oTarget = $('.xans-product-mobileimage ul li');
    var oAppend = oTarget.first().children('p').clone();

    oTarget.slice(1).each(function() {
        var listHtml = $(this).html();
        $(this).children().wrap(function() {
            return '<p class="thumbnail">' + oAppend.html() + listHtml + '</p>';
        });

        $(this).children('p').children('img').first().remove();
    });
});