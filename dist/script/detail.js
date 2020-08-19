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

    // 商品左侧热销商品
    var g_good_index = 0;
    $('.g_goods_next').click(function(){
        g_good_index++;
        if(g_good_index >=2){
            g_good_index = 2;
            $(this).css({'background': '#ccc'})
        }
        $(this).siblings().css({'background': '#fff'});
        $('.goods_scroll').animate({scrollTop: g_good_index*1000});
    })
    $('.g_goods_pre').click(function(){
        g_good_index--;
        if(g_good_index < 0){
            g_good_index = 0;            
        }
        if(g_good_index === 0){
            $(this).css({'background': '#ccc'})
        }
        $(this).siblings().css({'background': '#fff'});
        $('.goods_scroll').animate({scrollTop: g_good_index*1000});
    })
    $(window).resize(function(){
        if($('.detailmsg_content_wrap').offset().left <= 200){
            $('.detail_good_goods').css({'display': 'none'});
        }else{
            $('.detail_good_goods').css({'display': 'block'});
        }
    })

    // 数据动态渲染
    var url = window.location.href;
    try {
        var goods_id = url.split('?')[1].split('=')[1];
    } catch (error) {
        console.log('直接访问详情页。。。。。。。微臣用try catch捕获了！');
    }
    $.ajax({
        url: '../data/goods.json',
        type: 'get',
        dataType: 'json',
        success: function(json){

            for(var j=0,len=json.length;j<len;j++){
                var item = json[j];
                if(item.goods_id === goods_id){
                    $('.min_box img').prop('src', item.max_img);
                    $('.max_box img').prop('src', item.max_img);
                    var imgs_str = '';
                    for(var i=0,len=item.detail_imgs.length;i<len;i++){
                        imgs_str += `
                        <div><img src="${item.detail_imgs[i]}" alt=""></div>
                        `;
                    }
                    var text_str = `
                    <i>¥</i><span>${item.currentPrice.slice(1)}</span><b>${item.sourcePrice}</b><strong>${item.zhe}</strong>
                    `;
                    $('.detail_r h2').text(item.description);
                    $('.det_r_price div').html(text_str);
                    $('.detl_Scr_Wrap>div').html(imgs_str);
                    break;
                }
            }

        }
    })

})