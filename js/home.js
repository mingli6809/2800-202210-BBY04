let hamburgerMenu = document.getElementById("hamburgerMenu");
let menu = document.getElementById("menu");


function displayMenu() {
    console.log("Displaying");
    menu.style.display = "grid";
    hamburgerMenu.style.display = "none";
}

function hideMenu() {
    console.log("Hiding");
menu.style.display = "none";
hamburgerMenu.style.display = "flex";

}
