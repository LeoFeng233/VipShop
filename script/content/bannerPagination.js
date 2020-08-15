// import Swiper from "swiper"
import {
    animate
} from "../../lib/js/animate.js"

export default class BannerPagination {
    constructor() {
        this.cacheElements();
    }

    cacheElements() {
        this.myswiper = new Swiper(".swiper-container");
        this.pgList = document.querySelectorAll(".banner-pagination li");
        this.selectedUnderLine = document.querySelector(".selected-underline");
        this.hidePgElementlist = document.querySelectorAll(".swiper-pagination-bullet");
        this.activeIndex = 0;

        // 绑定点击上张图和下张图的点击事件
        this.bindSwiperClickEvent();

        this.bindPaginationEvent();
        this.swiperAutoPlay();
    }

    swiperAutoPlay() {
        this.myswiper.timer = setInterval(() => {
            let elementWidth = this.pgList[0].clientWidth;
            let initialToLeft = this.pgList[0].offsetLeft;
            let index = this.activeIndex + 1;
            if (index >= this.pgList.length) {
                index = 0;
            }
            animate(this.selectedUnderLine, {
                left: initialToLeft + index * elementWidth
            });

            this.hidePgElementlist[index].click();
            this.activeIndex = index;
        }, 4000);
    }

    bindSwiperClickEvent() {
        this.myswiper.on("click", (swiper, events) => {

            if (this.myswiper.timer) {
                clearInterval(this.myswiper.timer);
            }

            //阻止事件传播
            if (events.stopPropagation) {
                events.stopPropagation();
            }
            let index;
            if (events.target.classList.contains("swiper-button-next")) {
                index = this.activeIndex + 1;
                if (index >= this.pgList.length) {
                    index = 0;
                }
            } else if (events.target.classList.contains("swiper-button-prev")) {
                index = this.activeIndex - 1;
                if (index < 0) {
                    index = this.pgList.length - 1;
                }
            } else {
                return false;
            }
            this.pgList[index].dispatchEvent(new Event("mouseenter"));

            // this.swiperAutoPlay();
        })
    }

    bindPaginationEvent() {


        this.pgList.forEach((element, index) => {
            element.addEventListener("mouseenter", () => {
                let elementWidth = this.pgList[0].clientWidth;
                let initialToLeft = this.pgList[0].offsetLeft;
                if (this.myswiper.timer) {
                    clearInterval(this.myswiper.timer);
                }

                animate(this.selectedUnderLine, {
                    left: initialToLeft + index * elementWidth
                });

                this.hidePgElementlist[index].click();
                this.activeIndex = index;

                this.swiperAutoPlay();
            })
        })
    }

    static factory() {
        return new BannerPagination();
    }
}

BannerPagination.factory();