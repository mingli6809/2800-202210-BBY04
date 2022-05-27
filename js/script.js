"use script";

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

GET("/nav", (response) => {
    let doc = document.querySelector(".header");
    doc.innerHTML = response;
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active")
        navMenu.classList.toggle("active")
    });

    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));
    window.addEventListener("load", function () {
        if (this.window.location.href.indexOf("/login_landing") > -1 || this.window.location.href.indexOf("/signup") > -1) {
            this.document.querySelector(".nav-menu").style.display = "none";
            this.document.querySelector(".hamburger").style.display = "none";
        }
    })

    if (window.location.href.indexOf("/adminUsers") > -1) {
        document.getElementById("header").style.position = "sticky";
        document.getElementById("header").style.top = "0";

    } else {}
});

GET("/footer", (res) => {
    let doc = document.querySelector(".footer");
    doc.innerHTML = res;
});

if (window.location.href == "http://localhost:8000/adminUsers") {
    document.getElementById("footer").style.position = "sticky";
} else {};

let invert = false;
let footer = document.querySelector(".footer");
footer.addEventListener("click", function () {
    footer.addEventListener("click", function () {
        footer.addEventListener("click", function () {
            if (document.body.classList.contains("easterEgg")) {
                document.body.classList.remove("easterEgg");
                document.querySelector(".nav-menu").style.display = "flex";
            } else {
                document.body.classList.add("easterEgg");
                document.querySelector(".nav-menu").style.display = "none";
                setTimeout(function () {
                    document.querySelector(".nav-menu").style.display = "flex";
                }, 6000)
            }
        });
    });
});