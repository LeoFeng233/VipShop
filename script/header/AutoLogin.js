import HandleCookies from "../util/handleCookies.js"

let handleCookies = HandleCookies.factory();
let loginBox = document.querySelector(".login-box");
let exitLogin = document.querySelector(".exit-login");
let usernameList = document.querySelectorAll(".user-name");

window.addEventListener("load", () => {
    let username = handleCookies.getCookie("username");
    // cookies中username为空

    if (!username) {
        return;
    }

    loginBox.classList.add("logined");
    for (let i = 0; i < usernameList.length; i++) {
        usernameList[i].innerText = username.substr(0, 3) + "*******" + username.substr(username.length - 1);
    }

});

exitLogin.addEventListener("click", () => {
    handleCookies.removeCookie("username");
    location.reload();
})