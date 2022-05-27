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


GET("/allevents", (response) => {
    response = JSON.parse(response);
    for (let i = 0; i < response.length; i++) {
        let eventid = response[i].ID;
        let div = document.createElement("div");
        div.setAttribute("class", "userCards");
        let name = response[i].ImagePath;
        let img = document.createElement("img");
        img.setAttribute("class", "avatar1");
        img.setAttribute("src", name);
        let img2 = document.createElement("img");
        img2.setAttribute("class", "avatar1");
        img2.setAttribute("src", name);
        let p1 = document.createElement("p");
        p1.setAttribute("class", "card-text");
        p1.innerHTML = "Event Name: " + response[i].EventName;
        let input_D = document.createElement("input");
        input_D.setAttribute("type", "submit");
        input_D.setAttribute("value", "Content");
        input_D.setAttribute("class", "btn");
        input_D.setAttribute("id", "editUser");
        input_D.addEventListener("click", function (e) {
            e.preventDefault();
            let editProfile = document.createElement("div");
            let input4 = document.createElement("input");
            input4.setAttribute("type", "submit");
            input4.setAttribute("value", "SHOW");
            input4.setAttribute("class", "btn");
            input4.setAttribute("id", "delUser");
            input4.addEventListener("click", function (e) {
                let editProfile = document.createElement("div");
                e.preventDefault();
                let p2 = document.createElement("p");
                p2.setAttribute("class", "card-text");
                p2.innerHTML = "<h2>Description:</h2> " + localStorage.getItem("description");
                let p9 = document.createElement("h2");
                p9.setAttribute("class", "card-text1");
                p9.innerHTML = "<h3>Event Name:</h3> " + response[i].EventName;
                let Datestart = document.createElement("p");
                Datestart.setAttribute("class", "card-text1");
                Datestart.innerHTML = "<h3>Start Date::</h3> " + response[i].StartDate;
                let Enddate = document.createElement("p");
                Enddate.setAttribute("class", "card-text1");
                Enddate.innerHTML = "<h3>End Date::</h3> " + response[i].EndDate;
                let back1 = document.createElement("input");
                back1.setAttribute("type", "submit");
                back1.setAttribute("value", "Back");
                back1.setAttribute("id", "back4");
                back1.addEventListener("click", function () {
                    location.reload();
                })
                let p8 = document.createElement("br");
                let p7 = document.createElement("br");
                let p6 = document.createElement("br");
                let img4 = document.createElement("img");
                img4.setAttribute("class", "avatar4");
                img4.setAttribute("src", name);
                editProfile.appendChild(img4);
                editProfile.appendChild(p9);
                editProfile.appendChild(p7);
                editProfile.appendChild(p2);
                editProfile.appendChild(p8);
                editProfile.appendChild(Datestart);
                editProfile.appendChild(p7);
                editProfile.appendChild(Enddate);
                editProfile.appendChild(p6);
                editProfile.appendChild(back1);
                let s = document.querySelector(".displayUsers");
                s.setAttribute("style", "display:flex;flex-direction:column;align-items:center");
                s.innerHTML = "";
                document.querySelector(".displayUsers").appendChild(editProfile);
            })
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
            let p6 = document.createElement("br");
            editProfile.appendChild(img);
            editProfile.appendChild(p1);
            editProfile.appendChild(p6);
            editProfile.appendChild(input4);
            div.innerHTML = "";
            div.appendChild(editProfile);
        });
        let input = document.createElement("input");
        input.setAttribute("type", "submit");
        input.setAttribute("value", "Vote");
        input.setAttribute("class", "btn");
        input.setAttribute("id", "editUser1");
        input.addEventListener("click", function (e) {
            e.preventDefault();
            GET("/EVENTRESULT?eventid=" + eventid, function (data) {
                if (data) {
                    let dataParsed = JSON.parse(data);
                    if (dataParsed.status == "fail") {
                        console.log("fail");
                    } else {
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
        input2.setAttribute("id", "delUser1");
        let div2 = document.createElement("div");
        input2.addEventListener("click", function (e) {
            e.preventDefault();
            let editProfile = document.createElement("div");
            let input3 = document.createElement("input");
            input3.setAttribute("type", "submit");
            input3.setAttribute("value", "SHOW");
            input3.setAttribute("class", "btn");
            input3.setAttribute("id", "delUser");
            input3.addEventListener("click", function (e) {
                let editProfile1 = document.createElement("div");
                e.preventDefault();
                let date = localStorage.getItem("DATE");
                let d = date.substring(0, 11);
                let date1 = new Date(d);
                let month = date1.getMonth() + 1;
                let day = date1.getDate();
                let current = new Date();
                let current_month = current.getMonth() + 1;
                let current_day = current.getDate();
                if (current_month >= month && current_day > day) {
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
                    let T = document.getElementById("im1");
                    T.setAttribute("style", "font-size: 0.7em ");
                    T.innerHTML = "<b>Thank you, your voice is being heard!</b>"
                    let back = document.createElement("input");
                    back.setAttribute("type", "submit");
                    back.setAttribute("value", "Back");
                    back.setAttribute("id", "back");
                    back.addEventListener("click", function () {
                        location.reload();
                    })
                    let p7 = document.createElement("br");
                    let p8 = document.createElement("br");
                    editProfile1.appendChild(img);
                    editProfile1.appendChild(p1);
                    editProfile1.appendChild(p8);
                    editProfile1.appendChild(p2);
                    editProfile1.appendChild(p3);
                    editProfile1.appendChild(p7);
                    editProfile1.appendChild(back);
                    div.innerHTML = "";
                    div.appendChild(editProfile1);
                } else {
                    let errormsg = document.createElement("p");
                    errormsg.setAttribute("id", "error");
                    let message = document.createTextNode("Please wait for event ending!");
                    errormsg.appendChild(message);
                    editProfile.appendChild(errormsg);
                    input3.addEventListener("click", function (e) {
                        location.reload();
                    })
                }
            })
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
            GET("/EVENTRESULT3?eventid=" + eventid, function (data) {
                if (data) {
                    localStorage.setItem("DATE", data);
                }
            });
            let p6 = document.createElement("br");
            editProfile.appendChild(img);
            editProfile.appendChild(p1);
            editProfile.appendChild(p6);
            editProfile.appendChild(input3);
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