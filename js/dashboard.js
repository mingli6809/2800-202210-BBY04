"use strict";

document.getElementById("username-text").innerHTML = localStorage.getItem("email");

function GET(url, callback) {

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            //console.log('responseText:' + xhr.responseText);
            callback(this.responseText);

        } else {
            console.log(this.status);
        }
    }
    xhr.open("GET", url);
    xhr.send();
}

GET("/admin-table", (response) =>{
    document.querySelector(".dash-function").innerHTML = response;
})

document.getElementById("allUsers").addEventListener("click", function(){
   window.location = "/adminUsers";
});