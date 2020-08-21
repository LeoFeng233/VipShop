export class LoadCateList {
    constructor() {
        this.cacheElements();
    }

    cacheElements() {
        this.cateLinkBox = document.querySelector(".nav-cate-down");
        this.cateLinkList = document.querySelectorAll(".nav-cate-down li");
        this.lastLi = null;

        this.cateListContainer = document.querySelector(".cate-content");
        this.bindEvent();
    }

    bindEvent() {

        for (let i = 0; i < this.cateLinkList.length; i++) {
            this.cateLinkList[i].addEventListener("mouseenter", (e) => {
                if (this.lastLi === e.target) {
                    return false;
                }

                if (this.lastLi) {
                    this.lastLi.classList.remove("item-active");
                }
                this.lastLi = e.target;
                e.target.classList.add("item-active");

                this.getCateData(e.target.getAttribute("data-name")).then(resolve => {
                    this.cateListContainer.innerHTML = this.initCateList(JSON.parse(resolve));
                })
            });

            // this.cateLinkList[i].addEventListener("mouseleave", (e) => {
            //     console.log(e.target.getAttribute("data-name") + "outttttttt");
            // })
        }
    }

    initCateList(obj) {
        let newDom = '';
        for (const key in obj) {
            let tempDom = '';
            const list = obj[key];
            list.forEach(element => {
                tempDom += `<a href="../../pages/goods_llist.html">${element}</a> `;
            });

            newDom += `<dl>
                    <dt>${key}</dt>
                    <dd>${tempDom}</dd>
                </dl>`
        }

        return newDom;
    }

    getCateData(dataName) {
        let xhr = new XMLHttpRequest();

        xhr.open('get', "../../data/cateListData/" + dataName + ".json", true);
        xhr.send(null);

        return new Promise((resolve, reject) => {

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(xhr.responseText);
                    }
                }
            }
        })
    }

    static factory() {
        return new LoadCateList();
    }

}

LoadCateList.factory();