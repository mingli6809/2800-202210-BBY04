function ajaxPOST(url, callback, data) {
    let params = typeof data == 'string' ? data : Object.keys(data).map(
        function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        }
    ).join('&');
    console.log("params in ajaxPOST", params);
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

document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault();
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let queryString = "email=" + email.value + "&password=" + password.value;
    ajaxPOST("/login", function (data) {
        if (data) {
            let dataParsed = JSON.parse(data);
            console.log(dataParsed);
            if (dataParsed.status == "fail") {
                document.getElementById("failedLogin").style.display = "block";
                document.getElementById("errorMsg").innerHTML = dataParsed.msg;
                
            } else {
                localStorage.setItem("email", email.value);
                window.location.replace("/profile");
            }
        }

    }, queryString);
});