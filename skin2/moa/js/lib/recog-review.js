if (location.href.indexOf('board_no=') != -1) {
    var boardNoA = location.href.split('board_no=')[1];
} else {
    var boardNoB = location.href.split('/')[5];
}

if (boardNoA == 4 || boardNoB == 4) location.href = '/board/review/list_photo.html?board_no=4';