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

        this.lastSelectedButton = null;
        this.bindEvent();
    }

    bindEvent() {

        console.log(this.navLinkBox);
        this.navLinkBox.addEventListener("click", (event) => {
            event.preventDefault();

            let clickNavIndex = 0
            for (let i = 0; i < this.navLinkList.length; i++) {
                if (this.navLinkList[i] === event.target) {
                    clickNavIndex = i;
                    break;
                }
            }

            document.documentElement.scrollTop = this.scrollTopList[clickNavIndex];
            this.selectNavButton(clickNavIndex);
        });


        window.addEventListener("scroll", () => {
            let selectedIndex = -1;
            this.scrollTopList.forEach((element, index, arr) => {
                let scrollTop = document.documentElement.scrollTop;

                if (scrollTop > element && (index === (arr.length - 1) || scrollTop < arr[index + 1])) {
                    selectedIndex = index;
                    return;
                }
            });
            if (selectedIndex >= 0) {
                this.selectNavButton(selectedIndex);
            }

        });


    }

    selectNavButton(index) {

        if (this.lastSelectedButton) {
            this.lastSelectedButton.classList.remove("selected");
        }

        this.lastSelectedButton = this.navLinkList[index];
        this.navLinkList[index].classList.add("selected");

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