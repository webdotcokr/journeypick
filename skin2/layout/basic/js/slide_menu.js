var aCategory = [];
$(document).ready(function(){
    var methods = {
        aCategory    : [],
        aSubCategory : {},
        get: function() {
             $.ajax({
                url : '/exec/front/Product/SubCategory',
                dataType: 'json',
                success: function(aData) {
                    if (aData == null || aData == 'undefined') {
                        methods.checkSub();
                        return;
                    }
                    for (var i=0; i<aData.length; i++)
                    {
                        var sParentCateNo = aData[i].parent_cate_no;
                        var sCateNo = aData[i].cate_no;
                        if (!methods.aSubCategory[sParentCateNo]) {
                            methods.aSubCategory[sParentCateNo] = [];
                        }
                        if (!aCategory[sCateNo]) {
                            aCategory[sCateNo] = [];
                        }
                        methods.aSubCategory[sParentCateNo].push( aData[i] );
                        aCategory[sCateNo] = aData[i];
                        
                    }
                    methods.checkSub();
//                    
                    $.each(aData, function(idx, item) {
                        if(item.design_page_url != "product/list.html") {
                            $('#cate'+item.cate_no).find('.view').attr('href', '/'+item.design_page_url+item.param);
                        }
                    });
                        
                    
                }
            });
        },
        getParam: function(sUrl, sKey) {
            if (typeof sUrl !== 'string') return;
            var aUrl         = sUrl.split('?');
            var sQueryString = aUrl[1];
            var aParam       = {};
            if (sQueryString) {
                var aFields = sQueryString.split("&");
                var aField  = [];
                for (var i=0; i<aFields.length; i++) {
                    aField = aFields[i].split('=');
                    aParam[aField[0]] = aField[1];
                }
            }
            return sKey ? aParam[sKey] : aParam;
        },

        show: function(overNode, iCateNo) {
             var oParentNode = overNode;
            var aHtml = [];
            var sMyCateList = localStorage.getItem("myCateList");
            if (methods.aSubCategory[iCateNo] != undefined) {
                aHtml.push('<ul class="aside-child">');
                $(methods.aSubCategory[iCateNo]).each(function() {
                    var sNextParentNo = this.cate_no;
                    var sCateSelected = (checkInArray(sMyCateList, this.cate_no) == true) ? ' selected' : '';
                    if (methods.aSubCategory[sNextParentNo] == undefined) {
                        aHtml.push('<li class="noChild" id="cate'+this.cate_no+'">');
                        var sHref = '/'+this.design_page_url+this.param;
                    } else {
                        aHtml.push('<li id="cate'+this.cate_no+'">');
                        var sHref = '#none';
                    }
                    aHtml.push('<a href="/'+this.design_page_url+this.param+'" class="view" cate="'+this.param+'" data-i18n="LIST.PRD_CATE_NO_'+this.cate_no+'" data-i18n-new>'+this.name+'</a>');
                    if (methods.aSubCategory[sNextParentNo] != undefined)  aHtml.push('<a href="'+sHref+'"'+this.param+'" onclick="subMenuEvent(this);" class="cate"><svg xmlns="http://www.w3.org/2000/svg" width="11.001" height="6.208" viewBox="0 0 11.001 6.208"><path id="chevron-down" d="M7.646,14.646a.5.5,0,0,0,.708.708ZM13,10l.354.354L13.707,10l-.353-.354ZM8.354,4.646a.5.5,0,0,0-.708.708Zm0,10.708,5-5-.708-.708-5,5Zm5-5.708-5-5-.708.708,5,5Z" transform="translate(15.501 -7.499) rotate(90)"></path></svg></a>');

                    if (methods.aSubCategory[sNextParentNo] != undefined) {
                        aHtml.push('<ul class="aside-child-third">');
                        $(methods.aSubCategory[sNextParentNo]).each(function() {
                            var sNextParentNo2 = this.cate_no;
                            var sCateSelected = (checkInArray(sMyCateList, this.cate_no) == true) ? ' selected' : '';
                            if (methods.aSubCategory[sNextParentNo2] == undefined) {
                                aHtml.push('<li class="noChild" id="cate'+this.cate_no+'">');
                                var sHref = '/'+this.design_page_url+this.param;
                            } else {
                                aHtml.push('<li id="cate'+this.cate_no+'">');
                                var sHref = '#none';
                            }
                            aHtml.push('<a href="/'+this.design_page_url+this.param+'" class="view" cate="'+this.param+'" data-i18n="LIST.PRD_CATE_NO_'+this.cate_no+'" data-i18n-new>'+this.name+'</a>');
                            if (methods.aSubCategory[sNextParentNo] != undefined)  aHtml.push('<a href="'+sHref+'"'+this.param+'" onclick="subMenuEvent(this);" class="cate"><svg xmlns="http://www.w3.org/2000/svg" width="11.001" height="6.208" viewBox="0 0 11.001 6.208"><path id="chevron-down" d="M7.646,14.646a.5.5,0,0,0,.708.708ZM13,10l.354.354L13.707,10l-.353-.354ZM8.354,4.646a.5.5,0,0,0-.708.708Zm0,10.708,5-5-.708-.708-5,5Zm5-5.708-5-5-.708.708,5,5Z" transform="translate(15.501 -7.499) rotate(90)"></path></svg></a>');

                            if (methods.aSubCategory[sNextParentNo2] != undefined) {
                                aHtml.push('<ul>');

                                $(methods.aSubCategory[sNextParentNo2]).each(function() {
                                    aHtml.push('<li class="noChild" id="cate'+this.cate_no+'">');
                                    var sCateSelected = (checkInArray(sMyCateList, this.cate_no) == true) ? ' selected' : '';
                                    aHtml.push('<a href="/'+this.design_page_url+this.param+'" class="view" cate="'+this.param+'" onclick="subMenuEvent(this);" data-i18n="LIST.PRD_CATE_NO_'+this.cate_no+'" data-i18n-new>'+this.name+'</a>');
                                    aHtml.push('</li>');
                                });
                                aHtml.push('</ul>');
                            }
                            aHtml.push('</li>');
                        });
                        aHtml.push('</ul>');
                    }
                    aHtml.push('</li>');
                });
                aHtml.push('</ul>');
            }
            if($(oParentNode).children('ul').length < 1) {
                $(oParentNode).append(aHtml.join(''));
            }
            if (window.i18nextCafe24) {
            	i18nextCafe24.translate('data-i18n-new');
            }
        },
        close: function() {
//            $('.aside-child').remove();
        },
        checkSub: function() {
            $('.cate').each(function(){
                var sParam = $(this).attr('cate');
                if (!sParam) return;
                var iCateNo = Number(methods.getParam(sParam, 'cate_no'));
                var result = methods.aSubCategory[iCateNo];
                if (result == undefined) {
                    if ($(this).closest('#slideProjectList').length) {
                        var sHref = '/product/project.html'+sParam;
                    } else {
                        var sHref = '/product/list.html'+sParam;
                    }

                    $(this).attr('href', sHref);
                    $(this).parent().attr('class', 'noChild aside-category__item');
                }
            });
        }
    };

    methods.get();
    
    function asideOn() {
        $('.aside').addClass('on');
    }
    
    function asideOff() {
        $('.aside').removeClass('on');
        setTimeout(function() {
            $('.aside a.cate').removeClass('on');
            $('.aside-child, .aside-child-third').slideUp();
        },600);
    }
    
    $('.jsHamburger').on('click', asideOn);
    $('.aside-bg, .aside__close').on('click', asideOff);
    $('.aside-tab__item').on('click', function() {
       var getIdx = $(this).index();
        $('.aside-tab__item').removeClass('on');
        $(this).addClass('on');
        $('.aside-category__list').css('display', 'none');
        $('.aside-category__list').eq(getIdx).css('display', 'block');
    });

    $(document).on('click', '#slideCateList > ul > li > a.cate', function(e) {
        var sParam = $(this).attr('cate');
//        if (!sParam) return;
        var iCateNo = Number(methods.getParam(sParam, 'cate_no'));
        var hasClass =  $(this).parent().hasClass('selected');
        
        //if ($(this).parent().attr('class') == 'xans-record- selected') {
        if(sParam) {
            if (!iCateNo) return;
            $('#aside #slideCateList li').removeClass('selected');
            methods.close();
            methods.show(this.parentNode, iCateNo);
        }
        if(!$(this).hasClass('on')) {
            $('#slideCateList > ul > li > a.cate').removeClass('on');
            $(this).addClass('on');
            $('.aside-child').slideUp();
            $(this).next('.aside-child').slideDown();
        } else {
            $('#slideCateList > ul > li > a.cate').removeClass('on');
            $('.aside-child').slideUp();
        }
        e.preventDefault();
    });
    
    $(document).on('click', '.aside-child > li > a.cate', function(e) {
        if(!$(this).hasClass('on')) {
            $('.aside-child > li > a.cate').removeClass('on');
            $(this).addClass('on');
            $('.aside-child-third').slideUp();
            $(this).next('.aside-child-third').slideDown();
        } else {
            $('.aside-child > li > a.cate').removeClass('on');
            $('.aside-child-third').slideUp();
        }
        e.preventDefault();
    })

    $('#aside ul a.cate').click(function(e){
            $(this).parent().find('li').removeClass('selected');
            $(this).parent().toggleClass('selected');
            if (!$(this).parent('li').hasClass('noChild')){
                e.preventDefault();
            }
    });

    $('#slideCateList h2').click(function() {
        var oParentId = $(this).parent().attr('id');
        if (oParentId == 'slideCateList' || oParentId == 'slideMultishopList' || oParentId == 'slideProjectList') {
            ($(this).attr('class') == 'selected') ? $(this).next().hide() : $(this).next().show();
        }
        $(this).toggleClass('selected');
    });

    $('#slideProjectList .icoCategory').click(function() {
        var target = $(this).parents('#slideProjectList');
        if(target.find('.categoryList').css("display") == "none"){
            target.find('.categoryList').show();
        }else{
            target.find('.categoryList').hide();
        }
        
        $(this).parents('.title').toggleClass('selected');
    });

});
function subMenuEvent(obj) {
    $(obj).parent().find('li').removeClass('selected');
    $(obj).parent().toggleClass('selected');
}

function checkInArray(sBookmarkList, iCateNo) {
    if (sBookmarkList == null) return false;
    var aBookmarkList = sBookmarkList.split("|");
    for (var i = 0; i < aBookmarkList.length; i++) {
        if (aBookmarkList[i] == iCateNo) {
            return true;
        }
    }
    return false;
}