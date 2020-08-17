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
                <div>
                    <img src="${item.imgUrl}" alt="">
                    <h5><span>快抢价</span><em>${item.currentPrice}</em><b>${item.sourcePrice}</b><strong>${item.zhe}</strong></h5>
                    <p>${item.description}</p>
                </div>
                `;
            })
            $('.goods_container').append(goods_str);
        }
    })
    // 点击页码
    $('.page_number span').click(function(){       
        $(this).addClass('page_color').siblings().removeClass('page_color');
    })

})