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

let addEvent = document.querySelector(".addEvent");
addEvent.addEventListener("click", function () {
    document.getElementById("addingEvent").style.display = "flex";
    document.querySelector(".mainContent").classList.add("is-blurred");
})

let back = document.getElementById("back");
back.addEventListener("click", function () {
    if (document.getElementById("addingEvent").style.display == "flex") {
        document.getElementById("addingEvent").style.display = "none";
        document.querySelector(".mainContent").classList.remove("is-blurred");
    }
})

let create = document.getElementById("create");
create.addEventListener("click", function () {
    if (document.getElementById("addingEvent").style.display == "flex") {
        let instName = document.getElementById("instituteName").value;
        let eventName = document.getElementById("eventName").value;
        let strtDate = document.getElementById("startDate").value;
        let endDate = document.getElementById("endDate").value;
        let des = document.getElementById("description").value;
        let queryString = "instituteName=" + instName + "&eventName=" + eventName +
            "&strtDate=" + strtDate + "&endDate=" + endDate + "&des=" + des;
        POST("/addEvent", function (data) {
            if (data) {
                let dataParsed = JSON.parse(data);

                if (dataParsed.status == "fail") {

                } else {
                    location.reload();
                    document.getElementById("addingEvent").style.display = "none";
                    document.querySelector(".mainContent").classList.remove("is-blurred");

                }
            }

        }, queryString);
    }
})


GET("/allevents", (response) => {
    response = JSON.parse(response);
    console.log(response);
    for (let i = 0; i < response.length; i++) {

        let data = response[i];
        let div = document.createElement("div");
        div.setAttribute("class", "eventCard");
        let p1 = document.createElement("p");
        p1.innerHTML = "Institute Name: " + data.InstituteName;
        let p2 = document.createElement("h3");
        p2.innerHTML = data.EventName;
        let p3 = document.createElement("p");
        p3.innerHTML = "Start Date: " + data.StartDate;
        let p4 = document.createElement("p");
        p4.innerHTML = "End Date: " + data.EndDate;
        let p5 = document.createElement("p");

        p5.innerHTML = "Description: " + data.Description;
        let input = document.createElement("input");
        input.setAttribute("type", "submit");
        input.setAttribute("value", "Delete");
        input.addEventListener("click", function () {
            let queryString = "eventName=" + data.EventName + "&instituteName=" + data.InstituteName;
            POST("/delEvent", function (data) {
                if (data) {
                    let dataParsed = JSON.parse(data);

                    if (dataParsed.status == "fail") {

                    } else {
                        location.reload();

                    }
                }

            }, queryString);
        })

        div.appendChild(p2);
        div.appendChild(p1);
        div.appendChild(p3);
        div.appendChild(p4);
        div.appendChild(p5);
        div.appendChild(input);
        document.getElementById("events").appendChild(div);
    }

})