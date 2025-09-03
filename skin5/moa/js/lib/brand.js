$(function () {
    

    if ($('[rel="jourboo"]').length == 0) {
        var brandCateNo;
        var res = [];
        
        function isCharacterALetter(char) {
          return (/[a-zA-Z]/).test(char);
        }
        
        $.ajax({
            url: '/exec/front/Product/SubCategory',
            dataType: 'json',
            success: function (data) {
                $.each(data, function (m, key) {
                    if (key.name == 'BRAND' || key.name == 'Brand' || key.name == '브랜드') {
                        brandCateNo = key.cate_no;
                    }
                    if (key.parent_cate_no == brandCateNo) {
                        res.push(key);
                    };
                    
                    res.sort(function(a,b) {
                       if(a.name < b.name)  {
                           return -1;
                       }
                       if(a.name > b.name)  {
                           return 1;
                       }
                    });
                    
                });

                // 2. ABC 내비게이터 만들기
                const abcArr = Array.apply(null, {
                    length: 26
                }).map((x, i) => String.fromCharCode(65 + i))
                
                abcArr.unshift('ALL');
                abcArr.push('ETC');
                
                for (let x of abcArr) {
                    $(".brand__alphabet").append(`<a class='brand__char' data-letter='${x}' data-empty="true" href="#brand__row--${x}"><span>${x}</span></a>`);
                    $("#brand").append(`<div class='brand__row brand__row--${x} ' data-letter='${x}'></div>`);
                }

                let firstLetter = '';
                for (let name of res) {
                    const innerFirstLetter = name.name.trim().charAt(0).toUpperCase();
                    if (firstLetter != innerFirstLetter) {
                        firstLetter = innerFirstLetter
                    }
                    if(!isCharacterALetter(innerFirstLetter)) {
                        $(".brand__row--ETC").append(`<a class='brand__item' href='${name.link_product_list}'>${name.name}</a>`);    
                        $('.brand__char[data-letter="ETC"]').attr('data-empty', 'false');
                    } else {
                        $(".brand__row--" + innerFirstLetter).append(`<a class='brand__item' href='${name.link_product_list}'>${name.name}</a>`);
                        $('.brand__char[data-letter="' + innerFirstLetter + '"]').attr('data-empty', 'false');
                    }
                }
                $('.brand__char[data-letter="ALL"]').attr('data-empty', 'false').addClass('current');

            }
        });
    }
    
    $(document).on('click', '.brand__char', function(e) {
        var thisLetter = $(this).attr('data-letter');
        
        $('.brand__char').removeClass('current');
        $(this).addClass('current');
        
        if(thisLetter == 'ALL') {
            $('.brand__row:not(:empty)').show();    
        } else {
            $('.brand__row').hide();
            $('.brand__row[data-letter="' + thisLetter + '"]').show();    
        }
        
        e.preventDefault();
    });

});
