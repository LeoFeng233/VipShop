/**
 * 
 * @param {*} dom 
 * @param {*} attrObj 参数对象，将需要修改的属性以及参数值以"属性": "参数值"的形式放在对象中
 * @param {*} callback 
 */
export function animate(dom, attrObj, callback) {
    // 通过对象的形式传入多个参数
    // 通过循环的形式将参数取出来
    var current, target;
    for (var key in attrObj) {
        // 如果要改变的属性包含了 opacity属性，因为opacity属性的值为0-1，所以要对该属性的值作特殊处理
        // 为了保证准确度，将获取到的透明度参数*100，并转为整数
        if (key === "opacity") {
            current = parseInt(window.getComputedStyle(dom, null)[key] * 100);
            target = attrObj[key] * 100;
        } else if (key.indexOf("scroll") !== -1) {
            // 如果属性中包含了`scrollTop`和`scrollLeft`的属性，通过判断属性名中是否包含scroll
            // `scrollTop`和`scrollLeft`是dom对象自身的属性，所以不需要`getComputedStyle`方法
            current = dom[key];
            target = attrObj[key];
        } else {
            // 其他属性由于可能会带有单位，所以使用`parseInt`方法将属性值转为整型
            current = parseInt(window.getComputedStyle(dom, null)[key]);
            target = attrObj[key];
        }
        // 将获取到的属性再以一个对象的形式存储进对象中
        // 属性为该参数现在的实际值和目标值
        attrObj[key] = {
            'current': current,
            'target': target
        }
    }

    // 清除定时器
    clearInterval(dom.timer)
    // 将定时器绑定在dom对象上
    dom.timer = setInterval(function () {

        for (var attr in attrObj) {
            var current = attrObj[attr].current;
            var target = attrObj[attr].target;

            // 根据与目标的差值来计算速度
            var speed = (target - current) / 10;
            // 小数计算有误差，为了当距离很小的时候速度为0，所以对速度的绝对值进行取整
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            // 判断是否到达目的地，当目前的位置与终点小于当前速度的话，直接到到达终点
            if (Math.abs(target - current) <= Math.abs(speed)) {
                attrObj[attr].current = target;
                if (attr === 'opacity') {
                    dom.style[attr] = target / 100;
                } else if (attr.indexOf("scroll") !== -1) {
                    dom[attr] = target;
                } else {
                    dom.style[attr] = target + "px";
                }

                // 如果该属性完成，则将该属性从参数对象中删除
                delete attrObj[attr];
                // 如果参数对象中还有属性，就不删除定时器
                for (var key in attrObj) {
                    return;
                }

                clearInterval(dom.timer);

                callback === undefined ? "" : callback();
            } else {
                //
                attrObj[attr].current += speed;
                if (attr === 'opacity') {
                    dom.style[attr] = attrObj[attr].current / 100;
                } else if (attr.indexOf("scroll") !== -1) {
                    dom[attr] = attrObj[attr].current;
                } else {
                    dom.style[attr] = attrObj[attr].current + "px";
                }
            }
        }

    }, 20)
};