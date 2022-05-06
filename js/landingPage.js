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

let loginButton = document.getElementById("loginbutton");
loginButton.addEventListener("click", function(){
    window.location = "/login.html";
})

let createButton = document.getElementById("createbutton");
createButton.addEventListener("click", function(){
    window.location = "/signup.html";
})

