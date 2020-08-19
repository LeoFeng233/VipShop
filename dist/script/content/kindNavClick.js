import {
    getElOffsetTop
} from "../util/getElScrollTop.js"

export default class KindNavClick {
    constructor() {
        this.cacheElements();
    }

    cacheElements() {
        this.navLinkBox = document.querySelector(".kind-nav");
        this.navLinkList = document.querySelectorAll(".kind-nav-item");
        this.goodsElList = document.querySelectorAll(".sp-sale-content-li");
        this.goodsNav = document.querySelector(".goods-nav");
        this.goodsNavHeight = this.goodsNav.clientHeight + this.goodsNav.clientTop;
        this.scrollTopList = this.getAllElScrollTop(this.goodsElList);
        this.bindEvent();
    }

    bindEvent() {

        console.log(this.navLinkBox);
        this.navLinkBox.addEventListener("click", (event) => {
            event.preventDefault();

            let clickNavIndex = 0
            console.log(event.target);
            for (let i = 0; i < this.navLinkList.length; i++) {
                if (this.navLinkList[i] === event.target) {
                    clickNavIndex = i;
                    break;
                }
            }

            console.log(this.scrollTopList[clickNavIndex]);
            document.documentElement.scrollTop = this.scrollTopList[clickNavIndex];
        })
    }

    getAllElScrollTop(domList) {
        let result = [];

        for (let i = 0; i < domList.length; i++) {
            result.push(getElOffsetTop(domList[i]) - 63 - this.goodsNavHeight);
        }

        return result;
    }

    static factory() {
        return new KindNavClick();
    }
}

KindNavClick.factory();