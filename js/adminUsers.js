"use strict";

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

GET("/allUsers", (response) => {
    response = JSON.parse(response);
    for (let i = 0; i < response.length; i++) {
        let div = document.createElement("div");
        div.setAttribute("class", "userCards");
        let p1 = document.createElement("p");
        p1.innerHTML = "Email: " + response[i].email;
        let p2 = document.createElement("p");
        p2.innerHTML = "Password: " + response[i].password;

        // edit button
        let input = document.createElement("input");
        input.setAttribute("type", "submit");
        input.setAttribute("value", "edit");
        input.setAttribute("class", "btn");
        input.setAttribute("id", "editUser");
        input.addEventListener("click", function () {
            let editProfile = document.createElement("div");
            let emailInput = document.createElement("input");
            emailInput.setAttribute("type", "email");
            emailInput.setAttribute("placeholder", "email");
            emailInput.setAttribute("id", "email");
            
            let passInput = document.createElement("input");
            passInput.setAttribute("type","Password");
            passInput.setAttribute("placeholder", "Password");
            emailInput.setAttribute("id", "pass");

            let submit = document.createElement("input");
            submit.setAttribute("type", "submit");
            submit.setAttribute("value", "Submit");

            submit.addEventListener("click", function (e) {
                e.preventDefault();
                
                let queryString = "ID=" + response[i].ID + "&email=" + emailInput.value + "&password=" + passInput.value;
                console.log(queryString)
                POST("/updateUser", function (data) {
                    if (data) {
                        let dataParsed = JSON.parse(data);
                        if (dataParsed.status == "fail") {
                            console.log(dataParsed.msg);

                        } else {
                            location.reload();
                        }
                    }

                }, queryString);
            });
       
            
            let back = document.createElement("input");
            back.setAttribute("type", "submit");
            back.setAttribute("value", "back");
            back.addEventListener("click", function(){
                location.reload();
            })
            
            editProfile.appendChild(emailInput);
            editProfile.appendChild(passInput);
            editProfile.appendChild(submit);
            editProfile.appendChild(back);
            div.innerHTML = "";
            div.appendChild(editProfile);
        });

        // delete button
        let input2 = document.createElement("input");
        input2.setAttribute("type", "submit");
        input2.setAttribute("value", "Delete");
        input2.setAttribute("class", "btn");
        input2.setAttribute("id", "delUser");
        let div2 = document.createElement("div");
        input2.addEventListener("click", function () {
            input2.addEventListener("click", function (e) {
                e.preventDefault();
                let queryString = "email=" + response[i].email;
                POST("/delUser", function (data) {
                    if (data) {
                        let dataParsed = JSON.parse(data);
                        
                        if (dataParsed.status == "fail") {
                            
                            div2.setAttribute("id", "error");
                            div2.innerHTML = dataParsed.msg;
                            
                            div.appendChild(div2);
                            setTimeout(function(){
                                div2.style.display = "none";
                            }, 5000)
                        } else {
                            localStorage.setItem(`email${response[i].ID}`, response[i].email);
                            location.reload();
                            div2.innerHTML = "";
                        }
                    }

                }, queryString);
            });
        })
        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(input);
        div.appendChild(input2);
        
        document.querySelector(".displayUsers").appendChild(div);
    }
})