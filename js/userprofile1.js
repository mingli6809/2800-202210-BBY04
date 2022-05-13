"use strict";


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

const upLoadForm = document.getElementById("upload-images-form");
upLoadForm.addEventListener("submit", uploadImages);
console.log("icon page");

function uploadImages(e) {
    e.preventDefault();

    const imageUpload = document.querySelector('#image-upload');
    const formData = new FormData();

    for (let i = 0; i < imageUpload.files.length; i++) {
        formData.append("files", imageUpload.files[i]);
    }

    const options = {
        method: 'POST',
        body: formData,
    };

    fetch("/upload-images", options).then(function (res) {
        console.log(res);

    }).catch(function (err) {
        ("Error:", err)
    });

    window.location.replace("/profile");
}