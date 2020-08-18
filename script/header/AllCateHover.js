export default class AllCateHover {
    constructor() {
        this.cacheElements();
    }

    cacheElements() {
        this.hoverBox = document.querySelector(".goods-nav .header-inner");
        this.mainCategory = document.querySelector(".main-category");
        this.allCateListBox = document.querySelector(".nav-cate-down");
        this.bindEvent();
    }

    bindEvent() {

        this.mainCategory.addEventListener("mouseenter", (eOver) => {
            this.hoverBox.classList.add("nav-cate-hover");
        });

        this.mainCategory.addEventListener("mouseleave", (eOver) => {
            this.hoverBox.classList.remove("nav-cate-hover");
        })

        this.allCateListBox.addEventListener("mouseenter", (eOver) => {
            this.hoverBox.classList.add("nav-cate-hover");
            this.hoverBox.classList.add("cate-panel-hover");
        })
        this.allCateListBox.addEventListener("mouseleave", (eOver) => {
            this.hoverBox.classList.remove("nav-cate-hover");
            this.hoverBox.classList.remove("cate-panel-hover");
        })


    }

    static factory() {
        return new AllCateHover();
    }
}