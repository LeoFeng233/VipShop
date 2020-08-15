$(function(){
    // 商品固定导航栏（上方，开始隐藏）
    $('.nav_fix_wrap p a').click(function(){
        $(this).css({'color': '#F10180','border-bottom-color': '#F10180'}).siblings().css({'color': '#333','border-bottom-color': 'transparent'});
    })

    var $nav_to_top = $('.detailmsg_nav').offset().top;
    $(window).scroll(function(){
        var $scroll_top = $(window).scrollTop();
        if($scroll_top >= $nav_to_top){
            $('.nav_fixed_top').css({'display': 'block'});
        }
        else{
            $('.nav_fixed_top').css({'display': 'none'});
        }
    })

    
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
    // 商品评价
    $('.detail_r_evaluation div a').click(function(){
        $(this).css({
            background: '#F10180',
            color: '#fff',
            borderColor: '#F10180'
        }).siblings().css({
            background: '#fff',
            color: '#333333',
            borderColor: '#ccc'
        })
    })

    // 猜你喜欢轮播图
    var like_index = 0;
    var like_length = $('.you_lide_imgs ul').length;      
    $('.like_next').click(function(){
        like_index++;
        if(like_index >= like_length){
            like_index = like_length-1;
        }
        $('.you_like_scroll').animate({scrollLeft: like_index*1000});
        if(like_index===like_length-1){
            $(this).css('cursor','not-allowed');
        }
        $(this).prev().css('cursor', 'pointer');
        $('.you_like_tit i').eq(2).text(like_index+1);
    })
    $('.like_pre').click(function(){
        like_index--;
        if(like_index < 0){
            like_index = 0;
        }
        $('.you_like_scroll').animate({scrollLeft: like_index*1000});
        like_index == 0?$(this).css('cursor','not-allowed'):$(this).css('cursor', 'pointer');
        $(this).next().css('cursor', 'pointer');
        $('.you_like_tit i').eq(2).text(like_index+1);
    })
    $('.like_tit_pre').click(function(){
        like_index--;
        if(like_index < 0){
            like_index = 0;
        }
        $('.you_like_scroll').animate({scrollLeft: like_index*1000});
        
        like_index == 0?$('.like_pre').css('cursor','not-allowed'):null;
        $('.like_next').css('cursor', 'pointer');
        $('.you_like_tit i').eq(2).text(like_index+1);
    })
    $('.like_tit_next').click(function(){
        like_index++;
        if(like_index >= like_length){
            like_index = like_length-1;
        }
        $('.you_like_scroll').animate({scrollLeft: like_index*1000});

        like_index == like_length - 1?$('.like_next').css('cursor','not-allowed'):null;
        $('.like_pre').css('cursor', 'pointer');
        $('.you_like_tit i').eq(2).text(like_index+1);
    })
    // 关于我们
    $('.about_us p span').click(function(){
        $(this).css({'background-position-y': '-120px'}).siblings().css({'background-position-y': 0});
        $(this).parent().next().css({'background-position-y': -(($(this).index()+1)*80 + 160) + 'px'});
    })

})