"use strict";

document.getElementById("login").addEventListener("click", function (e) {
    e.preventDefault();
    window.location = "/login_landing";

});
document.getElementById("create-user").addEventListener("click", function (e) {
    e.preventDefault();
    window.location = "/signup";

});

window.addEventListener("load", function () {
    document.querySelector(".profilePage").style.display = "none";
    document.querySelector(".logout").style.display = "none";
    this.document.querySelector(".nav-menu").style.display = "none";
    this.document.querySelector(".hamburger").style.display = "none";
})