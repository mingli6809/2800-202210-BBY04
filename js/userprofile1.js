"use strict";

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