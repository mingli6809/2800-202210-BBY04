"use strict";

document.getElementById("login").addEventListener("click", function (e) {
    e.preventDefault();
    window.location = "/login_landing" ;

});
document.getElementById("create-user").addEventListener("click", function (e) {
    e.preventDefault();
    window.location = "/createuser" ;

});

