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



console.log("hello");