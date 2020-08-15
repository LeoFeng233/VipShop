    var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal', // 水平切换选项
        loop: true, // 循环模式选项

        effect: 'fade',
        fade: {
            crossFade: true
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },

        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }

    })