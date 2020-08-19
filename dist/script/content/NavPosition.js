import {
    getElOffsetTop as getOffsetTopToHtml
} from "../util/getElScrollTop.js"

export default class NavPosition {
    constructor(options) {
        this.cacheElements(options);
    }

    cacheElements(options) {
        this.nav = document.querySelector(options.nav);
        this.navParent = document.querySelector(options.navParent);
        this.navToTop = getOffsetTopToHtml(this.nav);
        this.bindEvent();
    }

    bindEvent() {

        window.addEventListener("scroll", () => {
            let scrollTop = document.documentElement.scrollTop;
            if (scrollTop > this.navToTop) {
                this.navParent.classList.add("scroll-over-nav");
            } else {
                this.navParent.classList.remove("scroll-over-nav");
            }
        })
    }

    static factory(options) {
        return new NavPosition(options);
    }
}

NavPosition.factory({
    nav: ".kind-nav-box",
    navParent: ".sp-sale-content"
});

NavPosition.factory({
    nav: ".goods-nav",
    navParent: ".header"
});