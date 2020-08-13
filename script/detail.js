$(function(){
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
})