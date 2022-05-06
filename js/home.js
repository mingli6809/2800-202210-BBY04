let hamburgerMenu = document.getElementById("hamburgerMenu");
let menu = document.getElementById("menu");

// document.getElementById("nav5").addEventListener("click", function (e) {
//     e.preventDefault();
//     window.location.replace("/login_landing");

// });

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
document.getElementById("username-text").innerHTML=localStorage.getItem("email");;

