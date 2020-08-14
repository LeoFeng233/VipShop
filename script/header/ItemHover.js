export default class ItemHover {
    constructor(options) {
        this.cacheElements(options);
    }

    cacheElements(options) {
        this.hoverBox = document.querySelector(options.hoverBox);
        this.bindEvent();
    }

    bindEvent() {
        this.hoverBox.addEventListener("mouseenter", () => {
            this.hoverBox.classList.add("hover");
        })

        this.hoverBox.addEventListener("mouseleave", () => {
            this.hoverBox.classList.remove("hover");
        })
    }

    static factory(options) {
        return new ItemHover(options);
    }
}