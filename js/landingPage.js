"use strict";

let hamburgerMenu = document.getElementById("hamburgerMenu");
let menu = document.getElementById("menu");



function displayMenu() {
    
    menu.style.display = "grid";
    hamburgerMenu.style.display = "none";
}

function hideMenu() {
menu.style.display = "none";
hamburgerMenu.style.display = "flex";

}

document.getElementById("login").addEventListener("click", function (e) {
    e.preventDefault();
    window.location = "/login_landing" ;

});
document.getElementById("create-user").addEventListener("click", function (e) {
    e.preventDefault();
    window.location = "/createuser" ;

});

