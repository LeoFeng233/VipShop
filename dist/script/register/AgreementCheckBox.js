class AgreementCheckbox {
    constructor() {
        this.cacheElements();
    }

    cacheElements() {
        this.agreeCheckbox = document.querySelector("#mobileAgress");
    }

    static factory() {
        return new AgreementCheckbox();
    }
}