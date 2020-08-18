$(function(){
    // ajax商品列表页数据渲染
    $.ajax({
        url: '../data/goods.json',
        method: 'get',
        dataType: 'json',
        success: function(json){
            var goods_str = '';
            json.forEach((item)=>{
                goods_str += `
                <a href="./detail.html?goods_id=${item.goods_id}">
                    <div>
                        <img src="${item.imgUrl}" alt="">
                        <h5><span>快抢价</span><em>${item.currentPrice}</em><b>${item.sourcePrice}</b><strong>${item.zhe}</strong></h5>
                        <p>${item.description}</p>
                    </div>
                </a>
                `;
            })
            $('.goods_container').append(goods_str);
        }
    })
    // 点击页码
    $('.page_number span').click(function(){       
        $(this).addClass('page_color').removeClass('back_color').siblings().removeClass('page_color');
    })
    $('.page_number span').mouseenter(function(){       
        if(!$(this).hasClass('page_color')){
            $(this).addClass('back_color');

        }
    })
    $('.page_number span').mouseleave(function(){       
        if(!$(this).hasClass('page_color')){
            $(this).removeClass('back_color');

        }
    })
    // 商品列表导航
    $('.goods_list_nav>div>p>em').click(function(){
        if($(this).parent().prev().find('span').height() === 50){
            $(this).text('收起 ^').parent().prev().find('span').height(126).css('overflow-y', 'scroll');
        }else{
            $(this).text('更多 v').parent().prev().find('span').height(50).css('overflow-y', 'hidden');
        }        
    })

    $('.goods_list_nav div:gt(3)').css('display', 'none');
    $('.click_open').click(function(){
        if($(this).text().includes('更多选项')){
            $(this).text('点击收起 ^');
            $('.goods_list_nav div:gt(3)').css('display', 'block');
        }else{
            $(this).text('更多选项 v');
            $('.goods_list_nav div:gt(3)').css('display', 'none');
        }
    })
})