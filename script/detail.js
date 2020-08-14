$(function(){
    // 放大镜
    var $minBox = $('.min_box');
    var $maxBox = $('.max_box');
    var $maxImg = $('.max_box img');
    
    $minBox.mouseenter(function(){
        $(this).next().css('z-index', 10);
    })
    $maxBox.mouseleave(function(){
        $(this).css('z-index', 1);
    })
    $maxBox.mousemove(function(e){
        var x = e.offsetX;
        var y = e.offsetY;

        var scaleX = x/420;
        var scaleY = y/420;
        
        var imgX = scaleX*(1100-400);
        var imgY = scaleY*(1100-400);
        $(this).find('img').css({
            marginLeft: -imgX + 'px',
            marginTop: -imgY + 'px'
        })

    })
    // 放大镜下的轮播图
    $det_pre = $('.det_pre');
    $det_next = $('.det_next');
    $detl_scroll = $('.detl_Scr_Wrap');
    $min_img = $('.min_box img');
    $max_img = $('.max_box img');

    $det_pre.click(function(){
        $detl_scroll.animate({scrollLeft: 0});
        $(this).css({'cursor': 'not-allowed','color': '#fff'}).next().css({'cursor': 'pointer','color': '#999'});
    })
    $det_next.click(function(){
        $detl_scroll.animate({scrollLeft: 355});
        $(this).css({'cursor': 'not-allowed','color': '#fff'}).prev().css({'cursor': 'pointer','color': '#999'});
    })
    $detl_scroll.on('mouseenter','img',function(){
        $min_img.prop('src', $(this).prop('src'));
        $max_img.prop('src', $(this).prop('src'));
    })

    // 商品参数
    $('.detailmsg_content p').click(function(){
        
        $('.detail_table_wrap').height()==169?$('.detail_table_wrap').height(421):$('.detail_table_wrap').height(169);
    })





})