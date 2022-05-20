"use strict";

function GET(url, callback) {

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
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
    console.log(response);
    for (let i = 0; i < response.length; i++) {
        let div = document.createElement("div");
        div.setAttribute("class", "userCards");
        let p1 = document.createElement("p");
        p1.setAttribute("class", "card-text");
        p1.innerHTML = "Email: " + response[i].email;
        let p2 = document.createElement("p");
        p2.setAttribute("class", "card-text");
        p2.innerHTML = "Password: " + response[i].password;

        // edit button
        let input = document.createElement("input");
        input.setAttribute("type", "submit");
        input.setAttribute("value", "Edit");
        input.setAttribute("class", "btn");
        input.setAttribute("id", "editUser");
        input.addEventListener("click", function () {
            let editProfile = document.createElement("div");
            let p = document.createElement("p");
            p.setAttribute("class", "error");
            let emailInput = document.createElement("input");
            emailInput.setAttribute("type", "email");
            emailInput.setAttribute("placeholder", "Email");
            emailInput.setAttribute("id", "email");
            
            let passInput = document.createElement("input");
            passInput.setAttribute("type","Password");
            passInput.setAttribute("placeholder", "Password");
            passInput.setAttribute("id", "pass");

            let submit = document.createElement("input");
            submit.setAttribute("type", "submit");
            submit.setAttribute("value", "Submit");
            submit.setAttribute("id", "submit");


            submit.addEventListener("click", function (e) {
                e.preventDefault();

                if (emailInput.value == "" | passInput.value == "") {
                    let errormsg = document.createElement("p");
                    errormsg.setAttribute("id", "error");
                    let message = document.createTextNode("You have left an input blank. Please try again.");
                    errormsg.appendChild(message);
                    editProfile.appendChild(errormsg);

                    document.getElementById("email").style.width = "80%";
                    document.getElementById("email").style.display = "initial";
                    document.getElementById("pass").style.width = "80%";
                    document.getElementById("pass").style.display = "initial";
                    document.getElementById("submit").style.width = "20%";
                    document.getElementById("submit").style.height = "20%";
                    document.getElementById("back").style.width = "20%";
                    document.getElementById("back").style.height = "20%";

                } else {
                    let queryString = "ID=" + response[i].ID + "&email=" + emailInput.value + "&password=" + passInput.value;
                    POST("/updateUser", function (data) {
                    if (data) {
                        let dataParsed = JSON.parse(data);
                        if (dataParsed.status == "fail") {
                            let errormsg = document.createElement("p");
                            errormsg.setAttribute("id", "error");
                            let message = document.createTextNode("Something went wrong, try again");
                            errormsg.appendChild(message);
                            editProfile.appendChild(errormsg);
                        } else {
                            location.reload();
                        }
                    }
                    }, queryString);
                }
            });
       
            
            let back = document.createElement("input");
            back.setAttribute("type", "submit");
            back.setAttribute("value", "Back");
            back.setAttribute("id", "back");
            back.addEventListener("click", function(){
                location.reload();
            })
            
            editProfile.appendChild(emailInput);
            editProfile.appendChild(passInput);
            editProfile.appendChild(submit);
            editProfile.appendChild(back);
            editProfile.appendChild(p);
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
                            
                            div2.setAttribute("class", "error");
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
