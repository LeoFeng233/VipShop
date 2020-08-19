import HandleCookies from "../util/handleCookies.js"

export default class RegisterCheck {
    constructor() {
        this.cacheElements();
    }

    cacheElements() {
        // 通过一个二进制数记录各个信息的正确情况
        this.registerStatus = 0b0000;

        this.handleCookies = HandleCookies.factory();

        this.mobileInput = document.querySelector("#mobilePhoneInput");
        this.mobileInputItem = document.querySelector(".mobile-phone-item");
        this.mobileInputTip = document.querySelector(".mobile-phone-item .input-tip span");

        this.passwordInputItem = document.querySelector(".password-input-item");
        this.passwordInputTip = document.querySelector(".password-input-item .input-tip span");
        this.passwordInput = document.querySelector("#passwordInput");

        this.passwordAgainItem = document.querySelector(".password-again-item");
        this.passwordAgainTip = document.querySelector(".password-again-item .input-tip span");
        this.passwordAgainInput = document.querySelector("#passwordAgain");

        this.agreeCheckItem = document.querySelector(".agree-check-item");
        this.agreeCheckTip = document.querySelector(".agree-check-item .input-tip span");
        this.agreeCheckInput = document.querySelector("#mobileAgress");

        this.formSubmitButton = document.querySelector("#regFormSubmit");
        this.bindEvent();
    }

    bindEvent() {
        let firstphoneInputFocus = true;
        this.mobileInput.addEventListener("focus", () => {
            this.mobileInputItem.classList.remove("form-item-warning");
            this.mobileInputItem.classList.remove("form-item-success");
            this.mobileInputTip.innerText = "";
            if (firstphoneInputFocus) {
                this.mobileInputTip.innerText = "请输入您的11位手机号码";
                firstphoneInputFocus = false;
            }
        });

        this.mobileInput.addEventListener("blur", () => {
            this.mobileInputTip.innerText = "";
            let phoneNum = this.mobileInput.value;

            if (/^\d{11}$/.test(phoneNum) && !localStorage.getItem(phoneNum)) {

                this.mobileInputItem.classList.add("form-item-success");
                this.registerStatus |= 0b0001;
            } else {
                if (!phoneNum && phoneNum === "") {
                    this.mobileInputTip.innerText = "手机号不能为空";
                } else if (!/^\d{11}$/.test(phoneNum)) {
                    this.mobileInputTip.innerText = "请输入正确的手机号";
                } else if (localStorage.getItem(phoneNum)) {
                    this.mobileInputTip.innerText = "该手机号已注册";
                }
                // 给输入框加入警告信息
                this.mobileInputItem.classList.add("form-item-warning");

                this.registerStatus &= 0b1110;
            }

        });

        let firstPasswdFocus = true;
        this.passwordInput.addEventListener("focus", () => {
            this.passwordInputItem.classList.remove("form-item-warning");
            this.passwordInputItem.classList.remove("form-item-success");
            this.passwordInputTip.innerText = "";
            if (firstPasswdFocus) {
                this.passwordInputTip.innerText = "请输入密码";
                firstPasswdFocus = false;
            }
        });

        this.passwordInput.addEventListener("blur", () => {
            this.passwordInputTip.innerText = "";
            let passwd = this.passwordInput.value;
            if (passwd.length >= 8 && passwd.length <= 20) {
                this.passwordInputItem.classList.add("form-item-success");
                this.registerStatus |= 0b0010;
            } else {
                if (!passwd && passwd === "") {
                    this.passwordInputTip.innerText = "密码不能为空";
                } else {
                    this.passwordInputTip.innerText = "密码格式错误，请重新输入";
                }

                this.passwordInputItem.classList.add("form-item-warning");
                this.registerStatus &= 0b1101;
            }
        })

        this.passwordAgainInput.addEventListener("focus", () => {
            this.passwordAgainItem.classList.remove("form-item-success");
            this.passwordAgainItem.classList.remove("form-item-warning");
            this.passwordAgainTip.innerText = "";
        });

        this.passwordAgainInput.addEventListener("blur", () => {
            this.passwordAgainTip.innerText = "";
            let passwd = this.passwordInput.value;
            let passwdAgain = this.passwordAgainInput.value;

            if (passwdAgain !== "" && passwd === passwdAgain) {
                this.passwordAgainItem.classList.add("form-item-success");
                this.registerStatus |= 0b0100;
            } else {
                if (!passwdAgain && passwdAgain === "") {
                    this.passwordAgainTip.innerText = "请再次输入密码";
                } else if (passwd !== passwdAgain) {
                    this.passwordAgainTip.innerText = "两次输入的密码不一致，请重试";
                }
                this.passwordAgainItem.classList.add("form-item-warning");
                this.registerStatus &= 0b1011;
            }


        });

        this.agreeCheckInput.addEventListener("click", () => {
            if (this.agreeCheckInput.checked) {
                this.agreeCheckTip.innerText = "";
                this.registerStatus |= 0b1000;
            } else {
                this.agreeCheckTip.innerText = "接受服务条款才能注册";
                this.registerStatus &= 0b0111;
            }
        });

        this.formSubmitButton.addEventListener("click", () => {
            if (this.registerStatus !== 15) {
                return false;
            }

            localStorage.setItem(this.mobileInput.value, this.passwordInput.value);
            alert("注册成功");

            this.handleCookies.setCookie({
                key: "username",
                val: this.mobileInput.value,
                days: 7
            });

            window.location.href = "../../pages/header.html";

        })
    }

    static factory() {
        return new RegisterCheck();
    }
}

RegisterCheck.factory();