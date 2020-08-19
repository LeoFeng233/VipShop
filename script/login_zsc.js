$(function(){
    // 登录显示更多&收起
    $('.method span').click(function(){
        if($(this).text().includes('更多')){
            $(this).text('收起 ^').parent().next().css('display', 'block');
        }else{
            $(this).text('更多 v').parent().next().css('display', 'none');
        }
    })
    // 光标进入二维码运动
    var timeout = null;
    $('.login_ma').mouseenter(function(){
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            $(this).find('div').stop(true).animate({'left': '30px'},function(){
                $('.login_ma h2').css('display', 'block').stop(true).animate({'opacity': 1});
            })
        }, 500);            
    })
    $('.login_ma').mouseleave(function(){
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            $(this).find('h2').stop(true).animate({'opacity': '0'},function(){
                $(this).css('display', 'none')
                $('.login_ma div').stop(true).animate({'left': '94px'});
            });
        }, 500);        
    })
    // 点击切换登录方式
    $('.login_nav div').click(function(){
        $(this).css('color', '#f10180').siblings().css('color', '#666');

        if($(this).text()==='账户登录'){
            $('.login_accout').css('display','block');
            $('.login_scan').css('display', 'none');
        }else{
            $('.login_accout').css('display','none');
            $('.login_scan').css('display', 'block');
        }
    })
})