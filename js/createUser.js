"use strict";

function POST(url, callback, data) {
    let params = typeof data == 'string' ? data : Object.keys(data).map(
        function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        }
    ).join('&');
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            callback(this.responseText);

        } else {
            console.log(this.status);
        }
    }
    xhr.open("POST", url);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
}

let submit = document.getElementById("submit");
submit.addEventListener("click", function (e) {
    e.preventDefault();
    let emailInput = document.getElementById("email");
    let passInput = document.getElementById("password");
    let code = document.getElementById("code");
    
    let queryString = "email=" + emailInput.value + "&password=" + passInput.value + "&code=" + code.value;
    POST("/add-user", function (data) {
        if (data) {
            let dataParsed = JSON.parse(data);
            let error = document.getElementById("error");
            
            error.innerHTML = dataParsed.msg;
            if (dataParsed.status == "fail") {
                error.style.color = "red";

            } else {
                error.style.color = "green";
            }
            setInterval(function(){
                error.style.display = "none";
                window.location.reload();
            }, 2000)

        }

    }, queryString);
});