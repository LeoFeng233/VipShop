export default class HandleCookies {
    constructor() {}

    setCookie(options) {
        if (!options.key || !options.val) {
            throw new Error('设置失败，缺少必要参数！');
        }
        options.days = options.days || 0;
        options.domain = options.domain || '';
        options.path = options.path || '';
        if (options.days === 0) {
            document.cookie = options.key + '=' + escape(options.val) + '; domain=' + options.domain + '; path=' + options.path;
        } else {
            var d = new Date();
            d.setDate(d.getDate() + options.days);
            document.cookie = options.key + '=' + escape(options.val) + '; domain=' + options.domain + '; path=' + options.path + '; expires=' + d;
        }
    }

    getCookie(key) {
        var arr1 = document.cookie.split('; ');
        for (var i = 0, len = arr1.length; i < len; i++) {
            var arr2 = arr1[i].split('=');
            if (arr2[0] === key) {
                return unescape(arr2[1]);
            }
        }
        return null;
    }

    removeCookie(key) {
        this.setCookie({
            key: key,
            val: '1234',
            days: -5
        });
    }

    static factory() {
        return new HandleCookies();
    }

}