"use strict";


document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault();

    let formData = {
     
        password: document.getElementById("password").value,
        email: document.getElementById("email").value,
        code: document.getElementById("code").value,
    };

    document.getElementById("password").value = "";
    document.getElementById("email").value = "";
    document.getElementById("code").value = "";

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            let queryString = "email=" + formData.email + "&password=" + formData.password;
            if (xhr.status === 200) {
                ajaxPOST("/login", function (data) {
                    if (data) {
                        let dataParsed = JSON.parse(data);
                        if (dataParsed.status == "fail") {
                            document.getElementById("errorMsg").innerHTML = dataParsed
                                .msg;
                        } else {
                            localStorage.setItem("email", formData.email);
                            window.location.replace("/profile");
                        }
                    }

                }, queryString);

            } else {
                console.log(this.status);
            }
        } else {
            console.log("ERROR", this.status);
        }
    }
    xhr.open("POST", "/add-customer");
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send( "email=" + formData.email +"&password=" +formData.password + 
         "&code=" + formData.code);
})

function ajaxPOST(url, callback, data) {
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