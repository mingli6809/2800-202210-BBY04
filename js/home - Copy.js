"use strict";

document.getElementById("username-text").innerHTML = localStorage.getItem("email");
var userid = localStorage.getItem("userid");



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

GET("/allEvents", (response) => {
    response = JSON.parse(response);
    for (let i = 0; i < response.length; i++) {
        let div = document.createElement("div");
        div.setAttribute("class", "userCards");
        let img = document.createElement("img");
        img.setAttribute("class", "avatar1");
        img.setAttribute("src", "img/vote1.png");

        let img2 = document.createElement("img");
        img2.setAttribute("class", "avatar1");
        img2.setAttribute("src", "img/vote2.png");
        let p1 = document.createElement("p");
        p1.setAttribute("class", "card-text");
        p1.innerHTML = "Event Name: " + response[i].EventName;
        let eventid = response[i].ID;

        let input_D = document.createElement("input");
        input_D.setAttribute("type", "submit");
        input_D.setAttribute("value", "Description");
        input_D.setAttribute("class", "btn");
        input_D.setAttribute("id", "editUser");
        input_D.addEventListener("click", function (e) {
            e.preventDefault();
            let editProfile = document.createElement("div");
            GET("/EVENTDES?eventid=" + eventid, function (data) {
                if (data) {
                    let dataParsed = JSON.parse(data);
                    if (dataParsed.status == "fail") {
                        console.log("fail");
                    } else {
                        localStorage.setItem("description", dataParsed[0].Description);

                    }
                }
            });

            let p2 = document.createElement("p");
            p2.setAttribute("class", "card-text");
            p2.innerHTML = "Description: " + localStorage.getItem("description");
            let back1 = document.createElement("input");
            back1.setAttribute("type", "submit");
            back1.setAttribute("value", "Back");
            back1.setAttribute("id", "back1");
            back1.addEventListener("click", function () {
                location.reload();
            })
            editProfile.appendChild(p1);
            editProfile.appendChild(p2);
            editProfile.appendChild(back1);
            div.innerHTML = "";
            div.appendChild(editProfile);
        });


        let input = document.createElement("input");
        input.setAttribute("type", "submit");
        input.setAttribute("value", "Vote");
        input.setAttribute("class", "btn");
        input.setAttribute("id", "editUser");
        input.addEventListener("click", function (e) {
            e.preventDefault();
            GET("/EVENTRESULT?eventid=" + eventid, function (data) {
                if (data) {
                    let dataParsed = JSON.parse(data);
                    if (dataParsed.status == "fail") {
                        console.log("fail");
                    } else {
                        console.log(dataParsed)
                        if (dataParsed[0] != null)
                            localStorage.setItem("result1", dataParsed[0].Result);
                        else
                            localStorage.setItem("result1", 3);
                    }
                }
            });
            let editProfile = document.createElement("div");
            let submit = document.createElement("input");
            submit.setAttribute("type", "submit");
            submit.setAttribute("value", "Agree");
            submit.setAttribute("id", "submit");
            submit.addEventListener("click", function (e) {
                e.preventDefault();
                let result1 = localStorage.getItem("result1");
                if (result1 != 3) {
                    let errormsg = document.createElement("p");
                    errormsg.setAttribute("id", "error");
                    let message = document.createTextNode("You have voted for this event.");
                    errormsg.appendChild(message);
                    editProfile.appendChild(errormsg);

                } else {
                    GET("/updatevent?eventid=" + eventid, function (data) {
                        if (data) {
                            let dataParsed = JSON.parse(data);
                            if (dataParsed.status == "fail") {
                                console.log("fail");
                            } else {
                                console.log(dataParsed)
                                location.reload();
                            }
                        }
                    });
                }
            });

            let submit1 = document.createElement("input");
            submit1.setAttribute("type", "submit");
            submit1.setAttribute("value", "Disagree");
            submit1.setAttribute("id", "submit1");
            submit1.addEventListener("click", function (e) {
                e.preventDefault();
                let result1 = localStorage.getItem("result1");
                if (result1 != 3) {
                    let errormsg = document.createElement("p");
                    errormsg.setAttribute("id", "error");
                    let message = document.createTextNode("You have voted for this event.");
                    errormsg.appendChild(message);
                    editProfile.appendChild(errormsg);
                } else {
                    GET("/updatevent1?eventid=" + eventid, function (data) {
                        if (data) {
                            let dataParsed = JSON.parse(data);
                            if (dataParsed.status == "fail") {
                                console.log("fail");
                            } else {
                                console.log(dataParsed)
                                location.reload();
                            }
                        }
                    });
                }
            });


            let back = document.createElement("input");
            back.setAttribute("type", "submit");
            back.setAttribute("value", "Back");
            back.setAttribute("id", "back");
            back.addEventListener("click", function () {
                location.reload();
            })
            editProfile.appendChild(img2);
            editProfile.appendChild(p1);
            editProfile.appendChild(input_D);
            editProfile.appendChild(back);
            editProfile.appendChild(submit1);
            editProfile.appendChild(submit);
            div.innerHTML = "";
            div.appendChild(editProfile);
        });


        let input2 = document.createElement("input");
        input2.setAttribute("type", "submit");
        input2.setAttribute("value", "Result");
        input2.setAttribute("class", "btn");
        input2.setAttribute("id", "delUser");
        let div2 = document.createElement("div");
        input2.addEventListener("click", function (e) {
            e.preventDefault();
            let editProfile = document.createElement("div");
            GET("/EVENTRESULT1?eventid=" + eventid, function (data) {
                if (data) {
                    localStorage.setItem("FENMU", data);
                }
            });

            GET("/EVENTRESULT2?eventid=" + eventid, function (data) {
                if (data) {
                    localStorage.setItem("FENZI", data);
                }
            });
            let FZ = parseFloat(localStorage.getItem("FENZI"));
            let FM = parseFloat(localStorage.getItem("FENMU"));


            let Ratio = FZ / FM * 10000;
            let R1 = parseInt(Ratio) / 100;
            let R2 = 100 - R1;
            let p2 = document.createElement("p");
            p2.setAttribute("class", "card-text");
            p2.innerHTML = "Support Ratio: " + R1 + "%";

            let p3 = document.createElement("p");
            p3.setAttribute("class", "card-text");
            p3.innerHTML = "Against Ratio: " + R2 + "%";


            let back = document.createElement("input");
            back.setAttribute("type", "submit");
            back.setAttribute("value", "Back");
            back.setAttribute("id", "back");
            back.addEventListener("click", function () {
                location.reload();
            })
            editProfile.appendChild(img);
            editProfile.appendChild(p1);
            editProfile.appendChild(p2);
            editProfile.appendChild(p3);
            editProfile.appendChild(back);
            div.innerHTML = "";
            div.appendChild(editProfile);


        });
        div.appendChild(img);
        div.appendChild(p1);
        div.appendChild(input);
        div.appendChild(input2);
        document.querySelector(".displayUsers").appendChild(div);
    }
})