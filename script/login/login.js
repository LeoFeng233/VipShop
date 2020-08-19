import HandleCookies from "../util/handleCookies.js"

export class Login {
    constructor() {
        this.cacheElements();
    }

    cacheElements() {
        this.accout = document.querySelector("#username");
        this.password = document.querySelector("#password");
        this.loginButton = document.querySelector(".login_click");
        this.handleCookies = HandleCookies.factory();

        this.bindEvent();
    }

    bindEvent() {
        this.loginButton.addEventListener("click", () => {
            let passwdValue = localStorage.getItem(this.accout.value);

            console.log(passwdValue);
            if (passwdValue !== this.password.value) {
                return false;
            }

            this.handleCookies.setCookie({
                key: "username",
                val: this.accout.value,
                days: 7
            });

            window.location.href = "../../pages/header.html";
        });
    }

    static factory() {
        return new Login();
    }
}

Login.factory();